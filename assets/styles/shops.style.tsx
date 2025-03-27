import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff',

    },
    shopsBox:{
        width: "90%",
        margin: "auto",
        marginBottom: 0,
        height: "auto"
    },
    img:{
        width: 130,
        height: 100,
        borderRadius: 10
    },
    flex:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textBox:{
        width: "60%",
        textAlign: "center",
        alignItems: "center"
    },
    name:{
        fontSize: 20,
        marginBottom: 5
    },
    short:{
        marginTop:5,
        textAlign: "center",
        width: "95%"
    },
    shop:{
        borderRadius:10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#0c6671",
        borderStyle: "dashed",
        marginVertical: 5
    },
    title:{
        fontSize: 32,
        padding: 15
    },
    flstList:{
        width: "90%",
        margin: "auto",
        marginBottom: 0,
        height: "auto",
        marginTop: 0
    }


});

export default styles;