import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Login({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <ScrollView contentContainerStyler={styles.container}>
      <Image source={require('../assets/BAKHRESA_SA.png')} style={styles.logo}/>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#363A55"
        textContentType="username"
        defaultValue={username}
        onChangeText={function (text) {
          setUsername(text);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#363A55"
        textContentType="password"
        defaultValue={password}
        onChangeText={function (text) {
          setPassword(text);
        }}
      />

      <Button
        title="Log In"
        buttonStyle={{
          backgroundColor: '#B9B9B9',
          borderWidth: 0,
          borderColor: 'transparent',
          borderRadius: 18,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
          alignSelf: 'center',
        }}
        titleStyle={{ fontWeight: 'bold', color: 'black' }}
        onPress={function () {
          navigation.navigate('Entry', {
            username: username,
            password: password,
          });
        }}
      />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 128,
    width: 128,
    alignSelf: 'center',
    margin: 5,
  },
  input: {
    fontSize: 20,
    height: 50,
    width: 250,
    backgroundColor: '#F4B317',
    borderRadius: 20,
    margin: 5,
    padding: 10,
    textAlign: 'center',
    alignSelf: 'center',
  },
});