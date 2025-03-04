import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff',

    },
    cuponBox:{
        width: "90%",
        margin: "auto",
        marginTop: 20,
        marginBottom: 0,
        height: "auto"
    },
    mainImg:{
        width: "100%",
        height: 200,
    },
    title:{
        fontSize: 32,
        textAlign: "left",
        top: -10
    },
    subtitle:{
        fontSize: 22,
        textAlign: "left",
        top: -5
    },
    description:{
        fontSize: 14
    },
    rev:{
        flexDirection: "row",
        alignItems:"center",
        marginTop: 20
    },
    rImg:{
        width: 20,
        height: 20,
        marginRight: 10
    },
    link:{
        marginLeft: 10,
        textDecorationLine: "underline"
    },
    scrool:{
        flex: 1,
        top: -30
    },
    banner:{
        fontSize: 14,
        backgroundColor: "#0c6671",
        borderRadius:50,
        padding: 10,
        textAlign: "center",
        top: -50,
        margin: "auto",
        width: "90%",
        paddingVertical: 20

    },
    bannerText:{
        color: "#fff",
        textAlign: "center"
    },



});

export default styles;