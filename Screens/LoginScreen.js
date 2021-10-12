import React,{useState} from "react";
import {StyleSheet} from 'react-native';
import AuthComp from "../Component/UI/AuthComp";
import app from "../fireBase/config";
import {StackActions} from '@react-navigation/native'

const LoginScreen = props =>{

    const [message,setMessage] = useState({message:'',isLogin:false});
    const sendEmailAndPass = (email,pass) =>{
       console.log('inside sendEmailand pass')
        const auth = app.auth();
        setMessage({message:'',isLogin:true})
        auth.signInWithEmailAndPassword(email,pass)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            //console.log(user);

            if(user) {
                setMessage({message:'',isLogin:false})
                props.navigation.dispatch(
                  StackActions.replace('Home',{userName:user.displayName})
                )
            }
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setMessage({message:errorMessage,isLogin: false});
            console.log('error message', errorMessage);
          });


    }
    return (
        <AuthComp 
         message = {message.message}
         isLogin = {message.isLogin}
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