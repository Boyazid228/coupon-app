import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Favorits from "@/app/(tabs)/favorits";


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false, tabBarStyle: { backgroundColor: '#fff' },

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={"#0c6671"} />
          ),
          tabBarActiveTintColor: "#0c6671"
        }}
      />
        <Tabs.Screen
            name="vlog"
            options={{
                title: 'Vlog',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'library' : 'library-outline'} color={"#0c6671"} />
                ), tabBarActiveTintColor: "#0c6671"
            }}
        />


        <Tabs.Screen
            name="map"
            options={{
                title: 'Near me',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'map' : 'map-outline'} color={"#0c6671"} />
                ), tabBarActiveTintColor: "#0c6671"
            }}
        />


        <Tabs.Screen
            name="favorits"
            options={{
                title: 'Favorits',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={"#0c6671"} />
                ), tabBarActiveTintColor: "#0c6671"
            }}
        />




      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={"#0c6671"} />
          ), tabBarActiveTintColor: "#0c6671"
        }}
      />



    </Tabs>
  );
}
