import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Button
                title="Сфотографировать"
                onPress={() => navigation.navigate('Камера')}
                style={styles.button}
            />
            <View style={styles.spacing} />
            <Button
                title="Загрузить фото"
                onPress={() => navigation.navigate('Загрузить изображение')}
                style={styles.button}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#007bff',
    },
    spacing: {
        marginVertical: 5,
    },
});
