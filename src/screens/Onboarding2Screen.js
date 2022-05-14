import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Onboarding2Screen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>Onboarding2Screen</Text>
      <Button onPress={() => navigation.replace('Onboarding3')} title="Next"></Button>
    </SafeAreaView>
  )
}

export default Onboarding2Screen;

const styles = StyleSheet.create({})