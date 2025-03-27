import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "@/assets/styles/login.style";
import PostApiHook from "@/hooks/PostApiHook";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = () => {
    const navigation = useNavigation();

    // useEffect(() => {
    //     navigation.setOptions({
    //         title: "Sign Up",
    //         headerBackTitle: 'Back',
    //     });
    // }, [navigation]);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorLoginText, setErrorLoginText] = useState('The field cannot be blank.');
    const [errorPassword, setErrorPassword] = useState(false);
    const { postData, loading, error, data } = PostApiHook(`/signup/`);

    const validateInput = () => {
        const isLoginValid = login.trim() !== '';
        const isPasswordValid = password.trim() !== '';

        setErrorLogin(!isLoginValid);
        setErrorPassword(!isPasswordValid);

        return isLoginValid && isPasswordValid;
    };

    const handleSignup = async () => {
        if (!validateInput()) return;

        try {
            const response = await postData({
                username: login,
                password: password,
            });

            if (response && response.access) {
                // Save tokens to AsyncStorage
                try {
                    const jsonValue = JSON.stringify({ 'access': response.access, 'refresh': response.refresh});
                    console.log(jsonValue)
                    await AsyncStorage.setItem('tokens', jsonValue);
                } catch (storageError) {
                    console.error('Error saving to AsyncStorage:', storageError);
                }

                navigation.navigate('account', { login: true });
            } else {
                if(response){
                    if(response.username){
                        setErrorLogin(true)
                        setErrorLoginText(response.data.username)

                    }

                }

                console.log(response)
                console.error('Sign up failed:', error);
            }
        } catch (signupError) {
            console.error('Sign up request failed:', signupError);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentBox}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.sub_title}>We're so excited to see you!</Text>

                {error && (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorBoxText}>{error}</Text>
                    </View>
                )}

                <View style={styles.inputBox}>
                    <Text style={styles.label}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your login"
                        placeholderTextColor="gray"
                        onChangeText={setLogin}
                        value={login}
                    />
                    {!errorLogin || (
                        <Text style={styles.error}>{errorLoginText}</Text>
                    )}
                </View>

                <View style={styles.inputBox}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="gray"
                        secureTextEntry // Makes the input secure for passwords
                        onChangeText={setPassword}
                        value={password}
                    />
                    {!errorPassword || (
                        <Text style={styles.error}>The field cannot be blank.</Text>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSignup}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        <Text style={styles.searchButtonText}>Submit</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Signup;
