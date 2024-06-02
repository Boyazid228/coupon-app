import React from 'react';
import {View, Text, FlatList} from "react-native";
import styles from "@/assets/styles/vlog.style"
import Banner from "@/components/myVlog";
import MyVlog from "@/components/myVlog";
import SearchBox from "@/components/SearchBox";
import MasonryList from 'react-native-masonry-list';
const Vlog = () => {

    const data = [
        { id: '1', title: 'Item 1', uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg"  },

        { id: '3', title: 'Item 3', url: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg" },
        { id: '4', title: 'Item 4', url: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg" },
        { id: '5', title: 'Item 5', url: 'https://via.placeholder.com/350/0000FF/FFFFFF?Text=Item5' },
        { id: '6', title: 'Item 6', url: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg" },
    ];




    function go() {
        alert("go")
    }
    return (
        <View style={styles.container}>

            <SearchBox/>

            <View style={styles.con}>
                <MasonryList
                    images={data}
                    onPressImage = {go}
                />

            </View>





        </View>
    );
};

export default Vlog;