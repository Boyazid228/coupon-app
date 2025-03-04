import React, { useEffect, useState } from 'react';
import PostApiHook from "@/hooks/PostApiHook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthTokenRefresh from "@/hooks/useAuthTokenRefresh";

const UseTokenValidation = (tokenCheck) => {
    const [jwt, setJwt] = useState(false); // Assume `null` initially; true/false after validation
    const [status, setStatus] = useState(""); // Store the token (e.g., from localStorage or props)
    const { postData, loading, error, data } = PostApiHook(`/token/verify/`);


    useEffect( ()=> {
        (async () => {
            const jsonValue = await AsyncStorage.getItem('tokens');

            if (jsonValue) {
                const  token = JSON.parse(jsonValue);
                const response = await postData({token: token.access});
                console.info(response)
                if(response.code == "token_not_valid"){
                    setStatus('refresh')
                    setJwt(false)

                }else{

                    setStatus('success')
                    setJwt(true)
                }

            }else {
                setJwt(false)
                setStatus('token_not_found')
            }

        })();
    }, [tokenCheck])


    return { jwt, status };
};

export default UseTokenValidation;
