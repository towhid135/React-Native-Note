import React,{useState} from "react";
import {View,TextInput,Button, Text} from 'react-native';
import FontNames from "../Constants/FontNames";

var index = 0;
const FontTestScreen = () =>
{
    const [text,setText] = useState('');
    const [font,setFont] = useState(null);

   
    const values = Object.values(FontNames);
    //console.log('values',values);
    const fontHandler = () =>{
        if(index > 7) index = 0;
        console.log('fontNames',values[index],'index',index);
        setFont(values[index]);
        index++;
    }


    var stylesValue = {
        borderColor:'black',
        borderWidth:2,
        fontStyle: 'normal',
        fontFamily:font
      }
    return(
        <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
            <View>
            <Text>Using Text</Text>
            <Text
              style={stylesValue}
            >
            {font}
            </Text>
            </View>
            <View>
            <Button title="Change Font" onPress={fontHandler} />
            </View>
        </View>
    )
}

export default FontTestScreen;