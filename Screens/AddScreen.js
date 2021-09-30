import React,{useLayoutEffect,useState,useReducer} from 'react';
import {View,StyleSheet,FlatList} from 'react-native';
import InputItem from '../Component/UI/InputItem';
import {useSelector,useDispatch} from 'react-redux';
import { AddAction } from '../Store/Action/AddAction';
import EditAbleCustomButton from '../Component/UI/CustomHeaderButton';
import {EditAction} from '../Store/Action/EditAction';

const UPDATE_TITLE = 'UPDATE_TITLE';
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
const UPDATE_MODE = 'UPDATE_MODE';
const UPDATE_ID = 'UPDATE_ID';

const formReducer = (state,action) =>{
    switch(action.type){
        case UPDATE_TITLE:
            return {...state,title: action.updatedTitle}
        case UPDATE_DESCRIPTION:
            return {...state,description: action.updatedDescription}
        case UPDATE_MODE:
            return {...state,
                viewMode:action.modes.viewMode,
                editMode: action.modes.editMode,
                addMode: action.modes.addMode,
                title: action.values.title,
                description: action.values.description
            }
        //case UPDATE_ID:
        default:
            return state;
    }
}

const AddScreen = props => {
    const dispatch = useDispatch();
    //console.log('addmode',props.route.params);
    const initialState = {
        title: '',
        description: '',
        addMode: props.route.params.addMode ? true : false,
        viewMode: props.route.params.addMode ? false :  props.route.params.viewMode,
        editMode: props.route.params.addMode ? false : props.route.params.editMode,
        taskId: props.route.params.addMode ? null : props.route.params.taskId
    }
    //console.log('addmode',initialState.addMode,'viewmode',initialState.viewMode,'editmode',initialState.editMode);
    const [currentState,DISPATCH] = useReducer(formReducer,initialState);

    const selectedTaskId = currentState.taskId;
    let selectedButton=null;

    let selectedTask={};
    //find title and description
    if(currentState.editMode || currentState.viewMode){
        const allTasks = useSelector((select) => select.allTask.tasks ) 
        selectedTask = allTasks.find((task) => task.id === selectedTaskId)
        //console.log('selectedTask',selectedTask);
    }

    const titleChangeHandler = text =>{
        DISPATCH({
            type: UPDATE_TITLE,
            updatedTitle: text
        })
    }
    const descriptionChangeHandler = text =>{
        DISPATCH({
            type: UPDATE_DESCRIPTION,
            updatedDescription: text
        })
    }

    const submitHandler = () =>{
        dispatch(AddAction({
            title:currentState.title,
            description:currentState.description
        }))
        props.navigation.goBack();
    }
    const onEditButtonPress = ()=> {
        DISPATCH({
            type: UPDATE_MODE,
            modes: {
                viewMode: false,
                addMode: false,
                editMode: true,
            },
            values:{
                title: selectedTask.title,
                description: selectedTask.description,
            }
        })
    }
    const editButtonHandler = () =>{
        const editedData = {
            id: currentState.taskId,
            title: currentState.title,
            description: currentState.description
        };
        dispatch(EditAction(editedData));
    }




    if(currentState.addMode) {
        const addButton = (
            <EditAbleCustomButton 
                name = 'AddButton'
                iconName = 'md-save'
                iconSize = {32}
                color = 'black'
                addFunc = {submitHandler}
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
    }

    else if(currentState.viewMode){
        const addButton = (
            <EditAbleCustomButton 
            name = 'editButton'
            iconName = 'md-create'
            iconSize = {32}
            color = 'black'
            addFunc = {onEditButtonPress}
          />
            )
            selectedButton = addButton;
            useLayoutEffect(()=>{
                props.navigation.setOptions({
                    headerRight: () => {
                        return(
                          selectedButton
                        )
                    },
                    title: 'Your Task'
                })
            })
    }

    else{
        const addButton = (
            <EditAbleCustomButton 
                name = 'AddButton'
                iconName = 'md-save'
                iconSize = {32}
                color = 'black'
                addFunc = {editButtonHandler}
           />
            )
        selectedButton = addButton;
        useLayoutEffect(()=>{
            props.navigation.setOptions({
                headerRight: () => {
                    return(
                      selectedButton
                    )
                },
                title: 'Edit Your Task'
            })
        })
    }



    return (
        <View>
            <InputItem 
            title={(currentState.viewMode) ? selectedTask.title : currentState.title } 
            description={(currentState.viewMode) ? selectedTask.description : currentState.description } 
            titleChange={(currentState.addMode || currentState.editMode) ? titleChangeHandler : null} 
            desChange={(currentState.addMode || currentState.editMode) ? descriptionChangeHandler : null} 
            editPermission = {(currentState.addMode || currentState.editMode) ? true : false}
            titleStyle={currentState.viewMode ? styles.titleStyle : null}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 25,
    }
})

export default AddScreen;