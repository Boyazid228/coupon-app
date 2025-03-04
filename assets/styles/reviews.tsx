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
        marginTop: 0,
        marginBottom: 0,
        height: "auto"
    },
    review_box:{
        margin: 10,
        borderColor: '#adadad',
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        marginHorizontal: 5
    },
    review_title_box:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20
    },
    review_title:{
        fontSize: 24,

    },
    description:{
        marginBottom: 20,
        flexDirection: "row"
    },
    starts:{
    },
    title_box:{
        width: 150
    }





});

export default styles;