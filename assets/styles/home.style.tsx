import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff',

    },
    searchBox: {
        width: '90%',
        position: 'relative',
        margin: "auto",
        marginTop:0,
        marginBottom: 0,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 50,
        paddingLeft: 20,
        paddingRight: 50,

    },
    searchButtonContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    },
    searchButton: {
        fontSize: 12,
        backgroundColor: "#0c6671",
        borderRadius:50,
        padding: 10

    },
    searchButtonText:{

        color: "#fff"
    },
    title:{
        paddingTop: 25,
        fontSize: 32,
        textAlign: "center",

    },
    image:{
        width: 50,
        height: 50,
        resizeMode: 'cover',
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 10

    },
    menu:{

        width: "100%",
        flexWrap: "wrap",
        flexDirection: "row",




    },
    box:{
        width: "98%",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        marginVertical: 15,


    },
    subTitle:{
        fontSize: 20,
        width: "90%",
        margin: "auto",
        marginTop: 20,
        marginBottom: 0,


    },
    backgroundImage:{
        flex: 1,
        resizeMode: 'cover',
        padding: 10
    },
    bannerBox:{


    },
    score:{
        width: 120,
    },
    stars:{
        width: 20,
        height:20,
        flexDirection: "row"
    },
    star:{
        width: "100%",
        height: "100%",
        margin:2
    },
    bannerText:{
        padding: 3
    },
    text:{

    },
    boxBanner: {
        width: "90%",
        height: "auto",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        marginTop: 20,
        marginBottom: 0,
    },
    banner:{
        width: 200,
        height: 200,
        overflow: "hidden",
        borderRadius: 20,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        margin: 5
    },
    footer:{
        width: "90%",
        fontSize: 12,
        margin: "auto",
        marginTop: 20,
        marginBottom: 0,
    },
    imagename:{
        textAlign: "center"
    },
    ibpa:{
        marginVertical: 5
    }
});

export default styles;