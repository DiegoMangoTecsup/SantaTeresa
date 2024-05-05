// InsumosForm.js

import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function InsumosForm() {
  const [nombreInsumo, setNombreInsumo] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleGuardarInsumo = async () => {
    try {
      // Aquí puedes implementar la lógica para guardar el insumo
      console.log('Guardando insumo...');
    } catch (error) {
      console.error('Error al guardar insumo:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nombre del insumo"
        value={nombreInsumo}
        onChangeText={setNombreInsumo}
      />
      <TextInput
        placeholder="Cantidad"
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
      />
      <Button title="Guardar Insumo" onPress={handleGuardarInsumo} />
    </View>
  );
}
