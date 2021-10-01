import React,{useState,useReducer} from "react";
import {
    View,
    StyleSheet,
    } from 'react-native';
import Color from "../Constants/Color";
import ColorCircle from "../Component/UI/ColorCircle";

//action type
const lightGreen = 'lightGreen';
const lightNaviBlue = 'lightNaviBlue';
const compositeColor1 = 'compositeColor1';
const daySkyBlue = 'daySkyBlue';
const UPDATE = 'UPDATE';

const formReducer = (state,action) =>{
    switch(action.type){
        case UPDATE:
            return {
                ...state,
                pageColor: action.selectedColor
            }
        default:
            return state;
    }
}

const SettingsScreen = props =>{
   const initialState = {
      pageColor: {
        [Color.lightGreen]: 0,
        [Color.lightNaviBlue]: 0,
        [Color.compositeColor1]: 0,
        [Color.daySkyBlue]: 0,
      }
   }

   const [currentState,DISPATCH] = useReducer(formReducer,initialState)

   const onCircleSelect = (actionType) =>{
       let newSelectedColor = {};
       const colorType = Color[actionType];
       for (key in currentState.pageColor){
           if(key === colorType) newSelectedColor[colorType] = 2;
           else newSelectedColor[key] = 0;
       }
       console.log('color of actionType',colorType);
       DISPATCH({
           type: UPDATE,
           selectedColor: newSelectedColor
        });
   }


   return (
    <View style={styles.container}>
        <View 
        style={styles.pageColorStyle}
        >
           <ColorCircle 
             style = {{
                 backgroundColor: Color.lightGreen,
                 borderWidth: currentState.pageColor[Color.lightGreen],
                }}
             type={lightGreen}
             onColorPress = {onCircleSelect}
           />
           <ColorCircle 
             style = {{
                 backgroundColor: Color.lightNaviBlue,
                 borderWidth: currentState.pageColor[Color.lightNaviBlue],
                }}
             type={lightNaviBlue}
             onColorPress = {onCircleSelect}
           />
            <ColorCircle 
             style = {{
                 backgroundColor: Color.compositeColor1,
                 borderWidth: currentState.pageColor[Color.compositeColor1],
                }}
             type={compositeColor1}
             onColorPress = {onCircleSelect}
           />
           <ColorCircle 
             style = {{
                 backgroundColor: Color.daySkyBlue,
                 borderWidth: currentState.pageColor[Color.daySkyBlue],
                }}
             type={daySkyBlue}
             onColorPress = {onCircleSelect}
           />
           
        </View>
    </View>
)

}

const styles = StyleSheet.create({
   container:{
       flex: 1,
       flexDirection: 'column',
    },
    pageColorStyle:{
        flex: 1,
        flexDirection: 'row'
    },

})

export default SettingsScreen;