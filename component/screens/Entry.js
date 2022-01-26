import * as React from 'react';
import { Text, TextInput, ScrollView, View, StyleSheet, } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import moment from 'moment';
import * as firestore from '../database/firestore';

function DateTime() {
    let Now = moment();
    const [Date, setDate] = React.useState(Now.format('DD-MMM-YY'));
    const [Time, setTime] = React.useState(Now.format('hh:mm A'));
    setInterval(function () {
        let Now = moment();
        setDate(Now.format('DD-MMM-YY'));
        setTime(Now.format('hh:mm A'));
    }, 15000)
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
    //const { username, password } = route.params;
    const [name, setName] = React.useState('');
    const [conNum, setConNum] = React.useState('');
    const [vehReg, setVehReg] = React.useState('');
    let date = DateTime().Date;
    let time = DateTime().Time;

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>

            <View style={styles.CurrentCard}>
                <Text style={styles.text}>Date:{date}</Text>
                <Text style={styles.text}>Time:{time}</Text>
            </View>

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
                    navigation.navigate('Submitted', {
                    list: 'Test'
                });
                firestore.addEntryDetails(date,time,name,conNum,vehReg);
                firestore.getEntryDetailsRT();
                }}
            />
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
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    CurrentCard: {
        margin: 5,
        padding: 10,
        alignSelf: 'center',
    }
});
