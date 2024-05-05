// RegisterScreen.js

import React from 'react';
import { View } from 'react-native';
import RegisterForm from '../components/RegisterForm';

export default function RegisterScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <RegisterForm />
    </View>
  );
}