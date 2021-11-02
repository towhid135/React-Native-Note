import React,{useState} from 'react';
import {View,Text,StyleSheet,TextInput} from 'react-native';
import FontNames from '../Constants/FontNames';
import Color from '../Constants/Color';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../Component/UI/CustomButton';
import app from '../fireBase/config';

const ForgotPassScreen = props =>{
    const [values,setValues] = useState({initialText:'',isResetPressed: false,activeBorderColor: 'black'});
    const textHandler = changedText =>{
        setValues({...values,initialText: changedText})
    }

    const onResetButtonPressed = () =>{
        const auth = app.auth();
        auth.sendPasswordResetEmail(values.initialText)
        .then(() => {
          console.log('forgot mail sent');
          setValues({...values,isResetPressed:true})
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
    return (
        <View style={styles.container}>

            {!values.isResetPressed && 
            <View >
            <View style={styles.userNameTagView}><Text style={styles.userNameTextStyle}>Email</Text></View>

            <View style={{...styles.userNameInputView,borderBottomColor: values.activeBorderColor}}>
            <Ionicons 
                name= 'md-mail-outline' 
                size={25} 
                style={{
                    paddingTop: 5,
                    paddingRight: 5,
                }}
                />
                <TextInput 
                style={styles.userNameInputStyle}
                value = {values.initialText}
                placeholder="Please Enter The Email"
                onChangeText = {textHandler}
                />
            </View>
            <View style={styles.buttonStyle} >
                 <CustomButton
                  buttonAction = {() => onResetButtonPressed()}
                 >
                     Reset
                </CustomButton>
            </View>
        </View>
        }

        {values.isResetPressed &&
        <View style = {styles.textView}>
            <Text style={styles.textStyle}>
                A password reset email has been sent to your account. Please reset your password.
            </Text>
        </View>
       }

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10
    },
    textStyle:{
        fontFamily: FontNames.MontserratBoldItalic,
        fontSize: 15,
    },
    userNameTagView:{paddingBottom: 5,},
    userNameTextStyle:{
        fontSize: 15,
        fontFamily: 'MontserratBold',
        color: Color.lightNaviBlue
    },
    userNameInputView:{
        flexDirection: 'row',
        borderBottomWidth: 2,
    },
    userNameInputStyle:{
        flex: 1,
        width: "100%"
    },
    buttonStyle:{
        marginTop: 20,
        alignItems:'center'
    },
    textView:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ForgotPassScreen;