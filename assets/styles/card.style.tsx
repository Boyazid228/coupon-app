import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

    },
    cardBox:{
        width: "90%",
        margin: "auto",
        marginTop: 200,
        marginBottom: 0,
        height: "auto"
    },
    bg:{
        position: "absolute",
        top: 0,
        height:150,
        width: "100%",
        zIndex: 100

    },
    bgimg:{
        width: "100%",
        height : "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
    },
    logoBox:{
        backgroundColor: "#fff",
        borderRadius: 50,
        bottom: -50,
        height: 100,
        width: 100
    },
    title:{
        fontSize: 32,
        textAlign: "center"
    },
    ratingBox:{
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
    },
    rBox:{
        width: "auto",
        borderColor: "#0c6671",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius : 20,
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        margin: 10,
        marginVertical: 0
    },
    rImg:{
        width:20,
        height:20,
        marginRight: 10
    },

    cupon:{
        backgroundColor: "rgba(12,102,113,0.25)",
        borderRadius:10,
        padding: 20,
        borderWidth: 1,
        borderColor: "#0c6671",
        borderStyle: "dashed",
        width: "90%",
        margin: "auto",
        marginVertical: 7

    },
    cuponName:{
        fontSize: 18
    },
    imgBox:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10
    },
    cuponImg:{
        width: 100,
        height: 50,
        borderRadius: 10
    },
    cuponText:{
        paddingBottom: 5,
        fontSize: 16,
        fontWeight: "500"
    },
    nameBox:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bgF:{
        backgroundColor: "#fff",
        borderColor: "#0c6671",
        padding: 5,
        borderWidth: 1,
        borderRadius : 20,
        alignItems: "center",
        justifyContent: "center"
    },
    box:{
        marginTop:30
    },
    i:{
        width: "100%",
        height: "100%",
        borderRadius: '50%',
    },
    subTItlt:{
        fontSize: 14,
        textAlign: "center",
        marginTop:5
    },
    ntf:{
        fontSize: 16,
        textAlign: "center",
        marginTop:25
    },
    short_desc:{
        width: "60%",
    }

});

export default styles;