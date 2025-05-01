import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity, RefreshControl,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostApiHook from '@/hooks/PostApiHook';
import useAuthTokenRefresh from '@/hooks/useAuthTokenRefresh';
import config from '@/settings';
import Stars from '@/components/Stars';
import styles from '@/assets/styles/shops.style';
import { router } from 'expo-router';
import '../../i18n/i18n';
import { useTranslation } from 'react-i18next';

const Favorits = () => {
    const navigation = useNavigation();
    const { postData } = PostApiHook("");
    const { refresh } = useAuthTokenRefresh();
    const [likes, setLikes] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { t, i18n } = useTranslation();

    const fetchLikes = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('tokens');
            if (!jsonValue) {
                router.navigate('login');
                return;
            }

            const tokenParse = JSON.parse(jsonValue);
            const user = await postData({ token: tokenParse.access }, tokenParse.access, '/getUser/');
            if (user?.code === 'token_not_valid') {
                const newAccessToken = await refresh();
                if (!newAccessToken) {
                    router.navigate('login');
                    return;
                }
            }

            const likesResponse = await postData(
                { id: user.id },
                tokenParse.access,
                '/getLike/'
            );
            setLikes(likesResponse || []);
        } catch (error) {
            console.error('Error fetching likes:', error);
        } finally {
            setLoadingData(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setLoadingData(true);
            fetchLikes();
        }, [refreshing])
    );

    const handleRefresh = async () => {
        setRefreshing(true);

    };

    if (loadingData) {
        return <ActivityIndicator style={{ margin: 'auto' }} size="large" color="#fff" />;
    }

    if (!likes.length) {
        return (
            <View style={styles.container}>
                <Text style={styles.short}>No favorites found</Text>
            </View>
        );
    }

    const handleImagePress = (id, name) => {
        router.push(`/card?id=${id}&name="${name}"`);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            key={item.id}
            style={styles.shop}
            onPress={() => handleImagePress(item.shop.id, item.shop.name)}
        >
            <View style={styles.flex}>
                <Image
                    style={styles.img}
                    source={{ uri: config.img_link + item.shop.preview }}
                    defaultSource={require('@/assets/loader/loader.gif')}
                />
                <View style={styles.textBox}>
                    <Text style={styles.name}>{item.shop.name}</Text>
                    <Stars stars_count={item.shop.rating} />
                    <Text style={styles.short}>{item.shop.short_description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('My_Favorites')}</Text>
            <FlatList
                data={likes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flstList}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            />
        </View>
    );
};

export default Favorits;
