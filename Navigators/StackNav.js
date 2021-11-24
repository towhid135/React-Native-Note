import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddScreen from "../Screens/AddScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import EditSettingsScreen from "../Screens/EditSettingsScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import MyDrawer from "./DrawerNavigator";
import ForgotPassScreen from "../Screens/ForgotPassScreen";
import FontTestScreen from "../Screens/FontTestScreen"

const StackNav = props => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName="notification" >
            <Stack.Screen
             name = 'notification'
             component = {FontTestScreen}
            />
            <Stack.Screen 
             name = 'Login'
             component = {LoginScreen}
            />
            <Stack.Screen 
             name = 'Register'
             component={RegisterScreen}
            />
            <Stack.Screen
             name = 'Forgot'
             component = {ForgotPassScreen}
            />
            <Stack.Screen 
             name = "Home"
             component = {MyDrawer}
             options = {{headerShown: false}}
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