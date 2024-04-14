import React, { useState, useRef, useEffect } from 'react';
import { View, Button, Image, Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Camera } from 'expo-camera';
import axios from 'axios';

const CameraScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current && hasPermission) {
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
            setPhotoUri(photo.uri);
        } else {
            console.log('Permission to access camera was denied');
        }
    };

    const saveDataToAsyncStorage = async (data) => {
        try {
            const existingData = await AsyncStorage.getItem('data');
            const tasks = existingData ? JSON.parse(existingData) : [];
            const newData = [...tasks, data];
            await AsyncStorage.setItem('data', JSON.stringify(newData));
            console.log('Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const uploadPhoto = async () => {
        if (photoUri) {
            const id = Math.random().toString(36).substr(2, 9); // Генерация случайного id
            const currentDate = new Date().toISOString().slice(0, 10); // Получение текущей даты в формате YYYY-MM-DD
            const data = {
                id: id,
                createdAt: currentDate,
                name: 'Несоответствие цены',
                storeName: 'Магнит',
                image: photoUri,
                status: 1,
            };

            // Сохранение данных в AsyncStorage
            await saveDataToAsyncStorage(data);
        }
    };

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={styles.camera}
                type={Camera.Constants.Type.back}
                flashMode={Camera.Constants.FlashMode.off}
                onCameraReady={() => setHasPermission(true)}
            >
                <View style={styles.buttonContainer}>
                    <Button title="📷" onPress={takePicture} disabled={!hasPermission} />
                    <Button title="⬆️" onPress={uploadPhoto} disabled={!photoUri} />
                    <Button title="Продолжить" onPress={() => navigation.navigate('Статус')} />
                </View>
            </Camera>
            {photoUri && <Image source={{ uri: photoUri }} style={styles.imagePreview} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    imagePreview: {
        flex: 1,
    },
});

export default CameraScreen;
