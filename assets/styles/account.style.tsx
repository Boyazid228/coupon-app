import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff',

    },
    box:{
        width: "90%",
        margin: "auto",
        marginTop: 0,
        marginBottom: 0,
        height: "auto"
    },
    header:{

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"

    },
    title:{
        textAlign: "center"

    },
    settings:{
        width: 30,
        height: 30
    },
    nameBox:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop:30
    },
    name:{
        fontSize: 30
    },
    arrow:{
        width: 20,
        height: 20
    },
    flex:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    text:{
        textAlign: "center",
        marginTop: 5
    },
    myBox:{
        marginTop: 30,
        justifyContent: "space-around"
    },
    img:{
        width:30,
        height:30,
        margin: "auto",

    },
    myBoxes:{
        width: 100
    },
    subTItle:{
        fontSize: 18,
        marginTop: 50
    },
    menu:{
        marginTop:20
    },
    menuItem:{
        marginVertical: 10,
        fontSize: 16
    }



});

export default styles;