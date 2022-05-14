import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const AuthScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>Auth</Text>
      <Button onPress={() => navigation.replace('Register')} title="Register"></Button>
      <Button onPress={() => navigation.replace('Login')} title="Login"></Button>
      <TouchableOpacity onPress={() => navigation.replace('Home')}>
          <Text>
              Continue without registering
          </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AuthScreen;

const styles = StyleSheet.create({})