import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Onboarding1Screen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>Onboarding1Screen</Text>
      <Button onPress={() => navigation.replace('Onboarding2')} title="Next"></Button>
    </SafeAreaView>
  )
}

export default Onboarding1Screen;

const styles = StyleSheet.create({})