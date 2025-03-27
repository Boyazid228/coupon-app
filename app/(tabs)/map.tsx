import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import customMarkerImage from '@/assets/images/location-marker.png';
import customUserMarkerImage from '@/assets/images/pin-point.png';
import ApiHook from "@/hooks/ApiHook";
import { router } from "expo-router";
import config from "@/settings";

export default function Map() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const { getData, data: marks, loading, error } = ApiHook();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            await getData(`/getMarks`);
        })();
    }, []);

    // Функция для перехода на страницу магазина
    const handlePress = (id, name) => {
        router.push({ pathname: "/card", params: { id, name } });
    };

    // Показываем индикатор загрузки, если данные ещё загружаются
    if (loading || !location) {
        return <ActivityIndicator style={styles.loader} size="large" color="#ffff" />;
    }

    if (errorMsg) {
        return <Text style={styles.errorText}>{errorMsg}</Text>;
    }

    if (!marks || (marks.length === 0 && !error)) {
        return (
            <View style={styles.container}>
                <Text style={styles.noDataText}>Data not found</Text>
            </View>
        );
    }

    if (error) return <Text style={styles.errorText}>Error: {error?.message}</Text>;

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
                {/* Маркер пользователя */}
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title="You are here"
                >
                    <Image source={customUserMarkerImage} style={styles.markerImage} />
                    <Callout>
                        <View style={styles.callout}>
                            <Text>You are here</Text>
                        </View>
                    </Callout>
                </Marker>

                {/* Маркеры магазинов */}
                {marks.map(place => (
                    <Marker
                        key={place.id}
                        coordinate={{
                            latitude: place.latitude,
                            longitude: place.longitude,
                        }}
                        title={place.shop.name}
                        onCalloutPress={() => handlePress(place.shop.id, place.shop.name)} // Исправленный обработчик нажатия
                    >
                        <Image
                            source={place.shop.logo ? { uri: config.img_link + place.shop.logo } : customMarkerImage}
                            style={styles.markerImage}
                        />
                        <Callout>
                            <View style={styles.callout}>
                                <Text style={styles.shopName}>{place.shop.name}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

// Стили
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    markerImage: {
        width: 40,
        height: 40,
    },
    callout: {
        width: 140,
        height: 50,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shopName: {
        textAlign: "center",
        color: "blue",
        fontWeight: "bold",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        fontSize: 16,
        margin: 10,
    },
    noDataText: {
        textAlign: "center",
        fontSize: 16,
        color: "#555",
    },
});

