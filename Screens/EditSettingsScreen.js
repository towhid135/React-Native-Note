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
import {EditSettingsAction} from "../Store/Action/SettingsAction";

//action type
for (key in PageColor){
    var key = String(key);
}
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

const EditSettingsScreen = props =>{
    let savedPageColor = props.route.params.colorCode;

    console.log('savePageColor',savedPageColor);

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
      }
   }

   const [currentState,DISPATCH] = useReducer(formReducer,initialState)
   console.log('saved value from currentState',currentState.pageColor[savedPageColor])

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

   const saveColor = () => {
       let selectedPageColor=null;
       for (key in currentState.pageColor){
           if(currentState.pageColor[key] === 4){
               selectedPageColor = key;
               break;
           }
       }
      const allPageSettings = {
          pageColor: selectedPageColor
      }
      dispatch(EditSettingsAction(allPageSettings));
      props.navigation.navigate({name: 'Add',params:{editMode:true}});
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
        flexWrap: 'wrap'
    },
    pageTitleStyle:{
        margin: 10,
    },
    titleTextStyle:{
        fontWeight: 'bold',
        fontSize: 15,
    }

})

export default EditSettingsScreen;