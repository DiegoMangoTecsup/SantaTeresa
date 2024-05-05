// PasteleriaIngresos.js
import React from 'react';
import { View } from 'react-native';
import IngresosForm from '../components/IngresosForm';

export default function PasteleriaIngresosScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <IngresosForm area="Pasteleria" />
    </View>
  );
}
