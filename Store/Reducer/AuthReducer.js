import React from "react";
import { LOGIN } from "../Action/AuthAction";

const initialState = {
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