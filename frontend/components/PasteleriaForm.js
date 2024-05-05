// PasteleriaForm.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export default function PasteleriaForm() {
  const [nombrePastel, setNombrePastel] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(null);

  const handleFechaChange = (selectedDate) => {
    setFecha(selectedDate);
  };

  const handleGuardarPastel = async () => {
    try {
      const response = await fetch('http://localhost:3000/pastelerias', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombrePastel,
          descripcion,
          ganancia: parseFloat(monto),
          fecha
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al guardar el pastel:', error);
    }
  };

  return (
    <View>
      <DatePicker
        selected={fecha}
        onChange={handleFechaChange}
        dateFormat="dd/MM/yyyy"
      />
      <TextInput
        placeholder="Nombre del pastel"
        value={nombrePastel}
        onChangeText={setNombrePastel}
      />
      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
      />
      <TextInput
        placeholder="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
      />
      <Button title="Guardar Pastel" onPress={handleGuardarPastel} />
    </View>
  );
}
