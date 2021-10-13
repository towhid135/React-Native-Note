import React, { useState } from "react";
import {View,TextInput,StyleSheet,KeyboardAvoidingView} from 'react-native';
import AuthComp from "../Component/UI/AuthComp";
import app from "../fireBase/config";
import {StackActions} from '@react-navigation/native';

const RegisterScreen = props =>{
    const [errorMessage,setErrorMessage] = useState('');
    const [isRegistering,setIsRegistering] = useState(false);
    const getEmailPass = (email,pass) =>{

      const auth = app.auth();
      setIsRegistering(true);
      //console.log('isRegistering', isRegistering)
      auth.createUserWithEmailAndPassword(email,pass)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        user.updateProfile({ 

            displayName: "Towhid",

          })

          props.navigation.dispatch(
            StackActions.replace('Login')
          )
        setErrorMessage('');
        setIsRegistering(false);

        //console.log('user',user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsRegistering(false);
        // ..
      });
    
     

    }

    return (
            <AuthComp
                isRegistering={isRegistering}
                message={isRegistering ? '' : errorMessage}
                loginMode = {false}
                buttonName = 'Register'
                buttonAction = {getEmailPass}
                setError = {setErrorMessage}
            />    
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
    },
    authCompStyle:{
        flex:1,
    },
    customButtonStyle:{
        
        alignItems: 'center',
       
    },
})

export default RegisterScreen;