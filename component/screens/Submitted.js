import * as React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

export default function Submitted({ route, navigation }) {
    const { list } = route.params;
    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
           <Text>{list}</Text>
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
});
