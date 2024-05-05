// RegisterForm.js

import React, { useState } from 'react';
import { View, TextInput, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function RegisterForm() {
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [dni, setDni] = useState('');
  const [cargo, setCargo] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('Usuario Normal');
  const [area, setArea] = useState('Museo');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          numero,
          dni,
          cargo,
          password,
          tipo: tipoUsuario,
          area: tipoUsuario === 'Usuario Normal' ? area : null,
          permisos: {
            agregarDatos: true,
            accederReporte: false
          }
        })
      });
      const data = await response.json();
      console.log(data);

      if (tipoUsuario === 'Usuario Normal') {
        navigation.navigate(getFormScreenName(area));
      } else {
        navigation.navigate('MainScreen');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };
  const goToLogin = () => {
    navigation.navigate('Login'); 
  };
  const getFormScreenName = (area) => {
    switch (area) {
      case 'Museo':
        return 'MuseoForm';
      case 'Pastelería':
        return 'PasteleriaForm';
      case 'Iglesia':
        return 'IglesiaForm';
      default:
        return 'MainScreen';
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="DNI"
        value={dni}
        onChangeText={setDni}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Picker
        selectedValue={tipoUsuario}
        onValueChange={(itemValue) => setTipoUsuario(itemValue)}
      >
        <Picker.Item label="Usuario Normal" value="Usuario Normal" />
        <Picker.Item label="Superusuario" value="Superusuario" />
      </Picker>
      {tipoUsuario === 'Usuario Normal' && (
        <Picker
          selectedValue={area}
          onValueChange={(itemValue) => setArea(itemValue)}
        >
          <Picker.Item label="Museo" value="Museo" />
          <Picker.Item label="Pastelería" value="Pastelería" />
          <Picker.Item label="Iglesia" value="Iglesia" />
        </Picker>
      )}
      <Button title="Register" onPress={handleRegister} />
      <Button title="Go to Login" onPress={goToLogin} />
    </View>
  );
}
