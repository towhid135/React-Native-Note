import React from "react";
import {ADD} from '../Action/AddAction';
import {FetchData,stillFetching } from "../Action/FetchDataAction";
import { EDIT } from "../Action/EditAction";
import { SET_PAGE_COLOR,SET_EDIT_PAGE_COLOR } from "../Action/SettingsAction";
import { DELETE } from "../Action/DeleteAction";


const initialState = {
    tasks: [],
    isStillFetching: true,
    settings:{
        selectedPageColor: '#82CAFF',
        selectedEditPageColor: null,
        selectedTextColor: 'black',
        editTextColor: null,
        selectedFontItem: null,
        editFontItem: null,
    }
}
export default (state=initialState,action)=>{
    switch(action.type){
        case ADD:
            return {
                ...state,
                tasks: [...state.tasks,action.tasks],
                settings: {
                    ...state.settings,
                    selectedPageColor:  '#82CAFF',
                    selectedTextColor: 'black',
                    selectedFontItem: null,
                }
            }

        case FetchData:
            return {...state,
                tasks: action.tasks,
            }
        case stillFetching:
            return {...state,isStillFetching: action.isFetching}
        case EDIT:
            let filteredList = state.tasks.filter( (task) => task.id !== action.editData.id );
            filteredList.push(action.editData);
            return {...state,tasks: filteredList,settings: {
                ...state.settings,
                editTextColor: null,
                editFontItem: null
            }}
        case SET_PAGE_COLOR:
            return {...state,settings: {...state.settings,
                selectedPageColor: action.allSettings.pageColor,
                selectedTextColor: action.allSettings.textColor,
                selectedFontItem: action.allSettings.textFont,
            }}
        case SET_EDIT_PAGE_COLOR:
            return {
                    ...state, settings: {
                    ...state.settings,
                    selectedEditPageColor: action.allEditSettings.pageColor,
                    editTextColor: action.allEditSettings.textColor,
                    editFontItem: action.allEditSettings.textFont,
                }
            }
        case DELETE:
            const updatedTasks = state.tasks.filter((task)  => action.taskId!=task.id);
            return {
                ...state,
                tasks: updatedTasks,
            }
        default:
            return state;
    }
}