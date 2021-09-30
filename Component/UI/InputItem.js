import React from 'react';
import {View,TextInput,StyleSheet, Text} from 'react-native';

const InputItem = props =>{

    return (
        <View style={styles.container} >
            
            <TextInput
             style = {{...styles.titleStyle,...props.titleStyle}}
             placeholder='Enter Title'
             value = {props.title}
             maxLength={200}
             onChangeText={props.titleChange}
             editable={props.editPermission}
            />
            

            
            <TextInput 
             style={{...styles.desStyle,...props.desStyle}}
             placeholder='Enter Description'
             value = {props.description}
             multiline = {true}
             textAlignVertical = 'top'
             onChangeText={props.desChange}
             editable={props.editPermission}
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