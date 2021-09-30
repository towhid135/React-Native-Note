import React,{useLayoutEffect} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import AddScreen from './AddScreen';
import EditAbleCustomButton from '../Component/UI/CustomHeaderButton';

const TaskViewScreen = props => {
    const taskId = props.route.params.taskId;
    let selectedButton = null;
    const editHandler = (id,title,description)=> {
        props.navigation.navigate('EditScreen');
    }
    const addButton = (
        <EditAbleCustomButton 
        name = 'editButton'
        iconName = 'md-create'
        iconSize = {32}
        color = 'black'
        addFunc = {editHandler}
      />
        )
        selectedButton = addButton;
        useLayoutEffect(()=>{
            props.navigation.setOptions({
                headerRight: () => {
                    return(
                      selectedButton
                    )
                }
            })
        })
    return (
        <AddScreen taskId={taskId} viewMode={true} />
    );
}

const styles = StyleSheet.create({
   
})

export default TaskViewScreen;