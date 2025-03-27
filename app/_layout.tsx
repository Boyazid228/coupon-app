import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Stack, useLocalSearchParams} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import Card from "@/app/card";
import {inspect} from "util";
import Reviews from "@/app/reviews";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from "@/app/login";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }



  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <NavigationContainer independent={true}>
          <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#fff', // Цвет фона из темы
                },
                headerTintColor: '#0c6671', // Цвет текста из темы

              }}
          >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

              <Stack.Screen name="card"  options={{
                  headerShown: false,
              }} />
              <Stack.Screen name="cuponPage" options={{
                  headerShown: false,
              }}/>
              <Stack.Screen name="shops"  options={{ title: "Shops", headerBackTitle: 'back' }}/>
              <Stack.Screen name="reviews"  />
              <Stack.Screen name="vlogPage"  options={{
                  headerShown: false,
              }}/>
              <Stack.Screen name="signup"   options={{ title: "Sign Up", headerBackTitle: 'back' }} />
              <Stack.Screen name="login"  options={{ title: "Login", headerBackTitle: 'back' }}/>
              <Stack.Screen name="+not-found" />
          </Stack>
        </NavigationContainer>
    </ThemeProvider>
  );
}
