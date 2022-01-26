import * as React from 'react';
import { StyleSheet, ScrollView, TextInput, Image, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';

export default function Login({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
            <Button
                title="Admit Vehicle"
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
                onPress={() => navigation.navigate('Entry', {})}
            />
            <Button
                title="Vehicle Exit"
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
                onPress={() => navigation.navigate('Entry', {})}
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