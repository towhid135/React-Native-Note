import React from 'react';
import {View,StyleSheet, Text,ScrollView,Dimensions} from 'react-native';

const TextItem = props =>{
    const screenHeight = Dimensions.get('window').height;
    return (
        <View style={{...styles.container,...props.container}} >
            <ScrollView style={{height:"100%"}} >
            <Text
             selectable={true}
             style = {{...styles.titleStyle,...props.titleStyle}}
            >
            {props.title}
            </Text>
    
            <Text 
            selectable={true}
            style = {{...styles.desStyle,...props.desStyle}}
            >
             {props.description}
            </Text>
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
    desStyle:{
        height: '100%',
    }
})

export default TextItem;