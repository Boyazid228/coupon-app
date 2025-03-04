import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "@/assets/styles/login.style";
import PostApiHook from "@/hooks/PostApiHook";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: "Login",
            headerBackTitle: 'Back',
        });
    }, [navigation]);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [apiError, setApiError] = useState('');
    const { postData, loading } = PostApiHook(`/token/`);

    const validateInputs = () => {
        const isLoginValid = login.trim() !== '';
        const isPasswordValid = password.trim() !== '';

        setErrorLogin(!isLoginValid);
        setErrorPassword(!isPasswordValid);

        return isLoginValid && isPasswordValid;
    };

    const handleLogin = async () => {
        if (!validateInputs()) return;

        setApiError(''); // Reset API error before login

        try {
            const response = await postData({ username: login, password: password });

            if (response?.access) {
                // Save tokens to AsyncStorage
                try {
                    const jsonValue = JSON.stringify(response);
                    await AsyncStorage.setItem('tokens', jsonValue);
                } catch (storageError) {
                    console.error('Error saving tokens to AsyncStorage:', storageError);
                }

                // Navigate to account screen
                navigation.navigate('account', { login: true });
            } else {
                setApiError('Invalid username or password. Please try again.');
            }
        } catch (e) {
            console.error('Login error:', e);
            setApiError('An error occurred. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentBox}>
                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.sub_title}>We're so excited to see you again!</Text>

                {/* Display API error */}
                {apiError ? (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorBoxText}>{apiError}</Text>
                    </View>
                ) : null}

                {/* Username Input */}
                <View style={styles.inputBox}>
                    <Text style={styles.label}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        placeholderTextColor="gray"
                        onChangeText={setLogin}
                        value={login}
                    />
                    {errorLogin && (
                        <Text style={styles.error}>The field cannot be blank.</Text>
                    )}
                </View>

                {/* Password Input */}
                <View style={styles.inputBox}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="gray"
                        secureTextEntry // Masks the password input
                        onChangeText={setPassword}
                        value={password}
                    />
                    {errorPassword && (
                        <Text style={styles.error}>The field cannot be blank.</Text>
                    )}
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleLogin}
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

export default Login;
