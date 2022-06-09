import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from 'react-native'
import { signOut } from "firebase/auth";
import {
  RTCView,
} from 'react-native-webrtc';

import { auth } from "../../firebase";
import { UserList } from "../../components";
import { CALL_STATUS, useAuth, useWebRTC } from "../../context";

export const HomeScreen = () => {
  const { user } = useAuth()
  const {
    currentCallData,
    getStreamVideo,
    stopStreamedVideo,
    call,
    answer,
    decline,
  } = useWebRTC()
  const [localVideoRef, setLocalVideoRef] = useState(null)
  const [remoteVideoRef, setRemoteVideoRef] = useState(null)

  const handleLogout = useCallback(() => {
    try {
      signOut(auth)
    } catch (error) {
      console.log("signOut", error.message)
    }
  }, [signOut])

  const handleLocalVideo = useCallback((stream) => { setLocalVideoRef(stream) }, [])

  const handleRemoteVideo = useCallback((stream) => { setRemoteVideoRef(stream) }, [])

  const handleCall = useCallback(
    async (callee) => {
      await getStreamVideo({
        handleLocalVideo,
        handleRemoteVideo
      })
      call({
        callee: {
          uid: callee.uid,
          email: callee.email,
        },
      })
    },
    [getStreamVideo, handleLocalVideo, handleRemoteVideo, call]
  )

  const handleAnswer = useCallback(async () => {
    await getStreamVideo({
      handleLocalVideo,
      handleRemoteVideo
    })
    answer()
  }, [getStreamVideo, handleLocalVideo, handleRemoteVideo, answer])

  const handleDecline = useCallback(() => {
    decline()
  }, [decline])

  useEffect(() => {
    if (currentCallData?.status === CALL_STATUS.DECLINE) {
      stopStreamedVideo({
        stream: localVideoRef,
        handleStream: handleLocalVideo
      })
      stopStreamedVideo({
        stream: remoteVideoRef,
        handleStream: handleRemoteVideo
      })
    }
  }, [currentCallData])

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Text onPress={handleLogout}>
        Logout
      </Text>
      <UserList handleCall={handleCall} />
      {[CALL_STATUS.CALLING, CALL_STATUS.ANSWER].some(
        (status) => status === currentCallData?.status
      ) && (
          <View>
            {((currentCallData?.status === CALL_STATUS.CALLING &&
              currentCallData?.caller?.uid === user?.uid) ||
              currentCallData?.status === CALL_STATUS.ANSWER) && (
                <View style={styles.row}>
                  <Text>
                    {currentCallData?.caller?.email}
                  </Text>
                  <Button title="Decline" onPress={handleDecline} />
                </View>
              )}
            {currentCallData?.status === CALL_STATUS.CALLING &&
              currentCallData?.callee?.uid === user?.uid && (
                <View style={styles.row}>
                  <Text>
                    {currentCallData?.caller?.email}
                  </Text>
                  <Button title="Decline" onPress={handleDecline} />
                  <Button title="Answer" onPress={handleAnswer} />
                </View>
              )}
          </View>
        )}
      {localVideoRef &&
        <RTCView
          streamURL={localVideoRef?.toURL()}
          style={styles.stream}
          objectFit="cover"
          mirror
        />
      }
      {remoteVideoRef &&
        <RTCView
          streamURL={remoteVideoRef?.toURL()}
          style={styles.stream}
          objectFit="cover"
          mirror
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  stream: {
    width: 200,
    height: 200
  }
})
