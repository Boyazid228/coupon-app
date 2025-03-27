import React, {useEffect, useState} from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    RefreshControl
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/core";
import styles from "@/assets/styles/cupon.style";
import RenderHtml from 'react-native-render-html';
import ApiHook from "@/hooks/ApiHook";
import config from "@/settings";
import ShopDataCards from "@/components/ShopDataCards/ShopDataCards";
import {router, useLocalSearchParams} from "expo-router";

const CuponPage = () => {


    const { id, name } = useLocalSearchParams();

    const { width } = Dimensions.get('window');
    const { getData, data: couponData, loading: couponLoading, error: couponError } = ApiHook();
    const [refreshing, setRefreshing] = useState(false);


    const handleRefresh = async () => {
        setRefreshing(true);

    };


    useEffect(() => {

        const load = async ()=>{
            const loadData = await getData(`/getCoupon/${id}/`)
            setRefreshing(false);
        }
        load()
    }, [ name, refreshing]);

    if (couponLoading) return <ActivityIndicator style={{margin: "auto"}} size="large" color="#ffff" />;

    if (!couponData || (couponData.length === 0 && !couponError)) {
        return (
            <View style={styles.container}>
                <Text>Data not found</Text>
            </View>
        );
    }

    if (couponError) return <Text>Error: {couponError?.message}</Text>;

    const handleImagePress = () => {
        alert("buy");
    };

    const goto = () =>{
        router.push(`/reviews?id=${data.id}&type="coupon"`);
    }

    const dynamicHtml = couponData.description;
    const short_description = couponData.short_description;


    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
                <Image style={styles.mainImg} source={{ uri: config.img_link + couponData.background }} defaultSource={require('@/assets/loader/loader.gif')} />
                {couponData?.shop_id && <ShopDataCards shopId={couponData.shop_id}/>}
                <View style={styles.cuponBox}>
                    <Text style={styles.title}>{couponData.name} </Text>
                    <Text style={styles.subtitle}>1 / {couponData.price}$</Text>
                    <Text style={styles.description}>
                        <RenderHtml
                            contentWidth={width}
                            source={{ html: short_description }}
                        />
                    </Text>
                    <View style={styles.rev}>
                        <Image style={styles.rImg} source={require("@/assets/images/star.png")} />
                        <Text>{couponData.rating} ({couponData.review_count})</Text>
                        <Text  onPress={goto} style={styles.link}>Read Reviews</Text>
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
