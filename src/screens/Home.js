import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from './PostsScreen'
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen"

import { SimpleLineIcons, Octicons, MaterialIcons } from '@expo/vector-icons'; 
import { Button } from "react-native";
import Logout from "../companents/Logout";

const Tabs  = createBottomTabNavigator();

const Home = () =>{
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
                tabBarActiveTintColor: "#FFFFFF",
                tabBarActiveBackgroundColor: "#FF6C00",
                tabBarInactiveTintColor: "#212121CC",
                tabBarShowLabel: false,
                headerTitleAlign: "center",
                tabBarItemStyle: {
                    width:70,
                    height: 40,
                    borderRadius: 20,
                },
                tabBarStyle:[{
                    display: "flex",    
                    paddingTop: 22,
                    paddingBottom: 22,
                    paddingLeft: 40,
                    paddingRight: 44, 
                    height: 83,
                }],
              })}
        >
            <Tabs.Screen
                name='PostsScreen' 
                component={PostsScreen}
                options={{
                    title: "Публікації",
                    headerRight: ()=>{
                        return <Logout />;
                    },
                }}
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