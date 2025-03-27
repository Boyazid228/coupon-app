import React from 'react';
import styles from "@/assets/styles/home.style";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import config from '@/settings'
import {router} from "expo-router";
const Menu = ({items}) => {

    function handleImagePress(id, name){
        router.push(`/shops?id=${id}&name=${encodeURIComponent(name)}`);

    }
    let  img = config.img_link+items.img.replace(/\\/g, '/');
    return (




            <TouchableOpacity onPress={() => handleImagePress(items.id, items.name)} style={styles.ibpa}>
                <Image
                    style={styles.image}
                    source={{ uri: img }}
                />
                <Text style={styles.imagename}>{items.name}</Text>
            </TouchableOpacity>

    );
};

export default Menu;