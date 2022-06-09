import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Text, Button } from 'react-native'
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'

import { useAuth } from '../../context'
import { db } from '../../firebase'

const LIMIT = 3

export const UserList = ({ handleCall = () => { } }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [last, setLast] = useState(null)
  // const [moreLoading, setMoreLoading] = useState(false)
  const [loadedAll, setLoadedAll] = useState(false)

  const fetchUsers = useCallback(async () => {
    try {
      if (user?.uid === null) return

      // Query the first page of docs
      const first = query(
        collection(db, 'users'),
        where('uid', '!=', user.uid),
        orderBy('uid'),
        orderBy('createdAt', 'desc'),
        limit(LIMIT)
      )

      onSnapshot(first, (querySnapshot) => {
        const docs = querySnapshot.docs
        const data = docs.map((docSnapshot) => {
          return {
            id: docSnapshot.id,
            ...docSnapshot.data(),
          }
        })
        setUsers(data)

        const lastVisible = docs[docs.length - 1]
        setLast(lastVisible)
        setLoadedAll(docs.length < LIMIT)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchUsers().finally(() => setLoading(false))
  }, [])

  return (
    <View>
      <Text>UserList</Text>
      {loading && <Text>Collection: Loading...</Text>}
      {users.length > 0 && (
        <View>
          {users.map((user, ui) => (
            <View key={`user-${ui}`} style={styles.row}>
              <Text>{user.email}</Text>
              <Button onPress={() => handleCall(user)} title={"Call"} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center"
  }
})
