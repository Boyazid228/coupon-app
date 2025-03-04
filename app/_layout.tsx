import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import Card from "@/app/card";
import {inspect} from "util";
import Reviews from "@/app/reviews";

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
      <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: 'transparent', // Цвет фона из темы
            },
            headerTintColor: '#0c6671', // Цвет текста из темы
          }}
      >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="card"  />
          <Stack.Screen name="cuponPage"  />
          <Stack.Screen name="shops"  />
          <Stack.Screen name="reviews"  />
          <Stack.Screen name="vlogPage"  />
          <Stack.Screen name="auth/signup"  />
          <Stack.Screen name="auth/login"  />
          <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
