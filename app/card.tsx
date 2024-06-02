import React, {useEffect} from 'react';
import {ActivityIndicator, Animated, Image, ImageBackground, Text, View} from "react-native";
import {useRoute} from "@react-navigation/core";
import {useNavigation} from "@react-navigation/native";
import styles from "@/assets/styles/card.style"
import ScrollView = Animated.ScrollView;
import Cupon from "@/components/Cupon";
import ApiHook from "@/hooks/ApiHook";
import config from "@/settings";


const Card = () => {
    const route = useRoute();
    const { id } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: 'Новая страница',
            headerBackTitle: 'Back',
            headerShown: false,

        });
    }, []);
    const { data: data, loading: menuLoading, error: menuError } = ApiHook(`/getShop?id=${id}`);
    const { data: coupons, loading: couponsLoading, error: couponsError } = ApiHook(`/getCoupons?id=${id}`);

    if (menuLoading || couponsLoading) return <ActivityIndicator size="large" color="#ffff" />;





    if (menuError ) return <Text>Error: {menuError?.message || couponsError?.message}</Text>;




        return (
            <View style={styles.container}>



                <ScrollView>
                    <View style={styles.bg}>
                        <ImageBackground
                            style={styles.bgimg}
                            source={{ uri: config.img_link+data.bg_img }}
                        >
                            <View style={styles.logoBox}>
                                <Image style={styles.i} source={{ uri: config.img_link+data.logo }}/>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.cardBox}>
                        <Text style={styles.title}>{data.name}</Text>
                        <Text style={styles.subTItlt}>{data.short_description}</Text>
                        <View style={styles.ratingBox}>
                            <View style={styles.rBox}>
                                <Image style={styles.rImg} source={require("@/assets/images/star.png")}/>
                                <Text>{data.rating} (70)</Text>
                            </View>
                            <View style={styles.rBox}>
                                <Image style={styles.rImg} source={require("@/assets/images/store.png")}/>
                                <Text>Info</Text>
                            </View>
                        </View>

                    </View>
                    {(!coupons || (coupons.length === 0 && !menuLoading)) ? <Text  style={styles.ntf}>Data not found</Text> : <View  style={styles.box}>

                            { coupons.map(i => (
                                <Cupon key={i.id} coupon={i}/>

                            ))}
                        </View>
                    }




                </ScrollView>



            </View>
        );

};

export default Card;