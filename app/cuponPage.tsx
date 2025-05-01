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
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostApiHook from "@/hooks/PostApiHook";
import '../i18n/i18n';
import { useTranslation } from 'react-i18next';

const CuponPage = () => {


    const { id, name } = useLocalSearchParams();
    const { width } = Dimensions.get('window');
    const { postData, loading, errors } = PostApiHook(`/getUser/`);
    const { getData, data: couponData, loading: couponLoading, error: couponError } = ApiHook();

    const [refreshing, setRefreshing] = useState(false);
    const { t, i18n } = useTranslation();


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
                <Text>{ t(Data_not_found) }</Text>
            </View>
        );
    }

    if (couponError) return <Text>Error: {couponError?.message}</Text>;

    const handleImagePress =  async  () => {

        const jsonValue = await AsyncStorage.getItem("tokens");
        if (!jsonValue) {
            router.navigate('/login');
            return null;
        }
        const token_parse =  JSON.parse(jsonValue);

        const user = await postData({token: token_parse.access}, token_parse.access, `/getUser/`);

        const order_response = await postData({user: user.id, product: couponData.id, payment: 'pending' }, token_parse.access, `/order/`);
        if(order_response.status == "error"){


        }else{
            alert("Success")
        }

    };

    const goto = () =>{
        router.push(`/reviews?id=${couponData.id}&type="coupon"`);
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
                        <Text  onPress={goto} style={styles.link}>{t('Read_Reviews')}</Text>
                    </View>
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: dynamicHtml }}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.banner} onPress={handleImagePress}>
                <Text style={styles.bannerText}>{ t('Buy') } {couponData.price}$</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CuponPage;
