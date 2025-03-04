import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "@/assets/styles/home.style";

 const SearchBox = ({text, setText, search}) => {
    return (
        <View style={styles.searchBox}>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder="Korean food"
                placeholderTextColor="gray"
            />
            <View style={styles.searchButtonContainer}>

                <TouchableOpacity style={styles.searchButton} onPress={search}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SearchBox;