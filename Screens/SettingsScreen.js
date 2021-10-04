import React,{useEffect,useReducer,useLayoutEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    } from 'react-native';
import ColorCircle from "../Component/UI/ColorCircle";
import PageColor from "../Constants/PageColor";
import EditAbleCustomButton from "../Component/UI/CustomHeaderButton";
import {useSelector,useDispatch} from 'react-redux'
import { SettingsAction} from "../Store/Action/SettingsAction";
import TextColor from "../Constants/TextColor";
//action type
for (key in PageColor){
    var key = String(key);
}

for (key in TextColor){
    var key = String(key);
}

const UPDATE = 'UPDATE';
const UPDATE_TEXT_COLOR = 'UPDATE_TEXT_COLOR';

const formReducer = (state,action) =>{
    switch(action.type){
        case UPDATE:
            return {
                ...state,
                pageColor: action.selectedColor
            }
        case UPDATE_TEXT_COLOR:
            return{
                ...state,
                textColor: action.selectedTextColor

            }
        default:
            return state;
    }
}

const SettingsScreen = props =>{
    const savedPageColor = useSelector((state) => state.allTask.settings.selectedPageColor);
    const savedTextColor = useSelector((state) => state.allTask.settings.selectedTextColor);
    const selectedPageSettings = useSelector((state) => state.allTask.settings);
    console.log('selectedPageSettings', selectedPageSettings);
    console.log('saved text color from store',savedTextColor);

    const dispatch = useDispatch();

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
        [PageColor.lightGreen]: PageColor.lightGreen===savedPageColor ? 4 : 0,
        [PageColor.lightNaviBlue]: PageColor.lightNaviBlue===savedPageColor ? 4 : 0 ,
        [PageColor.compositeColor1]: PageColor.compositeColor1===savedPageColor ? 4 : 0,
        [PageColor.daySkyBlue]: PageColor.daySkyBlue===savedPageColor ? 4 : 0 ,
        [PageColor.pastelBlue]: PageColor.pastelBlue===savedPageColor ? 4 : 0,
        [PageColor.darkMint]: PageColor.darkMint===savedPageColor ? 4 : 0,
        [PageColor.purple] : PageColor.purple===savedPageColor ? 4 : 0,
        [PageColor.orange] : PageColor.orange===savedPageColor ? 4 : 0,
        [PageColor.olive] : PageColor.olive===savedPageColor ? 4 : 0,
        [PageColor.darkSlate] : PageColor.darkSlate===savedPageColor ? 4 : 0,
        [PageColor.blueEyes] : PageColor.blueEyes===savedPageColor ? 4 : 0,
        [PageColor.seaGreen] : PageColor.seaGreen===savedPageColor ? 4 : 0,
        
      },
    textColor: {
        [TextColor.black]: TextColor.black===savedTextColor ? 4 : 0,
        [TextColor.white]: TextColor.white===savedTextColor ? 4 : 0
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

   const onTextColorSelect = (actionType) =>{
    let newSelectedTextColor = {};
    const colorType = TextColor[actionType];
    for (key in currentState.textColor){
        if(key === colorType) newSelectedTextColor[colorType] = 4;
        else newSelectedTextColor[key] = 0;
    }
    //console.log('PageColor of actionType',colorType);
    DISPATCH({
        type: UPDATE_TEXT_COLOR,
        selectedTextColor: newSelectedTextColor
     });
   }

   let allColor = [];
   let allTextColor = [];

   //creating circle for selecting page color
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

   //creating circle for text color selection
   const CircleForTextColor = (colorName) =>{
       return (
           <ColorCircle 
             key = {TextColor[colorName]}
             style={{
                 backgroundColor: TextColor[colorName],
                 borderWidth: currentState.textColor[ TextColor[colorName] ]
             }}
             type = {colorName}
             onColorPress = {onTextColorSelect}
           />
       )
   }

   for (key in PageColor){
       allColor.push(CircleCreate(key));
   }
   for (key in TextColor){
       allTextColor.push(CircleForTextColor(key))
   }

   const saveColor = () =>{
       let selectedPageColor=null;
       let selectedTextColor = null;
       for (key in currentState.pageColor){
           if(currentState.pageColor[key] === 4){
               selectedPageColor = key;
               break;
           }
       }
       for (key in currentState.textColor){
           if(currentState.textColor[key] === 4){
               selectedTextColor = key;
               break;
           }
       }
      const allPageSettings = {
          pageColor: selectedPageColor !== null ? selectedPageColor : '#82CAFF',
          textColor: selectedTextColor !== null ? selectedTextColor : 'black',
      }
      dispatch(SettingsAction(allPageSettings));
      props.navigation.navigate('Add');
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

        <View  style={styles.pageTitleStyle}>
            <Text style={styles.titleTextStyle}>Select Text Color</Text>
        </View>

        <View style={styles.textColorStyle} >
            {allTextColor}
        </View>

    </View>
)

}

const styles = StyleSheet.create({
   container:{
       flex: 1,
       flexDirection: 'column',
       backgroundColor: '#ccc'
    },
    pageColorStyle:{
        //flex: 1,
        flexDirection: 'row',
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        flexWrap: 'wrap',
    },
    pageTitleStyle:{
        margin: 10,
    },
    titleTextStyle:{
        fontWeight: 'bold',
        fontSize: 15,
    },
    textColorStyle:{
        flexDirection: 'row',
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        flexWrap: 'wrap'
    }

})

export default SettingsScreen;