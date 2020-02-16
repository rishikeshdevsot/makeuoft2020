import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Login from "./components/Login";
import * as Font from 'expo-font';
export default function App() {
  // Font.loadAsync({
  //   'europa-regular-webfont': require('./fonts/europa-regular-webfont.ttf'),
  // });
  return (
    <Login/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
