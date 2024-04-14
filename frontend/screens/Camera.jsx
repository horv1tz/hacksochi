import React, { useState, useRef, useEffect } from 'react';
import { View, Button, Image, Platform, StyleSheet } from 'react-native';
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
