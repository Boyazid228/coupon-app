import React from 'react';
import {Image, View} from "react-native";
import styles from "@/assets/styles/home.style";

const Stars = ({stars_count}) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if(i <= stars_count){
            stars.push(
                <Image key={i} style={styles.star} source={ require("@/assets/images/star.png") }/>
            );
        }else {
            stars.push(
                <Image key={i}  style={styles.star} source={ require("@/assets/images/star-empty.png") }/>
            );

        }

    }
    return (
        <View style={styles.score}>
            <View style={styles.stars}>
                {stars}
            </View>
        </View>
    );
};

export default Stars;