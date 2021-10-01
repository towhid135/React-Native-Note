import React,{useLayoutEffect,useState,useReducer,useEffect} from 'react';
import {View,StyleSheet,FlatList} from 'react-native';
import InputItem from '../Component/UI/InputItem';
import {useSelector,useDispatch} from 'react-redux';
import { AddAction } from '../Store/Action/AddAction';
import EditAbleCustomButton from '../Component/UI/CustomHeaderButton';
import {EditAction} from '../Store/Action/EditAction';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../Component/UI/CustomHeaderButton';
import PageColor from '../Constants/PageColor';

const UPDATE_TITLE = 'UPDATE_TITLE';
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
const UPDATE_MODE = 'UPDATE_MODE';
const UPDATE_ID = 'UPDATE_ID';
const UPDATE_COLOR = 'UPDATE_COLOR';

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
        //case UPDATE_COLOR:
            //return {...state,pageColor:action.pageColor}
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
        taskId: props.route.params.addMode ? null : props.route.params.taskId,
        //pageColor: props.route.params.pageColor,
    }
    //console.log('addmode',initialState.addMode,'viewmode',initialState.viewMode,'editmode',initialState.editMode);
    const [currentState,DISPATCH] = useReducer(formReducer,initialState);
    //console.log('current state page color',props.route.params.pageColor);

    const selectedTaskId = currentState.taskId;
    let selectedButton=null;

    let selectedTask={};
    //find title and description
    if(currentState.editMode || currentState.viewMode){
        const allTasks = useSelector((select) => select.allTask.tasks ) 
        selectedTask = allTasks.find((task) => task.id === selectedTaskId)
        //console.log('selectedTask',selectedTask);
    }

    //for saving color
    /*useEffect(()=>{
        if(props.route.params.pageColor){
            DISPATCH({
                type: UPDATE_COLOR,
                pageColor: props.route.params.pageColor,
            })
        }
    })*/

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
        let finalPageColor = props.route.params.pageColor;
        console.log('page color in submit handler',finalPageColor);
        dispatch(AddAction({
            title:currentState.title,
            description:currentState.description,
            pageColor: finalPageColor
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
        props.navigation.goBack();
    }
    const settingsHandler = () =>{
        props.navigation.navigate('settings')
    }




    if(currentState.addMode) {
        useLayoutEffect(()=>{
            props.navigation.setOptions({
                headerRight: () => {
                    return(
                      <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                          <Item
                          name = 'settingsButton'
                          iconName = 'md-settings'
                          iconSize = {32}
                          color = 'black'
                          onPress = {settingsHandler}
                          />
                          <Item 
                          name = 'AddButton'
                          iconName = 'md-save'
                          iconSize = {32}
                          color = 'black'
                          onPress = {submitHandler}
                          />
                      </HeaderButtons>
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
        <View style={{backgroundColor: props.route.params.pageColor}}>
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
    },
})

export default AddScreen;