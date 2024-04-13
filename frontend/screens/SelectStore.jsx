import React from 'react';
import { View, StyleSheet } from 'react-native';
import Yamap, { Marker } from 'react-native-yamap';

const SelectStore = () => {
    return (
        <View style={styles.container}>
            <Yamap
                style={styles.map}
                userLocationTrackingMode="follow"
                showMyLocationButton
            >
                <Marker
                    coordinate={{ latitude: 55.751244, longitude: 37.618423 }}
                    title="Yandex"
                    description="Yandex headquarters"
                    onPress={() => console.log('Marker pressed')}
                 />
            </Yamap>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default SelectStore;
