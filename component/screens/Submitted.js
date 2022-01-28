import * as React from 'react';
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native';
import Constants from 'expo-constants';

export default function Submitted({ route, navigation }) {
    const { Date, Time, Name, ConNum, VehReg } = route.params;
    setTimeout(function () {navigation.navigate('Selection', {})},2000)
    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>

            <View style={styles.CurrentCard}>
                <Text style={styles.TextDetailsHd}>Vehicle Admitted</Text>
                <Text style={styles.TextDetails}>Date of Entry: {Date}</Text>
                <Text style={styles.TextDetails}>Time of Entry: {Time}</Text>
                <Text style={styles.TextDetails}>Name of Entrant: {Name}</Text>
                <Text style={styles.TextDetails}>Conatct Number: {ConNum}</Text>
                <Text style={styles.TextDetails}>Vehicle Registration: {VehReg}</Text>
            </View>

            <Image source={require('../../assets/success.png')} style={styles.logo} />
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
        height: 130,
        width: 130,
        alignSelf: 'center',
        margin: 5,
    },
    TextDetails: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    TextDetailsHd: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: 10
    },
    CurrentCard: {
        margin: 5,
        padding: 10,
        alignSelf: 'center',
    }
});
