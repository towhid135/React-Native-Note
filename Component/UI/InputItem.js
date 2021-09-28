import React from 'react';
import {View,TextInput,StyleSheet, Text} from 'react-native';

const InputItem = props =>{

    return (
        <View style={styles.container} >
            
            <TextInput
             style = {styles.titleStyle}
             placeholder='Enter Title'
             value = {props.title}
             maxLength={200}
             onChangeText={props.titleChange}
            />
            

            
            <TextInput 
             style={styles.desStyle}
             placeholder='Enter Description'
             value = {props.description}
             multiline = {true}
             textAlignVertical = 'top'
             onChangeText={props.desChange}
            />
           
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 15,
    },
    titleStyle:{
     marginBottom: 25,
    },
    desStyle:{
      
        height: '90%',
    }
})

export default InputItem;