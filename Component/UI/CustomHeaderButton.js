import React from "react";
import {HeaderButton,HeaderButtons,Item} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';
import Color from "../../Constants/Color";
const CustomHeaderButton = props =>{
    return(
        <HeaderButton
         {...props}
         IconComponent={Ionicons}
        />
    )
}

const EditAbleCustomButton = props =>{
    return(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
            name = {props.name} 
            iconName = {props.iconName}
            iconSize = {props.iconSize}
            color = {props.color}
            onPress = {props.addFunc}
            />
       </HeaderButtons>
    )
}

export default EditAbleCustomButton;