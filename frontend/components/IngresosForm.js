// IngresosForm.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function IngresosForm() {
  const [fecha, setFecha] = useState('');
  const [area, setArea] = useState('');
  const [venta, setVenta] = useState('');
  const [monto, setMonto] = useState('');

  const handleGuardarIngreso = async () => {
    try {
      const response = await fetch('http://localhost:3000/ingresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numeroUsuario: '123', // Debes reemplazar 'aquí_debes_pasar_el_numero_del_usuario' con el número de usuario correspondiente
          ingreso: {
            fecha,
            area,
            venta,
            monto
          }
        })
      });
      const data = await response.json();
      console.log(data);
      // Aquí puedes manejar la respuesta del backend, como mostrar un mensaje de éxito o redireccionar a otra pantalla
    } catch (error) {
      console.error('Error al guardar ingreso:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Fecha"
        value={fecha}
        onChangeText={setFecha}
        id="fechaInput" // Agrega un id único para este campo
      />
      <TextInput
        placeholder="Area"
        value={area}
        onChangeText={setArea}
        id="areaInput" // Agrega un id único para este campo
      />
      <TextInput
        placeholder="Venta"
        value={venta}
        onChangeText={setVenta}
        id="ventaInput" // Agrega un id único para este campo
      />
      <TextInput
        placeholder="Monto"
        value={monto}
        onChangeText={setMonto}
        id="montoInput" // Agrega un id único para este campo
      />
      <Button title="Guardar Ingreso" onPress={handleGuardarIngreso} />
    </View>
  );
}