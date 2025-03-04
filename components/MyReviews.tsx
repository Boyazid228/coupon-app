import React from 'react';
import styles from "@/assets/styles/reviews";
import {Text, useWindowDimensions, View} from "react-native";
import Stars from "@/components/Stars";
import RenderHtml from "react-native-render-html";

const MyReviews = ({data}) => {

    const date = new Date(data.date);

    const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    const { height, width } = useWindowDimensions();

    // Default value for coupon if not provided

    const dynamicHtml = data.description;

    return (
        <View style={styles.review_box}>
            <View style={styles.review_title_box}>

                <View style={styles.title_box}>
                    <Text style={styles.review_title}>{data.product ? data.product.name : data.shop.name}</Text>
                    <Text>({formattedDate}) </Text>

                </View>
                <Stars style={ styles.starts } stars_count={data.grade}/>
            </View>

            <RenderHtml style={styles.description}
                contentWidth={width}

                source={{ html: dynamicHtml }}
            />
            <Text>{data.user.username}</Text>


        </View>
    );
};

export default MyReviews;