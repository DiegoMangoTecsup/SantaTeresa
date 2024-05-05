// MainScreen.js

import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IngresosOption from '../components/IngresosOption';
import EgresosOption from '../components/EgresosOption';

export default function MainScreen() {
  const navigation = useNavigation();

  const handleGoToIngresos = () => {
    navigation.navigate('Ingresos');
  };

  const handleGoToEgresos = () => {
    navigation.navigate('Egresos');
  };

  return (
    <View>
      <Button title="Ingresos" onPress={handleGoToIngresos} />
      <Button title="Egresos" onPress={handleGoToEgresos} />
    </View>
  );
}