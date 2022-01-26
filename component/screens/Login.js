import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, TextInput, Image, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import * as firestore from '../database/firestore';


export default function Login({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const usernameInput = React.useRef(null);
  const passwordInput = React.useRef(null);
  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>

      <Image source={require('../../assets/BAKHRESA_SA.png')} style={styles.logo} />

      <TextInput
        ref={usernameInput}
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#363A55"
        textContentType="username"
        defaultValue={username}
        onChangeText={function (text) {
          setUsername(text);
        }}
        returnKeyType={'next'}
      />

      <TextInput
        ref={passwordInput}
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#363A55"
        textContentType="password"
        defaultValue={password}
        onChangeText={function (text) {
          setPassword(text);
        }}
        returnKeyType='done'
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
        onPress={()=>navigation.navigate('Entry', {})}
        // onPress={async function () {
        //   let authState = await firestore.authUser(username, password);
        //   if (authState == true) {
        //     navigation.navigate('Entry', {});
        //   } else {
        //     Alert.alert(
        //       "Incorrect Username/Password",
        //       "You have entered an incorrect username or password",
        //       [
        //         {
        //           text: "OK",
        //           onPress: function () {
        //             usernameInput.current.clear();
        //             passwordInput.current.clear();
        //           }
        //         }
        //       ]
        //     )
        //   }
        // }}
      />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#FFFFFF',
    padding: 8,
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
