// MuseoIngresosScreen.js

import React from 'react';
import { View } from 'react-native';
import MuseoForm from '../components/MuseoForm';

export default function MuseoIngresosScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MuseoForm area="Museo" />
    </View>
  );
}