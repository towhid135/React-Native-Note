import React,{useEffect,useReducer} from "react";
import app from "../../fireBase/config";
import {ADD} from '../Action/AddAction';
import {FetchData,stillFetching } from "../Action/FetchDataAction";
import { EDIT } from "../Action/EditAction";


const initialState = {
    tasks: [],
    isStillFetching: true,
}
//console.log('initial state',initialState.tasks);

export default (state=initialState,action)=>{
    switch(action.type){
        case ADD:
            return {...state,tasks: [...state.tasks,action.tasks]}

        case FetchData:
            return {...state,tasks: action.tasks}
        case stillFetching:
            return {...state,isStillFetching: action.isFetching}
        case EDIT:
            let filteredList = state.tasks.filter( (task)=> task.id !== action.editData.id );
            filteredList.push(action.editData);
            return {...state,tasks: filteredList}
        default:
            return state;
    }
}