import * as React from 'react';
import { Text, TextInput, ScrollView, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import moment from 'moment';

function DateTime() {
  let Now = moment();
  let Date = Now.format('DD-MMM-YY');
  let Time = Now.format('HH:MM A');
  return {
    Date,
    Time,
  };
}

export default function Entry({ route, navigation }) {
  const initialState = {
    name: '',
    vehReg: '',
  };
  const { username, password } = route.params;
  const [name, setName] = React.useState('');
  const [conNum, setConNum] = React.useState('');
  const [vehReg, setVehReg] = React.useState('');
  setInterval(DateTime(),1000);
  return (
    <ScrollView contentContainerStyler={styles.container}>
      <Text style={styles.text}>Date:{DateTime().Date}</Text>
      <Text style={styles.text}>Time:{DateTime().Time}</Text>
      <TextInput
        style={styles.input}
        placeholder="Driver's Name"
        placeholderTextColor="#363A55"
        textContentType="name"
        defaultValue={name}
        onChangeText={function (text) {
          setName(text);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Driver's Contact Number"
        placeholderTextColor="#363A55"
        textContentType="telephoneNumber"
        defaultValue={conNum}
        onChangeText={function (text) {
          setConNum(text);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Vehicle Registration"
        placeholderTextColor="#363A55"
        textContentType="none"
        defaultValue={vehReg}
        onChangeText={function (text) {
          setVehReg(text);
        }}
      />

      <Button
        title="Submit"
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
          navigation.navigate('Entry');
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#FFFFFF',
    padding: 8,
  },
  input: {
    fontSize: 20,
    height: 50,
    backgroundColor: '#F4B317',
    borderRadius: 20,
    margin: 5,
    padding: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
