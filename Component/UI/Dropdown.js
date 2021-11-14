import React,{useState} from "react";
import {View,Text,StyleSheet,TouchableHighlight,ScrollView} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import FontNames from "../../Constants/FontNames";
import {useSelector} from 'react-redux'


const Dropdown = props => {

    const [visible,setVisible] = useState(false);
    const initialOrSavedFont = props.initialOrSavedFont;
    console.log('initalOrSavedFont inside dropdown', initialOrSavedFont);
    const [selectedItem,setSelectedItem] = useState(initialOrSavedFont);
    let allFont = [];
    const selectedItemAction = (itemName) =>{
        setVisible(false);
        setSelectedItem(itemName);
        props.onFontSelect(itemName);

    }

    const renderItem = (itemName) =>{
        return (
        <TouchableHighlight
        style={styles.itemTouchableStyle}
        key={itemName}
        activeOpacity={0.4}
        underlayColor= {null}
        onPress = {selectedItemAction.bind(this,itemName)}
        >
            <Text style={{...styles.itemNameText,fontFamily: itemName}} >{itemName}</Text>
        </TouchableHighlight>
        )
    }

    const showedItemName = selectedItem !== null ? selectedItem : 'Select Font';

    for (key in FontNames){
        allFont.push(renderItem(FontNames[key]));
    }


    return (
        <View style={styles.container} >

            <TouchableHighlight
            activeOpacity={0.6}
            underlayColor= {null}
            onPress = {() => {setVisible(!visible)}}
            >
            <View style={styles.dropDown}>
                <Text 
                style={{...styles.itemNameText,fontFamily: selectedItem ? selectedItem : null}} 
                >
                    {showedItemName}
                    </Text>
                <Ionicons name= {visible ? 'md-caret-down' : 'md-caret-up'} size={32} />
            </View>
            </TouchableHighlight>

            
             {visible && <View 
             style={styles.modalView}
             >
                 <ScrollView style={{height: "70%"}}>
                   {allFont}
                  </ScrollView>
             </View>
            }



        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column'
    },
    dropDown:{
        borderColor: 'black',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalView:{
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 2,
        borderTopWidth: 0,
    },
    itemNameText:{
        fontSize: 20,
    },
    itemTouchableStyle:{
        padding: 10,
        margin: 10,
    }
})

export default Dropdown;