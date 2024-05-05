// LoginForm.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginForm() {
  const [numero, setNumero] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numero,
          password
        })
      });
      const data = await response.json();
      if (response.ok) {
        const userData = data.usuario;
        if (userData.tipo === 'Superusuario') {
          // Si el usuario es un superusuario, redirige a MainScreen
          navigation.navigate('MainScreen', { userTipo: 'Superusuario' });
        } else {
          // Si el usuario no es un superusuario, redirige al formulario correspondiente
          navigateBasedOnUserRole(userData.area);
        }
      } else {
        console.error('Error al iniciar sesión:', data.mensaje);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const navigateBasedOnUserRole = (area) => {
    switch (area) {
      case 'Museo':
        navigation.navigate('MuseoForm');
        break;
      case 'Pastelería':
        navigation.navigate('PasteleriaForm');
        break;
      case 'Iglesia':
        navigation.navigate('IglesiaForm');
        break;
      default:
        console.error('Área no reconocida:', area);
        break;
    }
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View>
      <TextInput
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Register" onPress={goToRegister} /> 
    </View>
  );
}
