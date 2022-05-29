import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>rateYourKollegium</Text>
      <Button onPress={() => navigation.replace('Onboarding1')} title="Continue"></Button>
    </SafeAreaView>
  )
}

export default WelcomeScreen;

const styles = StyleSheet.create({})