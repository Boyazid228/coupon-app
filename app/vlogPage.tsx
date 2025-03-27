import React, { useEffect, useState } from 'react';
import { View, Text, useWindowDimensions, ScrollView, ActivityIndicator } from "react-native";
import style from "@/assets/styles/vlogPage.style";
import RenderHtml from "react-native-render-html";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VlogPage = () => {
    const [item, setItem] = useState(null); // Начальное состояние null для правильной проверки

    useEffect(() => {
        const loadItem = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("vlog");
                if (jsonValue) {
                    setItem(JSON.parse(jsonValue)); // Парсим JSON перед установкой состояния
                }
            } catch (error) {
                console.error("Ошибка при загрузке:", error);
            }
        };

        loadItem();
    }, []);

    const { width } = useWindowDimensions();

    if (!item) {
        return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size="large" color="#ffffff" />;
    }

    const date = item.date ? new Date(item.date) : null;
    const formattedDate = date
        ? date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        })
        : "Дата неизвестна";

    return (
        <View style={style.container}>
            <ScrollView style={style.vlogBox}>
                <RenderHtml contentWidth={width} source={{ html: item.description || "" }} />
                <Text>{"\n"}</Text>
                <Text>
                    Author {item?.user?.username || "Неизвестно"} / {formattedDate}
                </Text>
                <Text>{"\n".repeat(4)}</Text>
            </ScrollView>
        </View>
    );
};

export default VlogPage;
