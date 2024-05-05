// LoginScreen.js
import React from 'react';
import { View } from 'react-native';
import LoginForm from '../components/LoginForm';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoginForm />
    </View>
  );
}
