import React,{useState} from "react";
import {StyleSheet} from 'react-native';
import AuthComp from "../Component/UI/AuthComp";
import app from "../fireBase/config";
import {StackActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import { LoginAction } from "../Store/Action/AuthAction";

const LoginScreen = props =>{
   const dispatch = useDispatch();

    const [message,setMessage] = useState({message:'',isLogin:false});

    const sendEmailAndPass = (email,pass) =>{
    
        const auth = app.auth();
        setMessage({message:'',isLogin:true})
        auth.signInWithEmailAndPassword(email,pass)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            if(user.emailVerified) {
                setMessage({message:'',isLogin:false})
               
                dispatch(LoginAction({
                  Name: user.displayName,
                  Id: user.uid
                }))
                props.navigation.dispatch(
                  StackActions.replace('Home',{userName:user.displayName})
                )
            }
            else{
              setMessage({message:'Please verify your email.',isLogin:false})
            }
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setMessage({message:errorMessage,isLogin: false});
           
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
         forgotPage = {() => props.navigation.navigate('Forgot')}
        />
    );
}

const styles = StyleSheet.create({

})

export default LoginScreen;