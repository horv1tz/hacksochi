import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

const Camera = () => {
    const [photoUri, setPhotoUri] = useState(null);

    const takePicture = async (camera) => {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            setPhotoUri(data.uri);
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
            <RNCamera
                style={{ flex: 1 }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                captureAudio={false}
            >
                {({ camera, status, recordAudioPermissionStatus }) => {
                    if (status !== 'READY') return <View />;
                    return (
                        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                            <Button title="Take Picture" onPress={() => takePicture(camera)} />
                            <Button title="Upload" onPress={uploadPhoto} disabled={!photoUri} />
                        </View>
                    );
                }}
            </RNCamera>
            {photoUri && <Image source={{ uri: photoUri }} style={{ flex: 1 }} />}
        </View>
    );
};

export default Camera;
