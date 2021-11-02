import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import StackNav from "./StackNav";

const MainNav = props =>{
    return (
        <NavigationContainer>
           <StackNav />
        </NavigationContainer>
    );
}

export default MainNav;



