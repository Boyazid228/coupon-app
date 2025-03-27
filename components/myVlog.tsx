import React, {useState} from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import styles from "@/assets/styles/vlog.style";

const MyVlog = ({ item }) => {

    function handleImagePress(){
        console.log("gg")

    }
    return (
        <View
              style={styles.vlogScreen}

        >

            <TouchableOpacity style={styles.vlog} onPress={handleImagePress}>

                <Image
                    source={{ uri: item.uri }}
                    style={styles.backgroundImage}
                >

                </Image>

                <View style={styles.vlogText}>
                    <Text style={styles.text}>Текст поверх фона</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default MyVlog;