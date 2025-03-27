import React, {useEffect, useState} from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from '@/assets/styles/account.style';
import { useNavigation } from '@react-navigation/native';
import useAuthToken from '@/hooks/useAuthTokenRefresh';
import useTokenValidation from '@/hooks/useTokenValidation';
import useAuthTokenRefresh from "@/hooks/useAuthTokenRefresh";
import PostApiHook from "@/hooks/PostApiHook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRoute} from "@react-navigation/core";
import { Link } from 'expo-router';
import { router } from 'expo-router';
const Account = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [tokenCheck, setTokenCheck] = useState("");
    const [token, setToken] = useState("")
    const [userData, setUserData] = useState({})
    const { jwt, status } = useTokenValidation(tokenCheck);
    const {refresh, result, error} = useAuthTokenRefresh();
    const { postData, loading, errors } = PostApiHook(`/getUser/`);


    //const route = useRoute();
    const  login = {}; //route.params



    useEffect(() => {


        const handleTokenRefresh = async () => {

            if (status === "refresh") {
                const newAccessToken = await refresh(); // Добавлено `await`
                if (newAccessToken) {
                    setToken(newAccessToken)
                    setTokenCheck("refresh");
                } else {
                    console.log("Failed to refresh token");
                }
            } else if (status === "success"){
                const jsonValue = await AsyncStorage.getItem("tokens");
                if (!jsonValue) {
                    console.error("Tokens not found in AsyncStorage");
                    return null;
                }
                const token_parse =  JSON.parse(jsonValue);

                console.log(token_parse)
                const user = await postData({token: token_parse.access}, token_parse.access);
                console.log(user)
                setUserData(user)
                if(user.code == "token_not_valid"){
                    setTokenCheck("token_not_valid");

                }

            }else if(status == 'token_not_found'){
                console.info("Log out")
                setTokenCheck('token_not_found')
            }
        };

        handleTokenRefresh(); // Вызов асинхронной функции


    }, [status]);
    useEffect(() => {
        if (login !== undefined && login.login) {
            setTokenCheck('new login');
        }
    }, [login]);


    function closeModal() {
        setModalVisible(!modalVisible);
        alert('Language changed');
    }

    const goto = (link) => {

        router.replace('/login');
    }
    const logout = async () =>{
        try {
            await AsyncStorage.removeItem('tokens');
            setTokenCheck('log out')
            return true;
        }
        catch(exception) {
            return false;
        }



    }


    if (jwt) {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.header}>
                        <View style={styles.settings}></View>
                        <Text style={styles.title}>My Account</Text>
                        <TouchableOpacity
                            style={styles.openButton}
                            onPress={() => setModalVisible(true)}
                        ><Image style={styles.settings} source={require("@/assets/images/settings.png")}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.nameBox}>
                        <Text style={styles.name}>{userData.username}</Text>
                        <Image style={styles.arrow}  source={require("@/assets/images/right-arrow.png")}/>
                    </View>

                    <TouchableOpacity onPress={logout}>
                        <Text>Log out</Text>
                    </TouchableOpacity>

                    <View style={[styles.flex, styles.myBox]}>
                        <View style={styles.myBoxes}>
                            <Image style={styles.img} source={require("@/assets/images/vlogging.png")}/>
                            <Text style={styles.text}>My Vlog</Text>
                        </View>
                        <View style={styles.myBoxes}>
                            <Image style={styles.img} source={require("@/assets/images/online-menu.png")}/>
                            <Text style={styles.text}>My Orders</Text>
                        </View>
                        <View style={styles.myBoxes}>
                            <Image style={styles.img} source={require("@/assets/images/reviews.png")}/>
                            <Text style={styles.text}>My Reviews</Text>
                        </View>
                    </View>
                    <Text style={styles.subTItle}>Some info menu</Text>
                    <View style={styles.menu}>
                        <Text style={styles.menuItem}>Payment</Text>
                        <Text style={styles.menuItem}>Return condition</Text>
                        <Text style={styles.menuItem}>Sale</Text>
                        <Text style={styles.menuItem}>FAQ</Text>
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
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.header}>
                        <View style={styles.settings}></View>
                        <Text style={styles.title}>My Account</Text>
                        <TouchableOpacity
                            style={styles.openButton}
                            onPress={() => setModalVisible(true)}
                        ><Image style={styles.settings} source={require("@/assets/images/settings.png")}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.authBtnBox}>


                        <TouchableOpacity
                            style={[styles.closeButton, styles.authBtn]}
                            onPress={() => goto('login')}
                        >
                            <Text style={styles.modalText}>Sing in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.closeButton, styles.authBtn]}
                            onPress={() => goto('signup')}
                        >
                            <Text style={styles.modalText}>Sign up</Text>
                        </TouchableOpacity>

                        <Link href="/login" >
                            Go to About screen
                        </Link>
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
                </View>
            </View>
        );
    }
};

export default Account;
