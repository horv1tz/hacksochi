import React, {useState, useRef, useEffect} from 'react';
import { View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

const CameraScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const cameraRef = useRef(null);



    const takePicture = async () => {
        if (cameraRef.current) {
            const { status } = await Camera.requestPermissionsAsync();
            if (status === 'granted') {
                const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
                setPhotoUri(photo.uri);
            } else {
                console.log('Permission to access camera was denied');
            }
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
                console.log('Upload successful:', response.data);
                // Добавьте здесь код для обработки успешной загрузки
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
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center',position: 'absolute',  bottom: 0,width: '100px'}}>
                    <Button title="📷" onPress={takePicture} disabled={!hasPermission} />
                    <Button title="⬆️" onPress={uploadPhoto} disabled={!photoUri} />
                </View>
            </Camera>
            {photoUri && <Image source={{ uri: photoUri }} style={{ flex: 1 }} />}
        </View>
    );
};

export default CameraScreen;
