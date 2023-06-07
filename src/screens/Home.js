import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from './PostsScreen'
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen"

import { SimpleLineIcons, Octicons, MaterialIcons } from '@expo/vector-icons'; 
import { Button } from "react-native";
import Logout from "../companents/Logout";
import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";

const Tabs  = createBottomTabNavigator();

const Home = () =>{
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          "keyboardDidShow",
          () => {
            setIsKeyboardOpen(true);
          }
        );
    
        const keyboardDidHideListener = Keyboard.addListener(
          "keyboardDidHide",
          () => {
            setIsKeyboardOpen(false);
          }
        );
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);    

    return(
        <Tabs.Navigator
            initialRouteName="PostsScreen"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ size, color }) => {
                    switch(route.name){
                        case "PostsScreen":
                            return <SimpleLineIcons name="grid" size={size} color={color} />
                        case "CreatePostsScreen":
                            return <MaterialIcons name="add" size={size} color={color} />
                        case "ProfileScreen":
                            return <Octicons name="person" size={size} color={color}/>
                    }
                },
                tabBarActiveTintColor: "#e4dfda",
                    tabBarActiveBackgroundColor: "#FF6C00",
                    tabBarShowLabel: false,
                    tabBarItemStyle: {
                        borderRadius: 30,
                        marginVertical: 5,
                        marginHorizontal: 25,
                    },
                tabBarStyle: { height: 60 },
                tabBarVisible: !isKeyboardOpen,
            })}
        >
            <Tabs.Screen
                name='PostsScreen' 
                component={PostsScreen}
                options={{ headerShown: false }} 
            />
            <Tabs.Screen 
                name='CreatePostsScreen' 
                component={CreatePostsScreen}
                options={{ title: "Публікації" }}
            />
            <Tabs.Screen 
                name='ProfileScreen' 
                component={ProfileScreen}
                options={{ title: "Публікації" }}
            />
        </Tabs.Navigator>
    );
}
export default Home;