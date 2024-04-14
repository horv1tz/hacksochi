import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import WebView from 'react-native-webview';
import HTMLParser from 'react-native-html-parser';
import InjectedJavaScript from '../utils/InjectedJavaScript';

const SelectStore = ({ navigation }) => {
    const [selectedStore, setSelectedStore] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const webViewRef = useRef(null); // Ссылка на WebView

    useEffect(() => {
        if (webViewRef.current) {
            webViewRef.current.injectJavaScript(`(${InjectedJavaScript})()`);
        }

        return () => {
            // Очистить обработчик, если компонент размонтируется
            if (webViewRef.current) {
                webViewRef.current.stopLoading();
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                source={{ uri: 'https://yandex.ru/maps/142/donetsk/search/Продукты/?ll=37.841886%2C47.963170&sll=37.826329%2C47.983115&sspn=0.280443%2C0.117609&z=11.98' }}
                onMessage={(event) => {
                    const html = event.nativeEvent.data;
                    const root = HTMLParser.parse(html);
                    const addressLink = root.querySelector('.business-contacts-view__address-link');
                    if (addressLink) {
                        setSelectedStore(addressLink.textContent.trim());
                    }
                }}
            />

            <TextInput
                style={styles.addressInput}
                placeholder="Введите адрес"
                onChangeText={text => setAddressInput(text)}
                value={addressInput}
            />

            <TouchableOpacity style={styles.selectButton} onPress={() => {
                navigation.navigate('Контроль цен', { selectedStore: addressInput });
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
    addressInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    selectButton: {
        backgroundColor: '#007bff',
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 5,
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default SelectStore;
