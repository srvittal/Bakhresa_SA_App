import * as React from 'react';
import { StyleSheet, ScrollView, TextInput, Image, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import Btn from '../btn'

export default function Login({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
            <Btn
                title="Admit Vehicle"
                color="grey"
                width={200}
                onPress={function () { navigation.navigate('Entry', {}) }}
            />

            <Btn
                title="Vehicle Exit"
                color="grey"
                width={200}
                onPress={function () { navigation.navigate('Exit', {}) }}
            />
        </ScrollView>
    )
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
})