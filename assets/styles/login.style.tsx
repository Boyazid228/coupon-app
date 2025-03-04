import {StyleSheet} from "react-native";
import {black} from "colorette";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#fff',

    },
    contentBox:{
        width: "90%",
        margin: "auto",
        marginTop: 0,
        marginBottom: 0,
        height: "auto"
    },
    title:{
        textAlign: "center",
        fontSize: 26,
        marginBottom: 10
    },
    sub_title:{
        textAlign: "center",
        fontSize: 18,
        marginBottom: 20
    },
    inputBox:{
        marginTop: 10
    },
    label:{
        fontSize: 16,
        marginBottom: 10
    },
    input:{
        width: "100%",
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 50,
    },
    error:{
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    hide:{
        opacity: 0

    },
    show:{
        opacity: 1

    },
    searchButton: {
        fontSize: 12,
        backgroundColor: "#0c6671",
        borderRadius:10,
        padding: 10,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        marginTop: 20

    },
    searchButtonText:{

        color: "#fff",
        fontSize: 18
    },
    errorBox:{
        backgroundColor: 'rgba(250,63,63,0.31)',
        width: '100%',
        padding: 10,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius:10,
        marginTop: 20,
        marginBottom: 20,
        minHeight: 50,
        justifyContent: "center",
        alignItems: "center"


    },
    errorBoxText:{

    }




});

export default styles;