import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importar estilos por separado
import { View, TextInput, Button } from 'react-native';

export default function MuseoForm() {
  const [fecha, setFecha] = useState(null);
  const [venta, setVenta] = useState('');
  const [monto, setMonto] = useState('');

  const handleFechaChange = (selectedDate) => {
    setFecha(selectedDate);
  };

  const handleGuardarIngreso = async () => {
    try {
      const response = await fetch('http://localhost:3000/museos', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          museo: {
            fecha: fecha,
            venta: venta,
            ganancia: parseFloat(monto)
          }
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al guardar el ingreso:', error);
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
        placeholder="Venta"
        value={venta}
        onChangeText={setVenta}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
      />
      <Button title="Enviar Datos" onPress={handleGuardarIngreso} />
    </View>
  );
}
