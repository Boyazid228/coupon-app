import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, ScrollView, RefreshControl, Image, Modal, TouchableOpacity} from "react-native";
import styles from "@/assets/styles/reviews";
import {useRoute} from "@react-navigation/core";
import {useNavigation} from "@react-navigation/native";
import ApiHook from "@/hooks/ApiHook";
import Stars from "@/components/Stars";
import MyReviews from "@/components/MyReviews";
import {useLocalSearchParams} from "expo-router";

const Reviews = () => {

    const [refreshing, setRefreshing] = useState(false);
    const { id, type } = useLocalSearchParams();
    const { getData, data: reviewsData, loading: reviewsLoading, error: reviewsError } = ApiHook();
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {

        const load = async ()=>{
            const loadData = await getData(`/reviews/${id}/${type}/`)

            setRefreshing(false);

        }
        load()
    }, [refreshing]);

    const handleRefresh = async () => {
        setRefreshing(true);

    };

    if ( reviewsLoading) return <ActivityIndicator style={{margin: "auto"}} size="large" color="#ffff" />;

    if ( reviewsError) return <Text>Error: {reviewsError?.message }</Text>;

    function closeModal() {
        setModalVisible(!modalVisible);
        alert('Language changed');
    }

    return (

        <View style={styles.container} >
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >

                <View style={styles.add_rew}  >
                    <Image style={styles.img} source={require("@/assets/images/add-file.png")}/>
                    <Text style={styles.text} onPress={() => setModalVisible(true)}>Add review</Text>
                </View>
                <View >
                    <ScrollView style={styles.cuponBox}>
                        {reviewsData && reviewsData.length > 0 ? reviewsData.map(item => (
                            <MyReviews data={item} key={item.id}/>
                        )) : (<Text >No reviews available.</Text>)

                        }

                    </ScrollView>
                </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>



                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={closeModal}
                                >
                                    <Text style={styles.modalText}>English</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={closeModal}
                                >
                                    <Text style={styles.modalText}>Korean</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

            </ScrollView>
        </View>
    );
};

export default Reviews;