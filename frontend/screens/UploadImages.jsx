import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const UploadImages = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        // Здесь можно добавить логику для чтения массива из AsyncStorage при загрузке компонента, если это необходимо
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    };

    const uploadImage = async () => {
        const jsonContent = {
            id: 1,
            createdAt: '2024-04-13',
            name: 'Несоответствие цены',
            storeName: 'Магнит',
            image: selectedImage,
            status: 1,
        };

        try {
            // Получение текущего массива из AsyncStorage
            let existingData = await AsyncStorage.getItem('data');
            existingData = existingData ? JSON.parse(existingData) : [];

            // Добавление нового объекта в массив
            existingData.push(jsonContent);

            // Сохранение обновленного массива в AsyncStorage
            await AsyncStorage.setItem('data', JSON.stringify(existingData));
            console.log('Data saved successfully');
        } catch (error) {
            console.log('Error saving data: ', error);
        }
    };

    return (
        <View style={styles.container}>
            {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.image} />
            )}
            <Button title="Выберите изображение из галереи" onPress={pickImage} style={styles.button} />
            <Button title="Загрузить" onPress={uploadImage} style={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    button: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#007bff',
    },
});

export default UploadImages;
