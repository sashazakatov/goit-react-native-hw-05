import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreen from '../screens/DefaultScreen'
import MapScreen from './MapScreen'
import CommentsScreen from "../screens/CommentsScreen";
import { Button } from "react-native";
import Logout from "../companents/Logout";

const PostsScreen = () => {

    const { Navigator, Screen } = createStackNavigator();

    return (
        <Navigator initialRouteName={"Default"}>
            <Screen
                title='Publications'
                name="DefaultScreen"
                component={DefaultScreen}
                options={{
                    headerRight: Logout,
                    headerLeft: null,
                    title: 'Публікації',
                    headerTitleAlign: 'center'
                }}
            />
            <Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    title: 'Location',
                    headerTitleAlign: 'center'
                }}
            />
            <Screen
                name="CommentsScreen"
                component={CommentsScreen}
                options={{
                    title: 'Comments',
                    headerTitleAlign: 'center'
                }}
            />
        </Navigator>
    );
}
export default PostsScreen;