import React, {useEffect, useState} from 'react';
import ApiHook from "@/hooks/ApiHook";
import {Text, View} from "react-native";

const ShopDataCards = (props) => {
    const { data: shopData, loading: shopLoading, error: shopError } = ApiHook(`/getShop?id=${props.shopId}`);

    console.log(shopData, ' shopData')


    return (
        <View>
            <Text></Text>
        </View>
    );
};

export default ShopDataCards;