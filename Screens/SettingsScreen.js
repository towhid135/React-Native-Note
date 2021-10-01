import React,{useState,useReducer,useLayoutEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    } from 'react-native';
import ColorCircle from "../Component/UI/ColorCircle";
import PageColor from "../Constants/PageColor";
import EditAbleCustomButton from "../Component/UI/CustomHeaderButton";
//action type
const lightGreen = 'lightGreen';
const lightNaviBlue = 'lightNaviBlue';
const compositeColor1 = 'compositeColor1';
const daySkyBlue = 'daySkyBlue';
const pastelBlue = 'pastelBlue';
const darkMint = 'darkMint';
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

    useLayoutEffect(()=>{
        props.navigation.setOptions({
            headerRight: () =>{
                return (
                    <EditAbleCustomButton 
                        name = 'colorSave'
                        iconName = 'md-save'
                        iconSize = {32}
                        color = 'black'
                        addFunc = {()=>saveColor()}
                    />
                )
            }
        })
    })
   const initialState = {
      pageColor: {
        [PageColor.lightGreen]: 0,
        [PageColor.lightNaviBlue]: 0,
        [PageColor.compositeColor1]: 0,
        [PageColor.daySkyBlue]: 0,
        [PageColor.pastelBlue]: 0,
        [PageColor.darkMint]: 0,
      }
   }

   const [currentState,DISPATCH] = useReducer(formReducer,initialState)

   const onCircleSelect = (actionType) =>{
       let newSelectedColor = {};
       const colorType = PageColor[actionType];
       for (key in currentState.pageColor){
           if(key === colorType) newSelectedColor[colorType] = 4;
           else newSelectedColor[key] = 0;
       }
       //console.log('PageColor of actionType',colorType);
       DISPATCH({
           type: UPDATE,
           selectedColor: newSelectedColor
        });
   }

   let allColor = [];

   const CircleCreate = (colorName) =>{
       return (
           <ColorCircle 
             key = {PageColor[colorName]}
             style = {{
                 backgroundColor: PageColor[colorName],
                 borderWidth: currentState.pageColor[PageColor[colorName]]
             }}
             type = {colorName}
             onColorPress = {onCircleSelect}
           />
       )
   }

   for (key in PageColor){
       allColor.push(CircleCreate(key));
   }

   const saveColor = () =>{
       let selectedPageColor=null;
       for (key in currentState.pageColor){
           if(currentState.pageColor[key] === 4){
               selectedPageColor = key;
               break;
           }
       }
      props.navigation.navigate({name:'Add',params:{pageColor: selectedPageColor}})
   }

   return (
    <View style={styles.container}>
        <View style={styles.pageTitleStyle}>
            <Text style={styles.titleTextStyle}>Select Page Color</Text>
        </View>
        <View 
        style={styles.pageColorStyle}
        >
           {allColor}
           
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
        //flex: 1,
        flexDirection: 'row',
        margin: 10,
        borderColor: PageColor.daySkyBlue,
        borderWidth: 1,
    },
    pageTitleStyle:{
        margin: 10,
    },
    titleTextStyle:{
        fontWeight: 'bold',
        fontSize: 15,
    }

})

export default SettingsScreen;