import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

import { appIds } from "../../constants";
import { auth } from '../../firebase'
import { addDocument } from '../../firebase/service'

export const RegisterScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('trinhchinchin@gmail.com')
  const [password, setPassword] = useState('Admin@123')
  const [error, setError] = useState(null)

  const handleRegister = useCallback(async () => {
    try {
      if (!email || !password) return

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential) {
        await addDocument('users', {
          uid: userCredential.user.uid,
          email,
        })
      }
    } catch (err) {
      setError(err.message)
    }
  }, [email, password, createUserWithEmailAndPassword, addDocument])

  const navigateLogin = useCallback(() => {
    navigation.navigate(appIds.Login)
  }, [navigation])

  return (
    <View style={styles.container}>
      <Text>RegisterScreen</Text>
      <TextInput value={email} onChange={setEmail} />
      <TextInput secureTextEntry value={password} onChange={setPassword} />
      {error && <Text>{error}</Text>}
      <Button title="Register" onPress={handleRegister} />
      <Text>
        Have an account?{` `}
        <Text onPress={navigateLogin}>
          Sign in
        </Text>
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
