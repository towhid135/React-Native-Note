import React from "react";
import { LOGIN } from "../Action/AuthAction";

const initialState = {
    userName: null,
    userId: null
}

const AuthReducer = (state=initialState,action) =>{
    switch(action.type){
        case LOGIN:
            return {...action.userInfo};
        default:
            return state;
    }
}

export default AuthReducer;