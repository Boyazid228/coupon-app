import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image, Linking} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import customMarkerImage from '@/assets/images/location-marker.png';
import customUserMarkerImage from '@/assets/images/pin-point.png';
export default function Map() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const nearbyPlaces = [
        { id: 1, latitude: 37.29996374699623, longitude: 126.83993279957564, title: 'Place 1' },
        { id: 2, latitude: 37.29996354699623, longitude: 126.83663275957564, title: 'Place 2' },
        // Добавьте больше мест по необходимости
    ];

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    if (errorMsg) {
        return <Text>{errorMsg}</Text>;
    }

    if (!location) {
        return <Text>Waiting...</Text>;
    }
    const handlePress = (link) => {
        Linking.openURL('https://example.com');
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title={"You are here"}
                >
                    <Image source={customUserMarkerImage} style={styles.markerImage} />
                    <Callout>
                        <View style={styles.callout}>
                            <Text>{"You are here"}</Text>
                        </View>
                    </Callout>

                </Marker>
                {nearbyPlaces.map(place => (
                    <Marker
                        key={place.id}
                        coordinate={{
                            latitude: place.latitude,
                            longitude: place.longitude,
                        }}
                        title={place.title}
                    >
                        <Image source={customMarkerImage} style={styles.markerImage} />
                        <Callout>
                            <View style={styles.callout}>
                                <Text onPress={() =>handlePress("link")} >{place.title}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#fff"
    },
    map: {
        width: '100%',
        height: '100%',
    },markerImage: {
        width: 40,
        height: 40,
    },
    callout: {
        width: 140,
        height: 50,
        padding: 5,
    },
});
