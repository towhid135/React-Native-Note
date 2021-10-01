import React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight
} from 'react-native';


const Width = Dimensions.get('window').width;

const ColorCircle = props =>{
    return (
    <View>
        <TouchableHighlight
            style={{...styles.greenStyle,...props.style}}
            underlayColor= 'null'
            onPress = {props.onColorPress.bind(this,props.type)}
        >
          <View></View>
        </TouchableHighlight>
    </View>
    )
}

const styles = StyleSheet.create({
    greenStyle:{
        width: (Width * 0.1),
        height: (Width * 0.1),
        borderRadius: (Width * 0.1) * 0.5,
        borderColor: 'black',
    }
})

export default ColorCircle;