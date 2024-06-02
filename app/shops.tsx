import React, {useEffect} from 'react';
import {ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useRoute} from "@react-navigation/core";
import styles from "@/assets/styles/shops.style";
import Stars from "@/components/Stars";
import ApiHook from "@/hooks/ApiHook";
import config from '@/settings'
const Shops = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const { name } = route.params;
    const { width } = Dimensions.get('window');

    const { data: menuData, loading: menuLoading, error: menuError } = ApiHook(`/getShops?id=${id}`);
    useEffect(() => {
        navigation.setOptions({
            title: name,
            headerBackTitle: 'Back',
        });
    }, [navigation]);
    if (menuLoading) return <ActivityIndicator size="large" color="#ffff" />;

    if (!menuData  || menuData.length === 0 && !menuLoading) {
        return (
            <View style={styles.container}>

                <Text style={styles.short}>Data not found</Text>
            </View>
        );
    }
    if (menuError) return <Text>Error: {menuError?.message}</Text>;
    function handleImagePress(id, name){
        navigation.navigate('card', {id: id, name: name});
    }



    return (

        <View style={styles.container}>
            <ScrollView style={styles.shopsBox}>
                {menuData.map(item => (
                    <TouchableOpacity key={item.id} style={styles.shop} onPress={() => handleImagePress(item.id, item.name)}>
                        <View style={styles.flex}>
                            <View>
                                <Image
                                    style={styles.img}
                                    source={{ uri: config.img_link+item.img }}
                                />
                            </View>
                            <View style={styles.textBox}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Stars stars_count={item.rating} />
                                <Text style={styles.short}>{item.short_description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Shops;
