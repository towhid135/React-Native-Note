import React from "react";
import {View,Text,StyleSheet} from 'react-native';

const ViewItem = props =>{
    return (
        <View style={{...styles.textStyle,...props.style}} >
            <Text style={props.textStyle}>{props.children}</Text>
        </View > 
    );
}

const styles = StyleSheet.create({
    textStyle:{
        padding: 10,
        margin: 10,
    }
})

export default ViewItem;