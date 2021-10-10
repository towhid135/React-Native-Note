import React from "react";
import {View,Text,TouchableHighlight,StyleSheet} from 'react-native';
import Color from "../../Constants/Color";

const CustomButton = props =>{
    return (
        <View style={{...styles.container,...props.buttonContainer}}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={null}
              onPress={props.buttonAction}
              style={{...styles.touchStyle,...props.buttonTouchStyle}}
            >
                <Text style={{...styles.textStyle,...props.buttonTextStyle}} >{props.children}</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "30%",
        backgroundColor: Color.lightNaviBlue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    touchStyle:{
        padding: 5,
        width: "100%",
        alignItems: 'center',
        borderRadius: 10,
    },
    textStyle:{
        fontSize: 20,
        color: 'white',
        fontFamily: 'MontserratBold',
    },
})

export default CustomButton;