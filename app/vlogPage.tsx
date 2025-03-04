import React, {useEffect} from 'react';
import {View, Text, useWindowDimensions, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useRoute} from "@react-navigation/core";
import style from "@/assets/styles/vlogPage.style";
import RenderHtml from "react-native-render-html";
const VlogPage = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { height, width } = useWindowDimensions();
    const { item } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: item.user.username + "'s Vlog",
            headerBackTitle: 'Back',
        });
    }, [navigation]);

    const date = new Date(item.date);
    const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return (
        <View style={style.container}>
            <ScrollView style={style.vlogBox}>
                <RenderHtml
                    contentWidth={width }

                    source={{ html: item.description }}
                />
                <Text>
                   {"\n"}

                </Text>
                <Text>Author {item.user.username} / {formattedDate}</Text>
                <Text>
                    {"\n"}
                    {"\n"}{"\n"}
                    {"\n"}



                </Text>
            </ScrollView>
        </View>
    );
};

export default VlogPage;