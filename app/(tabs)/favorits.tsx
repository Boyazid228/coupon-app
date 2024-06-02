import React from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';
import MyVlog from "@/components/myVlog";
import styles from "@/assets/styles/vlog.style";



const Favorits = () => {

    const data = [
        { id: '1', uri: 'https://i.postimg.cc/yx8BmgTh/istockphoto-1360554418-612x612.jpg', h: 200 },
        { id: '2', uri: 'https://i.postimg.cc/fypH0qZm/istockphoto-1356021939-612x612.jpg', h: 250 },
        { id: '3', uri: 'https://i.postimg.cc/fypH0qZm/istockphoto-1356021939-612x612.jpg', h: 180 },
        { id: '4', uri: 'https://i.postimg.cc/YS5XHJPJ/istockphoto-1136760384-612x612.jpg', h: 210},
    ];

    const renderItem = ({ item }) => (


        <MyVlog item={item}/>

    );
    return (
        <View style={styles.container}>
            <View style={styles.vlogBox}>
                <FlatList

                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between'}}
                />
            </View>
        </View>
    );
};


export default Favorits;
