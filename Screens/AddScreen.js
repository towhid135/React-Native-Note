import React,{useLayoutEffect,useReducer} from 'react';
import {View,StyleSheet} from 'react-native';
import InputItem from '../Component/UI/InputItem';
import {useSelector,useDispatch} from 'react-redux';
import { AddAction } from '../Store/Action/AddAction';
import EditAbleCustomButton from '../Component/UI/CustomHeaderButton';
import {EditAction} from '../Store/Action/EditAction';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../Component/UI/CustomHeaderButton';
import TextItem from '../Component/UI/TextItem';

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
    const initialState = {
        title: '',
        description: '',
        addMode: props.route.params.addMode  ? true : false,
        viewMode: props.route.params.addMode ? false :  props.route.params.viewMode,
        editMode: props.route.params.addMode ? false : props.route.params.editMode,
        taskId: props.route.params.addMode ? null : props.route.params.taskId,
        //pageColor: props.route.params.pageColor,
    }

    const [currentState,DISPATCH] = useReducer(formReducer,initialState);
    const selectedTaskId = currentState.taskId;
    let selectedButton=null;

    const CurrentPageSettings = useSelector((state) => state.allTask.settings);
    const SavedPageSettings = useSelector((state) => state.allTask.tasks);
    const EditedPageSettings = currentState.addMode ? null : SavedPageSettings.find((task) => task.id === selectedTaskId);

    const addPageColor = CurrentPageSettings.selectedPageColor;
    const editPageColor = currentState.addMode ? null : CurrentPageSettings.selectedEditPageColor!==null ? CurrentPageSettings.selectedEditPageColor : EditedPageSettings.pageColor;
    const textColorToShow = CurrentPageSettings.selectedTextColor;
    const editTextColorToShow = currentState.addMode ? null : CurrentPageSettings.editTextColor!==null ? CurrentPageSettings.editTextColor : EditedPageSettings.textColor;
    const addPageFont = CurrentPageSettings.selectedFontItem;
    const editPageFont = CurrentPageSettings.editFontItem;
    const userId = useSelector((state) => state.userInfo.userId);

    let selectedTask={};
    //find title and description
    if(currentState.editMode || currentState.viewMode){
        const allTasks = useSelector((select) => select.allTask.tasks ) 
        selectedTask = allTasks.find((task) => task.id === selectedTaskId)
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
        let finalPageColor = addPageColor;
        dispatch(AddAction({
            title:currentState.title,
            description:currentState.description,
            pageColor: finalPageColor,
            textColor: textColorToShow,
            textFont: addPageFont,
            userId: userId,
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
            userId: userId,
            id: currentState.taskId,
            title: currentState.title,
            description: currentState.description,
            pageColor: editPageColor,
            textColor: editTextColorToShow,
            textFont: editPageFont
        };
        dispatch(EditAction(editedData));
        props.navigation.goBack();
    }

    const settingsHandler = () =>{
        props.navigation.navigate('settings')
    }

    const editSettingsHandler = () =>{

        props.navigation.navigate({name:'editSettings',
            params: {
                pageColorCode:selectedTask.pageColor,
                textColorCode: selectedTask.textColor,
                textFont: selectedTask.textFont,
            }
        })
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
                    title: 'Your Note'
                })
            })
    }

    else{
        useLayoutEffect(()=>{
            props.navigation.setOptions({
                headerRight: () => {
                    return(
                      <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                          <Item
                          name = 'editSettingsButton'
                          iconName = 'md-settings'
                          iconSize = {32}
                          color = 'black'
                          onPress = {editSettingsHandler}
                          />
                          <Item 
                          name = 'editButton'
                          iconName = 'md-save'
                          iconSize = {32}
                          color = 'black'
                          onPress = {editButtonHandler}
                          />
                      </HeaderButtons>
                    )
                },
                title: 'Edit Note'
            })
        })
    }

    var inputItems = (
        <InputItem 
        title={(currentState.viewMode) ? selectedTask.title : currentState.title } 
        description={(currentState.viewMode) ? selectedTask.description : currentState.description } 
        titleChange={(currentState.addMode || currentState.editMode) ? titleChangeHandler : null} 
        desChange={(currentState.addMode || currentState.editMode) ? descriptionChangeHandler : null} 
        editPermission = {(currentState.addMode || currentState.editMode) ? true : false}
        titleStyle={
            (currentState.editMode) ? {...styles.titleStyle,color: editTextColorToShow,fontFamily:editPageFont} : {...styles.titleStyle,color:textColorToShow, fontFamily: addPageFont}
        }
        desStyle = {currentState.addMode ? {color: textColorToShow,fontFamily: addPageFont} : {color:editTextColorToShow,fontFamily: editPageFont} }
        />
    )
   var TextItemsView = (
       <TextItem 
         title={selectedTask.title}
         description={selectedTask.description}
         taskID = {selectedTaskId}
         titleStyle = {{...styles.titleStyle,color: editTextColorToShow,fontFamily:editPageFont}}
         desStyle = {{color: editTextColorToShow,fontFamily:editPageFont}}
       />
   )

    return (
        <View 
        style={{backgroundColor: currentState.addMode ? addPageColor : (props.route.params.editMode ? editPageColor : selectedTask.pageColor) }}
        >
           {currentState.viewMode ? TextItemsView : inputItems}
        </View>
    );
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 25,
    },
})

export default AddScreen;