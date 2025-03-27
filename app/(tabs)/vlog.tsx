import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from '@/assets/styles/vlog.style';
import SearchBox from '@/components/SearchBox';
import MasonryList from 'react-native-masonry-list';
import ApiHook from '@/hooks/ApiHook';
import config from '@/settings';
import { useNavigation } from '@react-navigation/native';
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Vlog = () => {
    const { getData, loading, error } = ApiHook();
    const [vlogData, setVlogData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadData = async (isRefreshing = false) => {
        try {
            const data = await getData(`/getVlogs/`);
            const formattedData = data.map(vlog => ({
                ...vlog,
                url: config.img_link + vlog.img,
            }));
            setVlogData(formattedData);
        } catch (err) {
            console.error('Error loading data:', err);
        } finally {
            if (isRefreshing) setRefreshing(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true); // Указываем, что идет обновление
        loadData(true);      // Вызываем функцию загрузки данных
    };

    const navigateToVlog = async (item) => {
        try {
            await AsyncStorage.setItem("vlog", JSON.stringify(item));
            router.push("/vlogPage");
        } catch (error) {
            console.error("Ошибка при сохранении в AsyncStorage:", error);
        }
    };


    if (loading && !refreshing) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Ошибка: {error.message || 'Что-то пошло не так!'}</Text>
            </View>
        );
    }

    if (!vlogData || vlogData.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Данные не найдены</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SearchBox />
            <View style={styles.con}>
                <MasonryList
                    images={vlogData}
                    onPressImage={navigateToVlog}
                    imageContainerStyle={styles.img}
                    refreshing={refreshing} // Передаем состояние обновления
                    onRefresh={handleRefresh} // Передаем функцию обновления
                />
            </View>
        </View>
    );
};

export default Vlog;
