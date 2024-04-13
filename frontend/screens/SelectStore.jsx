import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import InjectedJavaScript from '../utils/InjectedJavaScript'

const SelectStore = ({navigation}) => {
    const [selectedStore, setSelectedStore] = useState('');
    const webViewRef = useRef(null); // Ссылка на WebView

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                source={{ uri: 'https://yandex.ru/maps/142/donetsk/search/Продукты/?ll=37.841886%2C47.963170&sll=37.826329%2C47.983115&sspn=0.280443%2C0.117609&z=11.98' }}
                onMessage={(event) => {
                    if (event.nativeEvent.data === 'storeSelected') {
                        setSelectedStore(event.nativeEvent.data);
                    }
                }}
            />

            <Text style={styles.selectedStoreText}>Выбранный магазин: {selectedStore}</Text>

            <TouchableOpacity style={styles.selectButton} onPress={() => {
                navigation.navigate('Контроль цен', { selectedStore });
            }}>
                <Text style={styles.selectButtonText}>Выбрать магазин</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    selectedStoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    selectButton: {
        backgroundColor: '#007bff',
        padding: 10,
        margin: 20,
        borderRadius: 5,
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default SelectStore;
