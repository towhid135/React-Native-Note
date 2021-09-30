import React from "react";
import {View,StyleSheet,TouchableOpacity,TouchableNativeFeedback,Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Color from "../../Constants/Color";


const AddButton = props => {
    let TouchComponent = TouchableOpacity;
    if(Platform.OS==='android' && Platform.Version >= 21)
    {
        TouchComponent = TouchableNativeFeedback;
    }
    return(
            <View style={{...styles.addButton,...props.container}} >
        
                <View style={styles.touchView}>
        
                    <TouchComponent 
                    onPress= {props.route} 
                    background={TouchableNativeFeedback.Ripple()}
                    >
                    <View style={styles.roundRipple}>
                    <Ionicons name="md-add" size={80} color={Color.lightGreen} />
                    </View>
                    </TouchComponent>
        
                </View>
                
            </View>
    )
}

const styles = StyleSheet.create({
    addButton:{
        flex:1,
        alignItems:'flex-end',
    },
    touchView:{
        borderRadius: 40,
        overflow: 'hidden',
        width: 80,
        height: 80
    },
})

export default AddButton;