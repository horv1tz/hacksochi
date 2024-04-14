import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Sended() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Успешно отправлено!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // измените цвет фона по вашему вкусу
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333', // измените цвет текста по вашему вкусу
    },
});
