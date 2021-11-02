import React from "react";
import {StackActions} from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} 
from '@react-navigation/drawer';
import app from "../fireBase/config";
import StackNav from "./StackNav";
import HomeScreen from "../Screens/HomeScreen";

const onLogoutPress = props =>{
    const auth = app.auth();
    auth.signOut().then(() => {
        console.log('successful logout');
        props.dispatch(
            StackActions.replace('Login')
        )
      }).catch((error) => {
        console.log(error);
      });
    
}

const LoginContent = props =>{
    //console.log('props of login content', props);
    return (
    <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem 
         label = "Logout"
         onPress={onLogoutPress.bind(this,props.navigation)}
        />
    </DrawerContentScrollView>
    )
}


const MyDrawer = props =>{
    const Drawer = createDrawerNavigator()
    return (
        <Drawer.Navigator 
        screenOptions = {{headerShown: true}}
        drawerContent = {props => <LoginContent {...props} /> }
        >
            <Drawer.Screen name = "Home" component={HomeScreen} />
            
        </Drawer.Navigator>
    )
}

export default MyDrawer;
