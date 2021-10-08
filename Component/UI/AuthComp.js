import React,{useReducer, useState} from "react";
import {View,TextInput,Text,StyleSheet,TouchableHighlight} from 'react-native';
import Color from "../../Constants/Color";
import { Ionicons } from "@expo/vector-icons";


const AuthComp = props =>{
    const [borderColor,setBorderColor] = useState({email:'black',pass:'black'});
    const changeBorderColor = (fieldName) =>{
        if (fieldName==='email') setBorderColor({email:Color.lightGreen,pass: 'black'})
        else setBorderColor({email:'black', pass: Color.lightGreen})
    }
    return (
        <View style={styles.container}>
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
                    />
                </View>
            </View>

            <View style={styles.questionView}>
                {props.loginMode && 
                 <TouchableHighlight
                  underlayColor={null}
                  activeOpacity={0.4}
                  onPress={()=>{}}
                 >
                  <Text style={styles.questionText}>Dont have an account ?</Text>
                </TouchableHighlight>
                }
            </View>

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

})

export default AuthComp;