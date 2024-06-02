import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    FlatList,
    Animated, ActivityIndicator
} from 'react-native';
import styles from "@/assets/styles/home.style"
import SearchBox from "@/components/SearchBox";
import Menu from "@/components/home/Menu";
import Banner from "@/components/home/Banner";
import ScrollView = Animated.ScrollView;
import ApiHook from "@/hooks/ApiHook";
export default function App() {

    const [text, setText] = useState('');




    const { data: menuData, loading: menuLoading, error: menuError } = ApiHook('/getMenu');
    const { data: hotData, loading: hotLoading, error: hotError } = ApiHook('/hot');
    const { data: sellerData, loading: sellerLoading, error: sellerError } = ApiHook('/seller');





    if (menuLoading || hotLoading) return <ActivityIndicator size="large" color="#ffff" />;
    if (menuError || hotError) return <Text>Error: {menuError?.message || hotError?.message}</Text>;
    function search() {

        if(text.length == 0){

            alert("Pleas enter your text!")
        }else{
            alert(text)
        }

    }

    const renderItem = ({ item }) => <Banner banner={item} is_coupon={true}/>;
    const render = ({ item }) => <Banner banner={item} is_coupon={false}/>;

    return (
        <View style={styles.container}>
            <ScrollView >
                <SearchBox text={text} search={search} setText={setText} />

                <View style={styles.box}>

                    <View  style={styles.menu}>
                        {menuData.map(item => (
                            <Menu key={item.id} items={item} />
                        ))}
                    </View>
                </View>
                <View>

                    <Text style={styles.subTitle}>Hot 🔥</Text>


                    <View style={styles.boxBanner}>

                        <FlatList

                            data={hotData}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            style={styles.bannerBox}
                        />
                    </View>
                </View>

                <View>

                    <Text style={styles.subTitle}>Best Sellers</Text>


                    <View style={styles.boxBanner}>

                        <FlatList

                            data={sellerData}
                            renderItem={render}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            style={styles.bannerBox}
                        />
                    </View>
                </View>
                <View>

                    <Text style={styles.subTitle}>Most visited places</Text>


                    <View style={styles.boxBanner}>

                        <FlatList

                            data={sellerData}
                            renderItem={render}
                            keyExtractor={item => item.id}
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


