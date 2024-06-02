import React, { useEffect } from 'react';
import {Image, Text, TouchableOpacity, View, ScrollView, Dimensions, ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/core";
import styles from "@/assets/styles/cupon.style";
import RenderHtml from 'react-native-render-html';
import ApiHook from "@/hooks/ApiHook";
import config from "@/settings";

const CuponPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const { name } = route.params;
    const { width } = Dimensions.get('window');
    console.log(id)
    const { data: couponData, loading: couponLoading, error: couponError } = ApiHook(`/getCoupon?id=${id}`);

    useEffect(() => {
        navigation.setOptions({
            title: name,
            headerBackTitle: 'Back',
        });
    }, [navigation]);
    if (couponLoading) return <ActivityIndicator size="large" color="#ffff" />;

    if (!couponData  || couponData.length === 0 && !couponError) {

        console.log(couponData)
        return (
            <View style={styles.container}>

                <Text >Data not found</Text>
            </View>
        );
    }
    if (couponError) return <Text>Error: {couponError?.message}</Text>;
    const handleImagePress = () => {
        alert("buy");
    };

    const dynamicHtml = couponData.description;

    return (
        <View style={styles.container}>
            <ScrollView >
                <Image style={styles.mainImg} source={{ uri: config.img_link+couponData.img }} />
                <View style={styles.cuponBox}>
                    <Text style={styles.title}>React Expo {id}</Text>
                    <Text style={styles.subtitle}>1 / {couponData.price}$</Text>
                    <Text style={styles.description}>
                        {couponData.short_description}
                    </Text>
                    <View style={styles.rev}>
                        <Image style={styles.rImg} source={require("@/assets/images/star.png")} />
                        <Text>{couponData.rating} (70)</Text>
                        <Text style={styles.link}>Read Reviews</Text>
                    </View>
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: dynamicHtml }}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.banner} onPress={handleImagePress}>
                <Text style={styles.bannerText}>Buy {couponData.price}$</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CuponPage;
