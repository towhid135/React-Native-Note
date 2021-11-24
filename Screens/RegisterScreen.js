import React, { useState } from "react";
import {StyleSheet} from 'react-native';
import AuthComp from "../Component/UI/AuthComp";
import app from "../fireBase/config";
import {StackActions} from '@react-navigation/native';

const RegisterScreen = props =>{
    const [errorMessage,setErrorMessage] = useState('');
    const [isRegistering,setIsRegistering] = useState(false);

    const getEmailPass = (authObj) =>{

      const auth = app.auth();
      setIsRegistering(true);

      auth.createUserWithEmailAndPassword(authObj.email,authObj.pass)
      .then((userCredential) => {
        //signed in
        // Verification mail
        userCredential.user.sendEmailVerification();


        const user = userCredential.user;
        user.updateProfile({ 

            displayName: authObj.userName,

          })

          props.navigation.dispatch(
            StackActions.replace('Login')
          )
        setErrorMessage('');
        setIsRegistering(false);

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