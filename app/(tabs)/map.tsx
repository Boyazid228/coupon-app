import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image, Linking, ActivityIndicator} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import customMarkerImage from '@/assets/images/location-marker.png';
import customUserMarkerImage from '@/assets/images/pin-point.png';
import ApiHook from "@/hooks/ApiHook";
import {useNavigation} from "@react-navigation/native";
import config from "@/settings";
export default function Map() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    const navigation = useNavigation();
    const handlePress = (id , name) => {
        navigation.navigate('card', {id: id, name: name});
    };

    const {getData, data: marks, loading: loading, error: error } = ApiHook();


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            const mark = await getData(`/getMarks`)
        })();
    }, []);




    if (loading) return  <ActivityIndicator style={{margin: "auto"}} size="large" color="#ffff" />;

    if (errorMsg) {
        return <Text>{errorMsg}</Text>;
    }

    if (!location) {
        return  <ActivityIndicator style={{margin: "auto"}} size="large" color="#ffff" />;
    }

    if (!marks  || marks.length === 0 && !error) {


        return (
            <View style={styles.container}>

                <Text >Data not found</Text>
            </View>
        );
    }
    if (error) return <Text>Error: {error?.message}</Text>;

    console.log()

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
                {marks.map(place => (
                    <Marker
                        key={place.id}
                        coordinate={{
                            latitude: place.latitude,
                            longitude: place.longitude,
                        }}
                        title={place.shop.name}
                    >
                        <Image source={place.shop.logo? {uri: config.img_link+place.shop.logo} :customMarkerImage} style={styles.markerImage} />
                        <Callout>
                            <View style={styles.callout}>
                                <Text onPress={() =>handlePress(place.shop.id, place.shop.name)} style={{textAlign: "center"}}>{place.shop.name}</Text>
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
