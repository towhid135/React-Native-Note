import React from "react";
import {HeaderButton} from 'react-navigation-header-buttons';
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

export default CustomHeaderButton;