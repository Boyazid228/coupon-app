import React, { useState } from "react";
import PostApiHook from "@/hooks/PostApiHook";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UseAuthTokenRefresh = () => {
    const [status, setStatus] = useState(""); // Статус обновления токена
    const { postData, loading, error } = PostApiHook(`/token/refresh/`);

    const refresh = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("tokens");
            if (!jsonValue) {
                console.log("tyt")
                console.error("Tokens not found in AsyncStorage");
                setStatus("refresh failed");
                return null;
            }

            const tokens = JSON.parse(jsonValue);

            // Отправляем запрос на обновление токена
            const response = await postData({ refresh: tokens.refresh });
            if (response?.code === "token_not_valid") {
                console.error("Refresh token is invalid");
                setStatus("refresh failed");
                return null;
            }

            // Сохраняем новый токен и возвращаем его
            const updatedTokens = { ...tokens, access: response.access };
            await AsyncStorage.setItem("tokens", JSON.stringify(updatedTokens));
            setStatus("success");
            console.log("Access token successfully refreshed:", response.access);
            return response.access;
        } catch (err) {
            console.error("Error refreshing token:", err);
            setStatus("refresh failed");
            return null;
        }
    };

    return { refresh, status, error };
};

export default UseAuthTokenRefresh;
