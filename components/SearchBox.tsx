import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "@/assets/styles/home.style";
import '../i18n/i18n';
import { useTranslation } from 'react-i18next';



 const SearchBox = ({text, setText, search}) => {


     const { t, i18n } = useTranslation();

     return (
        <View style={styles.searchBox}>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder={t("Korean_food")}
                placeholderTextColor="gray"
            />
            <View style={styles.searchButtonContainer}>

                <TouchableOpacity style={styles.searchButton} onPress={search}>
                    <Text style={styles.searchButtonText}>{t('Search')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SearchBox;