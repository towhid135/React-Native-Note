import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddScreen from "../Screens/AddScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import EditSettingsScreen from "../Screens/EditSettingsScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import MyDrawer from "./DrawerNavigator";
import ForgotPassScreen from "../Screens/ForgotPassScreen";
import FontNames from "../Constants/FontNames";

const StackNav = props => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName="notification" >
            <Stack.Screen 
             name = 'Login'
             component = {LoginScreen}
             options={{headerTitleStyle:{
                 fontFamily: FontNames.MontserratBold
             }}}
            />
            <Stack.Screen 
             name = 'Register'
             component={RegisterScreen}
             options={{headerTitleStyle:{
                fontFamily: FontNames.MontserratBold
            }}}
            />
            <Stack.Screen
             name = 'Forgot'
             component = {ForgotPassScreen}
             options={{headerTitleStyle:{
                fontFamily: FontNames.MontserratBold
            }}}
            />
            <Stack.Screen 
             name = "Home"
             component = {MyDrawer}
             options = {{headerShown: false}}
            />
             <Stack.Screen 
              name = "Add"
              component={AddScreen}
              options={{
                  title: 'Add Note',
                  headerTitleStyle:{
                  fontFamily: FontNames.MontserratBold
              }}}
             />
            <Stack.Screen 
             name='settings'
             component={SettingsScreen}
             options={{
                title: 'Note Settings',
                headerTitleStyle:{
                fontFamily: FontNames.MontserratBold
            }}}
            />
            <Stack.Screen 
             name = 'editSettings'
             component = {EditSettingsScreen}
             options={{
                title: 'Edit Settings',
                headerTitleStyle:{
                fontFamily: FontNames.MontserratBold
            }}}
            />
        </Stack.Navigator>
    );
}


export default StackNav;