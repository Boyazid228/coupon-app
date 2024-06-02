import React from 'react';
import {Image, Text, View} from "react-native";
import styles from "@/assets/styles/account.style";

const Account = () => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.header}>
                    <View style={styles.settings}></View>
                    <Text style={styles.title}>My Account</Text>
                    <Image style={styles.settings} source={require("@/assets/images/settings.png")}/>
                </View>
                <View style={styles.nameBox}>
                    <Text style={styles.name}>Name</Text>
                    <Image style={styles.arrow}  source={require("@/assets/images/right-arrow.png")}/>
                </View>

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
            </View>
        </View>
    );
};

export default Account;