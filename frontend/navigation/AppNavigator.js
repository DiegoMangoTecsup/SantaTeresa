// AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainScreen from '../screens/MainScreen';
import IngresosScreen from '../screens/IngresosScreen';
import MuseoForm from '../components/MuseoForm'; 
import PasteleriaForm from '../components/PasteleriaForm';
import InsumosForm from '../components/InsumosForm';
import IglesiaForm from '../components/IglesiaForm';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={({ route }) => ({ 
          title: 'MainScreen', 
          headerShown: route.params && route.params.userTipo === 'Superusuario' 
        })} />
        <Stack.Screen name="Ingresos" component={IngresosScreen} />
        <Stack.Screen name="MuseoForm" component={MuseoForm} /> 
        <Stack.Screen name="PasteleriaForm" component={PasteleriaForm} />
        <Stack.Screen name="InsumosForm" component={InsumosForm} />
        <Stack.Screen name="IglesiaForm" component={IglesiaForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}