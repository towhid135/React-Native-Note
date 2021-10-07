import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import AddScreen from "../Screens/AddScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import EditSettingsScreen from "../Screens/EditSettingsScreen";
import FontTestScreen from "../Screens/FontTestScreen";

const StackNav = props => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title:'Task Lists'}}
             />
             <Stack.Screen 
              name = "Add"
              component={AddScreen}
             />
            <Stack.Screen 
             name='settings'
             component={SettingsScreen}
             options={{title:'Task Settings'}}
            />
            <Stack.Screen 
             name = 'editSettings'
             component = {EditSettingsScreen}
             options = {{title: 'Task Settings'}}
            />
        </Stack.Navigator>
    );
}

export default StackNav;