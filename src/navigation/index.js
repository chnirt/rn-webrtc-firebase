import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  MediaStream,
  mediaDevices,
} from 'react-native-webrtc';

import { useAuth, WebRTCProvider } from '../context'
import { HomeScreen, LoginScreen, RegisterScreen } from '../screens'
import { appIds } from "../constants";

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
  const { isAuth } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuth ? (
          <>
            <Stack.Screen name={appIds.Home} children={props => (
              <WebRTCProvider navigatorConfig={{
                RTCPeerConnection,
                RTCIceCandidate,
                RTCSessionDescription,
                MediaStream,
                mediaDevices,
              }}>
                <HomeScreen {...props} />
              </WebRTCProvider>
            )} />
          </>
        ) : (
          <>
            <Stack.Screen name={appIds.Login} component={LoginScreen} />
            <Stack.Screen name={appIds.Register} component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
