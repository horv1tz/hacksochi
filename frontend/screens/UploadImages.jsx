import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const UploadImages = ({navigation}) => {
    const [selectedImage, setSelectedImage] = useState(null);

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
        try {
            if (selectedImage) {
                const formData = new FormData();
                formData.append('image', {
                    uri: selectedImage,
                    name: 'image.jpg',
                    type: 'image/jpg',
                });

                const response = await axios.post('YOUR_SERVER_ENDPOINT', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Image uploaded successfully:', response.data);
                // Handle success or navigate to next screen
            } else {
                console.log('No image selected.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            // Handle error
        }
    };

    return (
        <View style={styles.container}>
            {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.image} />
            )}
            <Button  title="Выберите изображение из галереи" onPress={pickImage} style={styles.button} />
            <Button title="Загрузить" onPress={() => navigation.navigate('Статус')} style={styles.button} />
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
