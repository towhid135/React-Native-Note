import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions
} from 'react-native';

const InputItem = props =>{
    const Height = Dimensions.get('window').height;
    return (
        <View style={styles.container} >
            <ScrollView style={{height: "100%"}}>
            <TextInput
             style = {{...styles.titleStyle,...props.titleStyle}}
             placeholder='Enter Title'
             value = {props.title}
             maxLength={200}
             onChangeText={props.titleChange}
             editable={props.editPermission}
            />
            
            
            
            <TextInput 
             style={{
                 ...styles.desStyle,
                 ...props.desStyle,
                 height: Height * 0.8
                }}
             placeholder='Enter Description'
             value = {props.description}
             multiline = {true}
             textAlignVertical = 'top'
             onChangeText={props.desChange}
             editable={props.editPermission}
            />
            </ScrollView>
           
           
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
})

export default InputItem;