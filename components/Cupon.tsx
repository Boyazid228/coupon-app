import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import styles from "@/assets/styles/card.style";
import { useNavigation } from "@react-navigation/native";
import Stars from "@/components/Stars";
import config from "@/settings";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';  // Import PropTypes

const Cupon = ({ coupon }) => {
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();

    // Default value for coupon if not provided
    const handleImagePress = (id, name) => {
        navigation.navigate('cuponPage', { id: id, name: name });
    };

    const dynamicHtml = coupon.short_description;

    return (
        <TouchableOpacity
            onPress={() => handleImagePress(coupon.id, coupon.name)}
            accessible={true}
            accessibilityLabel={`View details for coupon ${coupon.name}`}
        >
            <View style={styles.cupon}>
                <View style={styles.nameBox}>
                    <Text style={styles.cuponName}>{coupon.name}</Text>
                    <View>
                        <Stars stars_count={coupon.rating} />
                    </View>
                </View>

                <View style={styles.imgBox}>
                    <Image
                        style={styles.cuponImg}
                        source={{ uri: config.img_link + coupon.preview }}
                        onError={() => {
                            // Handle the case where the image fails to load
                            console.warn("Image failed to load");
                        }}
                        defaultSource={require('@/assets/loader/loader.gif')} // Fallback image
                    />
                    <View style={styles.short_desc}>
                        <RenderHtml
                            contentWidth={width }

                            source={{ html: dynamicHtml }}
                        />
                        <Text>Time: {coupon.time_start}</Text>
                        <Text> - {coupon.time_finish}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// PropTypes for type-checking
Cupon.propTypes = {
    coupon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        short_description: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        time_start: PropTypes.string.isRequired,
        time_finish: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired,
    }).isRequired,
};

export default Cupon;
