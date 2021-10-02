import React,{useEffect,useReducer} from "react";
import app from "../../fireBase/config";
import {ADD} from '../Action/AddAction';
import {FetchData,stillFetching } from "../Action/FetchDataAction";
import { EDIT } from "../Action/EditAction";
import { SET_PAGE_COLOR,SET_EDIT_PAGE_COLOR } from "../Action/SettingsAction";


const initialState = {
    tasks: [],
    isStillFetching: true,
    settings:{
        selectedPageColor: null,
        selectedEditPageColor: null
    }
}
//console.log('initial state',initialState.tasks);

export default (state=initialState,action)=>{
    switch(action.type){
        case ADD:
            console.log('page color in action.tasks', action.tasks.pageColor);
            return {
                ...state,
                tasks: [...state.tasks,action.tasks],
                settings: {...state.settings,selectedPageColor:  null}
            }

        case FetchData:
            return {...state,tasks: action.tasks}
        case stillFetching:
            return {...state,isStillFetching: action.isFetching}
        case EDIT:
            let filteredList = state.tasks.filter( (task)=> task.id !== action.editData.id );
            filteredList.push(action.editData);
            return {...state,tasks: filteredList}
        case SET_PAGE_COLOR:
            return {...state,settings: {...state.settings,
                selectedPageColor: action.allSettings.pageColor
            }}
        case SET_EDIT_PAGE_COLOR:
            return {
                    ...state, settings: {
                    ...state.settings,
                    selectedEditPageColor: action.allEditSettings.pageColor
                }
            }
        default:
            return state;
    }
}