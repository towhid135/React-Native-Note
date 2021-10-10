import React from "react";
import {StyleSheet} from 'react-native';
import AuthComp from "../Component/UI/AuthComp";
import app from "../fireBase/config";

const LoginScreen = props =>{
    const sendEmailAndPass = (email,pass) =>{
        const auth = app.auth();
        auth.signInWithEmailAndPassword(email,pass)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);

            if(user) {
                props.navigation.navigate({name:'Home',params:{userName:user.displayName}});
            }
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error message', errorMessage);
          });


    }
    return (
        <AuthComp 
         loginMode = {true}
         navigationPage={()=> props.navigation.navigate('Register')}
         buttonName = 'Login'
         buttonAction = {sendEmailAndPass}
        />
    );
}

const styles = StyleSheet.create({

})

export default LoginScreen;