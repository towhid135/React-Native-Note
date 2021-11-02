import React,{useReducer, useState} from "react";
import {View,TextInput,Text,StyleSheet,TouchableHighlight,Modal,Alert} from 'react-native';
import Color from "../../Constants/Color";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import FontNames from '../../Constants/FontNames';
import {Wave} from 'react-native-animated-spinkit';
import validator from "validator";


//At least one special char identifier
const specialChar = text =>{
    let isSpecial = false;
    for (ch in text){
        let char = text[ch].charCodeAt(0);
        if( !( (char<=57 && char>=48) ||
        (char>=97 && char<=122) || (char>=65 && char<=90) ) ){
           isSpecial = true;
       break;
        }
    }
  return isSpecial;
  
  }
  
//Email validation
const validateFields = (email) =>{
    let isValid = {};
    return isValid = {
      email: validator.isEmail(email)
    }
}

const AuthComp = props =>{
    const [text,setText] = useState({userName:'',email:'',pass:''});
    const [isValid,setIsValid] = useState({
        len:false,
        number: false,
        lower: false,
        upper: false,
        special: false

    })
    const [borderColor,setBorderColor] = useState({userName: 'black',email:'black',pass:'black'});

    //console.log('email',text.email,'pass',text.pass)

    const changeBorderColor = (fieldName) =>{
        if (fieldName==='email') setBorderColor({userName:'black',email:Color.lightGreen,pass: 'black'})
        else if(fieldName==='pass') setBorderColor({userName:'black',email:'black', pass: Color.lightGreen})
        else setBorderColor({userName:Color.lightGreen,email:'black', pass:'black'})
    }


    const textHandler = (fieldName,updatedText) =>{
        //handling email and pass
        if(fieldName === 'email'){
            setText({userName:text.userName,email:updatedText,pass:text.pass})
        }
        else if (fieldName==='pass'){
            setText({userName:text.userName,email:text.email,pass:updatedText})

            //checking validity
            if(!props.loginMode){
                //regex 
                const atLeastOneNumber = /\d/;
                const atLeastOneLower = /[a-z]/;
                const atLeastOneUpper = /[A-Z]/;

                //updating isValid
                setIsValid({
                    ...isValid,
                    number: atLeastOneNumber.test(updatedText),
                    lower: atLeastOneLower.test(updatedText),
                    upper: atLeastOneUpper.test(updatedText),
                    special: specialChar(updatedText)
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
        else{
            setText({userName:updatedText,email:text.email,pass:text.pass})
        }
    }

    const onButtonPress = (authObj) =>{
        
        if(!props.loginMode){

            const isEmailValid = validateFields(authObj.email)
            if(!authObj.userName) props.setError('Please enter a user name.');
            else if(! isEmailValid.email) {
            //console.log('inside Authcomp')
            props.setError('Please enter a valid email address.');
            }
            else if( !(isEmailValid.email & isValid.len & isValid.number & isValid.upper & isValid.lower & isValid.special)){
                props.setError('Please enter a valid Password.');
            }
            else{
                props.buttonAction(authObj);
            }
        
    }
    //console.log('inside auth comp on button press')
    else {
        props.buttonAction(authObj.email,authObj.pass);
    }
}


    return (
        <View style={styles.container}>
           
            <View
             style={styles.messageViewStyle}
            >
                <Text style={styles.messageTextStyle}>{props.message}</Text>
            </View>

            {!props.loginMode &&
            <View>
                <View style={styles.userNameTagView}><Text style={styles.userNameTextStyle}>User Name</Text></View>

                <View style={{...styles.userNameInputView,borderBottomColor:borderColor.userName}}>
                <Ionicons 
                    name= 'md-person-outline' 
                    size={25} 
                    style={{
                        paddingTop: 5,
                        paddingRight: 5,
                    }}
                    />
                    <TextInput 
                      style={styles.userNameInputStyle}
                      placeholder="Please Enter User Name"
                      onFocus={changeBorderColor.bind(this,'userName')}
                      onChangeText = {textHandler.bind(this,'userName')}
                    />
                </View>
            </View>
            }
            

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
                  buttonAction = {props.loginMode ? onButtonPress.bind(this,{email:text.email,pass:text.pass}) : onButtonPress.bind(this,{userName:text.userName,email:text.email,pass:text.pass})}
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

            <View style={styles.questionView}>
                {props.loginMode && 
                 <TouchableHighlight
                  underlayColor={null}
                  activeOpacity={0.4}
                  onPress={props.forgotPage}
                 >
                  <Text style={styles.questionText}>Forgot Password ?</Text>
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
    }

})

export default AuthComp;