import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff',

    },
    vlogBox:{
        width: "90%",
        margin: "auto",
        marginTop: 0,
        marginBottom: 0,
        height: "auto"
    },
    vlogScreen: {

        minHeight: 200,
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#008080',
        marginBottom: 50,
        width: "49%",
        borderRadius: 10,
        backgroundColor: "rgba(0,128,128,0.4)",
        paddingBottom: 50


    },
    vlog: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    },
    vlogText: {
        marginTop:5,
        borderRadius: 5,
    },
    text: {
        fontSize: 12,

    },
    con: {
        flex: 1,
        marginTop: 20,
    },
    img:{
        borderRadius: 10
    }

});

export default styles;