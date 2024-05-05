//  IglesiaForm.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export default function PasteleriaForm() {
  const [nombreVenta, setNombreVenta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState(null);

  const handleFechaChange = (selectedDate) => {
    setFecha(selectedDate);
  };

  const handleGuardarPastel = async () => {
    try {
      const response = await fetch('http://localhost:3000/iglesias', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreVenta,
          descripcion,
          fecha
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al guardar el dato de la iglesia:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Venta"
        value={nombreVenta}
        onChangeText={setNombreVenta}
      />
      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
      />
     <DatePicker
        selected={fecha}
        onChange={handleFechaChange}
        dateFormat="dd/MM/yyyy"
      />
      <Button title="Guardar Pastel" onPress={handleGuardarPastel} />
    </View>
  );
}
