import React from "react";
import {View,TextInput,Text,StyleSheet} from 'react-native';
import AuthComp from "../Component/UI/AuthComp";

const LoginScreen = props =>{
    return (
        <AuthComp 
         loginMode = {true}
        />
    );
}

const styles = StyleSheet.create({

})

export default LoginScreen;