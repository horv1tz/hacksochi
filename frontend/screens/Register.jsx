import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Registration = () => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = () => {
        // Обработка отправки данных регистрации
        console.log('Отправка данных регистрации:', { phone, email, firstName, lastName, password });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setPhone}
                value={phone}
                keyboardType="phone-pad"
                placeholder="Введите номер телефона"
            />
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                placeholder="Введите адрес электронной почты"
            />
            <TextInput
                style={styles.input}
                onChangeText={setFirstName}
                value={firstName}
                placeholder="Введите имя"
            />
            <TextInput
                style={styles.input}
                onChangeText={setLastName}
                value={lastName}
                placeholder="Введите фамилию"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                placeholder="Введите пароль"
            />
            <Button title="Зарегистрироваться" onPress={handleRegistration} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default Registration;
