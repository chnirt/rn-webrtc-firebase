import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from "@react-navigation/core";

import { appIds } from "../../constants";
import { auth } from '../../firebase'

export const LoginScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('trinhchinchin@gmail.com')
  const [password, setPassword] = useState('Admin@123')
  const [error, setError] = useState(null)

  const handleLogin = useCallback(async () => {
    try {
      if (!email || !password) return

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
    } catch (err) {
      setError(err.message)
    }
  }, [signInWithEmailAndPassword, email, password])

  const navigateRegister = useCallback(() => {
    navigation.navigate(appIds.Register)
  }, [navigation])

  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <TextInput value={email} onChange={setEmail} />
      <TextInput secureTextEntry value={password} onChange={setPassword} />
      {error && <Text>{error}</Text>}
      <Button title="Login" onPress={handleLogin} />
      <Text>
        No account?{` `}
        <Text onPress={navigateRegister}>
          Sign up
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
