import * as React from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Button, Card } from 'react-native-elements';
import moment from 'moment';
import * as firestore from '../database/firestore';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

function convert() {
    const [entryArr, setArr] = React.useState([]);
    let totalArr = []

    const fetchdata = async () => {
        const detailsCol = collection(firestore.db, 'EntryDetails');
        const detailsSnapshot = await getDocs(detailsCol);
        detailsSnapshot.forEach(doc => {
            totalArr.push(doc.data());
            setArr(totalArr);
        });
    }

    const fetchdataRT = () => {
        const q = collection(firestore.db, "EntryDetails");
        const detailsCol = onSnapshot(q, (query) => {
            query.forEach((doc) => {
                totalArr.push(doc.data());
                setArr(totalArr);
            })
        })
    }

    React.useEffect(() => {
        fetchdataRT();
    }, []);

    return (
        <View style={{ alignSelf: 'center' }}>
            {entryArr.map((entry) => {
                return (
                    <Card key={entry["Vehicle_Reg"]}>
                        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                            <View style={{ flex: 1, flexDirection: 'row', textAlign: "center" }}>
                                <Text style={{ flex: 3, flexDirection: 'row', fontWeight: 'bold' }}>Date: {entry["Date"]}</Text>
                                <Text style={{ flex: 3, flexDirection: 'row', fontWeight: 'bold' }}>Time: {entry["Time"]}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', textAlign: "center" }}>
                                <Text style={{ flex: 3, flexDirection: 'row', fontWeight: 'bold' }}>Reg: {entry["Vehicle_Reg"]}</Text>
                                <Text style={{ flex: 3, flexDirection: 'row', fontWeight: 'bold' }}>Name: {entry["Name"]}</Text>
                            </View>
                        </View>
                        <Button
                            title="Exit"
                            buttonStyle={{
                                backgroundColor: '#f70d1a',
                                borderWidth: 0,
                                borderColor: 'transparent',
                                borderRadius: 18,
                            }}
                            containerStyle={{
                                width: 100,
                                marginHorizontal: 25,
                                marginVertical: 5,
                                alignSelf: 'center',
                            }}
                            titleStyle={{ fontWeight: 'bold', color: 'black' }}
                            onPress={function () {
                                firestore.delEntryDetails(entry["Vehicle_Reg"]);
                            }}
                        />
                    </Card>
                )
            })}
        </View>
    );
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
    const [refreshPage, setRefreshPage] = React.useState('');
    let date = DateTime().Date;
    let time = DateTime().Time;
    setInterval(function () {
        if (refreshPage == "") {
            setRefreshPage("refresh");
        } else {
            setRefreshPage("");
        }
    }, 1000);
    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>

            <View style={styles.CurrentCard}>
                <Text style={styles.text}>Date:{date}</Text>
                <Text style={styles.text}>Time:{time}</Text>
            </View>
            {convert()}
            <Button
                title="Refresh"
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
                    if (refreshPage == "") {
                        setRefreshPage("refresh");
                    } else {
                        setRefreshPage("");
                    }
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
