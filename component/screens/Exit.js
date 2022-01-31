import * as React from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Button, Card } from 'react-native-elements';
import moment from 'moment';
import * as firestore from '../database/firestore';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

function convert() {
    const [entryArr, setArr] = React.useState([]);
    const [deleteBtn, setdeleteBtn] = React.useState('false');
    let totalArr = []

    const fetchdata = async () => {
        const detailsCol = collection(firestore.db, 'EntryDetails');
        const detailsSnapshot = await getDocs(detailsCol);
        detailsSnapshot.forEach(doc => {
            totalArr.push(doc.data());
            setArr(totalArr);
        });
    }

    React.useEffect(() => {
        fetchdata();
    }, [deleteBtn]);

    return (
        <View>
            {entryArr.map((entry) => {
                return (
                    <View style={styles.col} key={entry["Vehicle_Reg"]}>
                        <View style={styles.row}>
                            <Text style={styles.data}>Reg: {entry["Vehicle_Reg"]}</Text>
                            <Text style={styles.data}>Name: {entry["Name"]}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.data}>Date: {entry["Date"]}</Text>
                            <Text style={styles.data}>Time: {entry["Time"]}</Text>
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
                                width: 'auto',
                                margin: 1,
                                alignSelf: 'center',
                                paddingBottom: 4
                            }}
                            titleStyle={{ fontWeight: 'bold', color: 'black', padding: 1 }}
                            onPress={function () {
                                firestore.delEntryDetails(entry["Vehicle_Reg"]);
                                if (deleteBtn == false) {
                                    setdeleteBtn(true)
                                } else {
                                    setdeleteBtn(false)
                                }

                            }}
                        />
                    </View>
                )
            })}
        </View>
    )
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
    },
    col: {
        width: '90%',
        flexDirection: 'column',
        borderWidth: 1.5,
        borderRadius: 1,
        borderColor: '#e1e8ee',
        alignSelf: 'center',
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        padding: 5,
        textAlign: 'center'
    },
    data: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold'
    }
});
