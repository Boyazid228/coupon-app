import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Animated,
    Image,
    ImageBackground,
    RefreshControl,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { Modal, Button } from 'react-native';
import {useRoute} from "@react-navigation/core";
import {useNavigation} from "@react-navigation/native";
import styles from "@/assets/styles/card.style"
import ScrollView = Animated.ScrollView;
import Cupon from "@/components/Cupon";
import ApiHook from "@/hooks/ApiHook";
import config from "@/settings";
import RenderHtml from "react-native-render-html";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostApiHook from "@/hooks/PostApiHook";
import useAuthTokenRefresh from "@/hooks/useAuthTokenRefresh";
import {router, useLocalSearchParams} from "expo-router";

const Card = () => {
    const { id  } = useLocalSearchParams();

    const [visible, setVisible] = useState(false);
    const [htmlContent, setHtmlContent] = useState("");
    const [like, seLike] = useState('');
    const [ coupons, setCoupons ]= useState([])
    const [ data, setData ]= useState([])
    const [refreshing, setRefreshing] = useState(false);


    const handleRefresh = async () => {
        setRefreshing(true);

    };

    const {getData, data: datat, loading: menuLoading, error: menuError } = ApiHook();
    const { postData, loading, errors } = PostApiHook(`/getUser/`);

    const {refresh, result, error} = useAuthTokenRefresh();

    useEffect(()=>{
        const setLikes = async ()=>{

            const loadShop = await getData(`/getShop/${id}/`)
            const couponData = await getData(`/getCoupons/${id}/`)

            setData(loadShop)
            setCoupons(couponData)

            const jsonValue = await AsyncStorage.getItem("tokens");
            if (!jsonValue) {
                navigation.navigate("auth/login")
                return null;
            }
            const token_parse =  JSON.parse(jsonValue);


            const user = await postData({token: token_parse.access}, token_parse.access, `/getUser/`);

            if(user.code == "token_not_valid"){

                console.log("token_not_valid in likes")
                const newAccessToken = await refresh(); // Добавлено `await`
                if (newAccessToken) {
                    console.log("refreshed token");
                } else {
                    router.navigate('/login');
                    console.log("Failed to refresh token");
                }
            }
            if(like == "start"){
                console.info("KEK")
                const like_response = await postData({user: user.id, shop: id}, token_parse.access, `/setLike/`);
                console.log(like_response)
                if(like_response.status == "error"){

                    alert(like_response.message)

                }
            }

            setRefreshing(false);
        }


        setLikes()

    }, [like, refreshing])


    if (menuLoading) return   <ActivityIndicator style={{margin: "auto"}} size="large" color="#ffff" />;





    if (menuError ) return <Text>Error: {menuError?.message}</Text>;


    function showInfo() {

        setHtmlContent(data.info);
        setVisible(true)
    }
    function goto() {

        router.push(`/reviews?id=${data.id}&type="shop"`);
    }
    function setLike() {
        seLike("start")

    }




        return (
            <View style={styles.container}>



                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }>
                    <View style={styles.bg}>
                        <ImageBackground
                            style={styles.bgimg}
                            source={{ uri: config.img_link+data.background }}
                            defaultSource={require('@/assets/loader/loader.gif')}
                        >
                            <View style={styles.logoBox}>
                                <Image style={styles.i}  source={{ uri: config.img_link+data.logo }}/>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.cardBox}>
                        <Text style={styles.title}>{data.name}</Text>
                        <Text style={styles.subTItlt}>{data.short_description}</Text>
                        <View style={styles.ratingBox}>
                            <TouchableOpacity style={styles.rBox} onPress={goto}>
                                <Image style={styles.rImg} source={require("@/assets/images/star.png")} defaultSource={require('@/assets/loader/loader.gif')}/>
                                <Text>{data.rating} ({data.review_count})</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rBox} onPress={showInfo}>
                                <Image style={styles.rImg} source={require("@/assets/images/store.png")} defaultSource={require('@/assets/loader/loader.gif')}/>
                                <Text >Info</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rBox} onPress={setLike}>
                                <Image style={styles.rImg} source={require("@/assets/images/heart.png")} defaultSource={require('@/assets/loader/loader.gif')}/>
                                <Text >Like</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    {(!coupons || (coupons.length === 0 && !menuLoading)) ? <Text  style={styles.ntf}>Data not found</Text> : <View  style={styles.box}>

                            { coupons.map(i => (
                                <Cupon key={i.id} coupon={i}/>

                            ))}
                        </View>
                    }




                </ScrollView>

                <Modal visible={visible} transparent animationType="fade">
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                            <Text>Info: {data.name}</Text>
                            <RenderHtml contentWidth={300} source={{ html: htmlContent }} />
                            <Button title="OK" onPress={() => setVisible(false)} />
                        </View>
                    </View>
                </Modal>



            </View>
        );

};

export default Card;