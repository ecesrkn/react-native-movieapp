import React from 'react';
import Home from './screens/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Detail from './screens/Detail';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';

const Stack = createStackNavigator();

export default function App(): JSX.Element {

  return (
    <SafeAreaProvider>
    <Navigation/>
  </SafeAreaProvider>
  );
}

