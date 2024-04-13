import React, { useState, useRef, useEffect } from 'react';
import { View, Button, Image, Platform } from 'react-native'; // Импорт Platform из react-native
import { Camera } from 'expo-camera';
import axios from 'axios';

const CameraScreen = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android') {
                const { status } = await Camera.requestPermissionsAsync(); // Используем Camera.requestPermissionsAsync() для Android
                setHasPermission(status === 'granted');
            } else {
                const { status } = await Camera.requestPermissionsAsync(); // Используем Camera.requestPermissionsAsync() для iOS
                setHasPermission(status === 'granted');
            }
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current && hasPermission) { // Проверяем разрешение перед вызовом takePictureAsync
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
            setPhotoUri(photo.uri);
        } else {
            console.log('Permission to access camera was denied');
        }
    };

    const uploadPhoto = async () => {

        if (photoUri) {
            const formData = new FormData();
            formData.append('photo', {
                uri: photoUri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });

            try {
                const response = await axios.post('YOUR_SERVER_ENDPOINT', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } catch (error) {
                console.error('Upload failed:', error);
                // Добавьте здесь код для обработки ошибки загрузки
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Camera
                ref={cameraRef}
                style={{ flex: 1 }}
                type={Camera.Constants.Type.back}
                flashMode={Camera.Constants.FlashMode.off}
                onCameraReady={() => setHasPermission(true)}
            >
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 0, width: '100px' }}>
                    <Button title="📷" onPress={takePicture} disabled={!hasPermission} />
                    <Button title="⬆️" onPress={uploadPhoto} disabled={!photoUri} />
                    <Button title="Продолжить" onPress={() => navigation.navigate('Статус')} />
                </View>
            </Camera>
            {photoUri && <Image source={{ uri: photoUri }} style={{ flex: 1 }} />}
        </View>
    );
};

export default CameraScreen;
