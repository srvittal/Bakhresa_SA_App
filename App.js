import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, TextInput, Image, KeyboardAvoidingView, Platform, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './component/screens/Login';
import Selection from './component/screens/Selection';
import Entry from './component/screens/Entry';
import Exit from './component/screens/Exit';
import Submitted from './component/screens/Submitted';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
      <Stack.Navigator initialRouteName="Selection">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Selection"
          component={Selection}
          options={{ title: 'Selection' }}
        />
        <Stack.Screen
            name="Entry"
            component={Entry}
            options={{ title: 'Entry Details' }}
          />
          <Stack.Screen
            name="Submitted"
            component={Submitted}
            options={{ title: 'Submitted Details' }}
          />
          <Stack.Screen
            name="Exit"
            component={Exit}
            options={{ title: 'Exit' }}
          />
      </Stack.Navigator>
    </KeyboardAvoidingView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
