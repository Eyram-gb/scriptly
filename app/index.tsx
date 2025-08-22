import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LiveScreen from '../screens/LiveScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

const darkTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#000',
        card: '#181818',
        text: '#fff',
        border: '#222',
        primary: '#4CAF50',
        notification: '#FFD700',
    },
};

export default function MainApp() {
    return (
        <>
            <StatusBar style="light" />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: { backgroundColor: '#181818', borderTopColor: '#222' },
                    tabBarActiveTintColor: '#fff',
                    tabBarInactiveTintColor: '#B0B0B0',
                    tabBarIcon: ({ color, size }) => {
                        let iconName: keyof typeof Ionicons.glyphMap = 'home';
                        if (route.name === 'Live') iconName = 'flash';
                        else if (route.name === 'History') iconName = 'time';
                        else if (route.name === 'Search') iconName = 'search';
                        else if (route.name === 'Settings') iconName = 'settings';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Live" component={LiveScreen} />
                <Tab.Screen name="History" component={HistoryScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </>
    );
}