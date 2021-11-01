import React from "react";
export const LOGIN = 'LOGIN';

export const LoginAction = (userObj) =>{
    return {type: LOGIN, userInfo:{
        userName: userObj.Name,
        userId: userObj.Id
    }}
}