import React,{useEffect,useReducer} from "react";
import app from "../../fireBase/config";
import {ADD} from '../Action/AddAction';
import {FetchData } from "../Action/FetchDataAction";


const initialState = {
    tasks: [],
}
console.log('initial state',initialState.tasks);

export default (state=initialState,action)=>{
    switch(action.type){
        case ADD:
            return {...state,tasks: [...state.tasks,action.tasks]}

        case FetchData:
            return {...state,tasks: action.tasks}
        default:
            return state;
    }
}