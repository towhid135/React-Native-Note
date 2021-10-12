import React,{useReducer, useState} from "react";
import {View,TextInput,Text,StyleSheet,TouchableHighlight,Modal,Alert} from 'react-native';
import Color from "../../Constants/Color";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import FontNames from '../../Constants/FontNames';
import {Wave} from 'react-native-animated-spinkit';
import validator from "validator";

const validateFields = (email) =>{
    let isValid = {};
    return isValid = {
      email: validator.isEmail(email)
    }
}

const AuthComp = props =>{
    const [text,setText] = useState({email:'',pass:''});
    const [isValid,setIsValid] = useState({
        len:false,
        number: false,
        lower: false,
        upper: false,
        special: false

    })
    const [borderColor,setBorderColor] = useState({email:'black',pass:'black'});

    //console.log('email',text.email,'pass',text.pass)

    const changeBorderColor = (fieldName) =>{
        if (fieldName==='email') setBorderColor({email:Color.lightGreen,pass: 'black'})
        else setBorderColor({email:'black', pass: Color.lightGreen})
    }


    const textHandler = (fieldName,updatedText) =>{
        //handling email and pass
        if(fieldName === 'email'){
            setText({email:updatedText,pass:text.pass})
        }
        else{
            setText({email:text.email,pass:updatedText})

            //checking validity
            if(!props.loginMode){
                //regex 
                const atLeastOneNumber = /\d/;
                const atLeastOneLower = /[a-z]/;
                const atLeastOneUpper = /[A-Z]/;
                const specialChar = /[!@#\$%\^&\*\\\(\)\[\]+-=:,''""]/;

                //updating isValid
                setIsValid({
                    ...isValid,
                    number: atLeastOneNumber.test(updatedText),
                    lower: atLeastOneLower.test(updatedText),
                    upper: atLeastOneUpper.test(updatedText),
                    special: specialChar.test(updatedText)
                })
                //for checking length
                if(updatedText.length >= 8) {
                    if(!isValid.len) setIsValid({
                        ...isValid,
                        len: true,
                    }) 
                } 
                else{
                    if(isValid.len){
                        setIsValid({
                            ...isValid,
                            len: false
                        })
                    }
                }


            }
        }
    }

    const onButtonPress = (email,pass) =>{
        if(!props.loginMode){
            const isEmailValid = validateFields(email)
            if(! isEmailValid.email) {
            console.log('inside Authcomp')
            props.setError('Please enter a valid email address.')
        }
            else if( !(isEmailValid.email & isValid.len & isValid.number & isValid.upper & isValid.lower & isValid.special)){
                props.setError('Please enter a valid Password.')
            }
            else{
                props.buttonAction(email,pass);
            }
        
    }
    //console.log('inside auth comp on button press')
    props.buttonAction(email,pass);
}


    return (
        <View style={styles.container}>
           
            <View
             style={styles.messageViewStyle}
            >
                <Text style={styles.messageTextStyle}>{props.message}</Text>
            </View>
            

            <View style={styles.emailContainer}>
                <View style={styles.emailTag}><Text style={styles.emailTagText}>Email</Text></View>
                <View style={{...styles.emailInputContainer,borderBottomColor:borderColor.email}}>
                    <Ionicons 
                    name='md-mail-outline' 
                    size={25} 
                    style={{
                        paddingTop: 5,
                        paddingRight: 5,
                    }}
                    />
                    <TextInput 
                      style = {{...styles.emailInput}}
                      placeholder="Please Enter your Email"
                      onFocus={changeBorderColor.bind(this,'email')}
                      onChangeText = {textHandler.bind(this,'email')}
                    />
                </View>
            </View>

            <View style={styles.passContainer}>
                <View style={styles.passTag}>
                    <Text style={styles.passTagText}>Password</Text>
                </View>
                <View style={{...styles.passInputContainer,borderBottomColor:borderColor.pass}}>
                    <Ionicons 
                     name= 'md-lock-closed-outline'
                     size = {25}
                     style={{paddingTop:5,paddingRight:5}}
                    />
                    <TextInput
                       style={{...styles.passInput}} 
                       secureTextEntry={true}
                       placeholder="Please Enter Your Password"
                       onFocus={changeBorderColor.bind(this,'pass')}
                       onChangeText = {textHandler.bind(this,'pass')}
                    />
                </View>
            </View>

            {!props.loginMode && 

            <View style={styles.valStyle} >
                <Text style={{...styles.valTextStyle,color: isValid.len ? 'green': 'red'}}>
                    *Password should be at least 8 characters long
                </Text>
                <Text style={{...styles.valTextStyle,color: isValid.number ? 'green': 'red'}}>
                    *Password should contain at least 1 number
                </Text>
                <Text style={{...styles.valTextStyle,color: isValid.lower ? 'green': 'red'}} >
                    *Password should contain at least 1 lower case
                </Text>
                <Text style={{...styles.valTextStyle,color: isValid.upper ? 'green': 'red'}} >
                    *Password should contain at least 1 upper case
                </Text>
                <Text style={{...styles.valTextStyle,color: isValid.special ? 'green': 'red'}} >
                    *Password should contain at least 1 special characters [!,@,#,^,*,\,(,),[,],+,-,=]
                </Text>
            </View>
            }

            <View style={styles.buttonStyle} >
                 <CustomButton
                  buttonAction = {onButtonPress.bind(this,text.email,text.pass)}
                 >
                     {props.buttonName}
                </CustomButton>
            </View>

            <View style={styles.questionView}>
                {props.loginMode && 
                 <TouchableHighlight
                  underlayColor={null}
                  activeOpacity={0.4}
                  onPress={props.navigationPage}
                 >
                  <Text style={styles.questionText}>Don't have an account ?</Text>
                </TouchableHighlight>
                }
            </View>

            {(props.isLogin || props.isRegistering) && 
              <Modal
               transparent
               visible={props.isLogin}
              >
                <View style={styles.overlayViewStyle} >
                    <Wave color='rgba(255,255,255,255)' size={60} />
                </View>
              </Modal>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        paddingTop: 80,
        paddingLeft: 15,
        paddingRight: 15,
    },
    emailContainer:{
        paddingTop: 10,
    },
    emailTag:{
        paddingBottom: 5,
    },
    emailTagText:{
        fontSize: 15,
        fontFamily: 'MontserratBold',
        color: Color.lightNaviBlue
    },
    emailInputContainer:{
        flexDirection: 'row',
        borderBottomWidth: 2,
    },
    emailInput: {
        flex: 1,
        width:'100%'
    },
    passContainer:{
        paddingTop: 10,
    },
    passTag:{
        paddingBottom: 10
    },
    passTagText:{
        fontSize: 15,
        fontFamily: 'MontserratBold',
        color: Color.lightNaviBlue
    },
    passInputContainer:{
        flexDirection: 'row',
        borderBottomWidth: 2,
    },
    passInput:{
        flex: 1,
        width: "100%"
    },
    questionView:{
        paddingTop: 30
    },
    questionText:{
        color: Color.lightNaviBlue,
        fontSize: 15,
        fontFamily: 'MontserratBold'
    },
    buttonStyle:{
        marginTop: 20,
        alignItems:'center'
    },
    messageViewStyle:{
        flexDirection: 'row'
    },
    messageTextStyle:{
        fontSize: 15,
        color: Color.red,
        fontFamily: FontNames.MontserratBoldItalic
    },
    overlayViewStyle:{
        flex: 1,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems:'center',
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
         
    },
    valStyle:{
        paddingTop: 10,
    },
    valTextStyle:{
        fontFamily: FontNames.MontserratLight,
    }

})

export default AuthComp;