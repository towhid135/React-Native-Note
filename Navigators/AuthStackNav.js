import React from "react";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import {createStackNavigator} from '@react-navigation/stack'
import MyDrawer from "./DrawerNavigator";
import StackNav from "./StackNav";


const AuthStackNav = props =>{
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen 
             name = 'Login'
             component = {LoginScreen}
            />
            <Stack.Screen 
             name = 'Register'
             component={RegisterScreen}
            />
            <Stack.Screen 
             name = 'Home'
             component = {MyDrawer}
            />
        </Stack.Navigator>
    )
}

export default AuthStackNav;