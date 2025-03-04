import React from 'react';
import {Image, Text, View} from "react-native";
import styles from "@/assets/styles/home.style";

const TestDjango = ({ data }) => {

    console.log(data)
    return (
        <View>
            <Text style={styles.imagename}>tset</Text>
            <Text style={styles.imagename}>{data.id}</Text>
        </View>
    );
};

export default TestDjango;