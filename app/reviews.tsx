import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, ScrollView} from "react-native";
import styles from "@/assets/styles/reviews";
import {useRoute} from "@react-navigation/core";
import {useNavigation} from "@react-navigation/native";
import ApiHook from "@/hooks/ApiHook";
import Stars from "@/components/Stars";
import MyReviews from "@/components/MyReviews";

const Reviews = () => {

    const route = useRoute();
    const { id, type } = route.params;
    const navigation = useNavigation();
    const { getData, data: reviewsData, loading: reviewsLoading, error: reviewsError } = ApiHook();

    useEffect(() => {
        navigation.setOptions({
            title: 'Reviews ',
            headerBackTitle: 'Back',


        });
        const load = async ()=>{
            const loadData = await getData(`/reviews/${id}/${type}/`)

        }
        load()
    }, []);

    if ( reviewsLoading) return <ActivityIndicator style={{margin: "auto"}} size="large" color="#ffff" />;

    if ( reviewsError) return <Text>Error: {reviewsError?.message }</Text>;




    return (

        <View style={styles.container}>
            <View >
                <ScrollView style={styles.cuponBox}>
                    {reviewsData && reviewsData.length > 0 ? reviewsData.map(item => (
                        <MyReviews data={item} key={item.id}/>
                    )) : (<Text >No reviews available.</Text>)

                    }

                </ScrollView>
            </View>
        </View>
    );
};

export default Reviews;