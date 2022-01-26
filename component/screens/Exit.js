import * as React from 'react';
import { Text, TextInput, ScrollView, View, StyleSheet, } from 'react-native';
import Constants from 'expo-constants';
import { Button, Card } from 'react-native-elements';
import moment from 'moment';
import * as firestore from '../database/firestore';

function convert() {
    let entry = [];

    async function conversion() {
        let arr = await firestore.getEntryDetails();
        let objEntry = "";

        for (let i = 0; i <= arr.length; i++) {
            objEntry = Object.entries(arr[i]);
            entry.push([objEntry[0][1],objEntry[1][1],objEntry[2][1],objEntry[3][1]]);
        }
    };

    conversion();
    return entry
}

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

export default function Exit({ route, navigation }) {
    const initialState = {
        name: '',
        vehReg: '',
    };
    const [name, setName] = React.useState('');
    const [conNum, setConNum] = React.useState('');
    const [vehReg, setVehReg] = React.useState('');
    let date = DateTime().Date;
    let time = DateTime().Time;
    let con = convert();
    console.log(typeof(con))
    // const entryArr = con.map((arr)=>{
    //     console.log(arr)
    //     // <Card>
    //     //     <Text>Date:{arr[0]} Time:{arr[1]}</Text>
    //     //     <Text>Reg:{arr[2]} Name:{arr[3]}</Text>
    //     // </Card>
    //      // const numbers = [1, 2, 3, 4, 5];
    //     // const listItems = numbers.map((number) =>
    //     //     <li>{number}</li>
    //     // );
    // });
    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>

            <View style={styles.CurrentCard}>
                <Text style={styles.text}>Date:{date}</Text>
                <Text style={styles.text}>Time:{time}</Text>
            </View>
            {entryArr}
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
                        Date: date,
                        Time: time,
                        Name: name,
                        ConNum: conNum,
                        VehReg: vehReg
                    });
                    firestore.addEntryDetails(date, time, name, conNum, vehReg);
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
