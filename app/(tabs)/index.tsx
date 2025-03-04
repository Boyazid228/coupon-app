import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    FlatList,
    Animated,
    ActivityIndicator,
    RefreshControl,
    ScrollView,
} from 'react-native';
import styles from '@/assets/styles/home.style';
import SearchBox from '@/components/SearchBox';
import Menu from '@/components/home/Menu';
import Banner from '@/components/home/Banner';
import ApiHook from "@/hooks/ApiHook";

export default function App() {
    const [text, setText] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState({
        menuData: [],
        hotData: [],
        sellerData: [],
    });

    const {getData: getData, data: responseData, error:responseError, loading: l} = ApiHook();



    const handleRefresh = async () => {
        setRefreshing(true);

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const menuData = await getData('/getMenu/');
                const hotData = await getData('/hot/');
                const sellerData = await getData('/seller/');

                // Устанавливаем данные
                setData({ menuData: menuData, hotData: hotData, sellerData:sellerData });
            } catch (error) {
                console.error('Ошибка выполнения функции fetchData:', error);
            }

            setRefreshing(false);
        };
        fetchData();
    }, [refreshing]);

    if (!data.menuData.length && !data.hotData.length && !data.sellerData.length) {
        return <ActivityIndicator style={{ margin: 'auto' }} size="large" color="#ffff" />;
    }

    const search = () => {
        if (!text.trim()) {
            alert('Please enter your text!');
        } else {
            alert(text);
        }
    };

    const renderItem = ({ item }) => <Banner banner={item} is_coupon={true} />;
    const render = ({ item }) => <Banner banner={item} is_coupon={false} />;

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
                <SearchBox text={text} search={search} setText={setText} />

                <View style={styles.box}>
                    <View style={styles.menu}>
                        {data.menuData.map((item) => (
                            <Menu key={item.id} items={item} />
                        ))}
                    </View>
                </View>

                <View>
                    <Text style={styles.subTitle}>Hot 🔥</Text>
                    <View style={styles.boxBanner}>
                        <FlatList
                            data={data.hotData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal={true}
                            style={styles.bannerBox}
                        />
                    </View>
                </View>

                <View>
                    <Text style={styles.subTitle}>Best Sellers 🥇</Text>
                    <View style={styles.boxBanner}>
                        <FlatList
                            data={data.sellerData}
                            renderItem={render}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal={true}
                            style={styles.bannerBox}
                        />
                    </View>
                </View>

                <View>
                    <Text style={styles.subTitle}>Most visited places 🚩</Text>
                    <View style={styles.boxBanner}>
                        <FlatList
                            data={data.sellerData}
                            renderItem={render}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal={true}
                            style={styles.bannerBox}
                        />
                    </View>
                </View>

                <Text style={styles.footer}>Copyright. All Rights Reserved. © 2024 </Text>
            </ScrollView>
        </View>
    );
}
