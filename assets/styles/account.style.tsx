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
    menuItem: {
        marginVertical: 10,
        fontSize: 16
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: "row",

    },
    closeButton: {
        fontSize: 12,
        backgroundColor: "#0c6671",
        borderRadius:50,
        padding: 10,
        justifyContent:"center",
        alignItems: "center",
        marginHorizontal: 5
    },
    modalText: {
        textAlign: 'center',
        color: "#fff"
    },
    login:{


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
    openButton:{},
    authBtnBox:{
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: "center"

    },
    authBtn:{
        width: 150,
        height: 50,

    }


});

export default styles;