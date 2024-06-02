import React from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "@/assets/styles/card.style";
import { useNavigation } from "@react-navigation/native";
import Stars from "@/components/Stars";
import config from "@/settings";

const Cupon = ( {coupon }) => {
    const navigation = useNavigation();

    const handleImagePress = (id, name) => {
        navigation.navigate('cuponPage',  {id:id, name:name} );
    };

    return (
        <TouchableOpacity onPress={() => handleImagePress(coupon.id, coupon.name)}>
            <View style={styles.cupon}>
                <View style={styles.nameBox}>
                    <Text style={styles.cuponName}>{coupon.name}</Text>
                    <View >
                        <Stars stars_count={coupon.rating}/>
                    </View>
                </View>

                <View style={styles.imgBox}>
                    <Image style={styles.cuponImg} source={{ uri: config.img_link+coupon.img }} />
                    <View>
                        <Text style={styles.cuponText}>{coupon.short_description}</Text>
                        <Text>Time : {coupon.time_start} </Text>
                        <Text> - {coupon.time_finish}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Cupon;
