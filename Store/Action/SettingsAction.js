import React from "react";

export const SET_PAGE_COLOR = 'SET_PAGE_COLOR';
export const SET_EDIT_PAGE_COLOR = 'SET_EDIT_PAGE_COLOR';

export const SettingsAction = (settingObj) =>{
    return {
        type: SET_PAGE_COLOR,
        allSettings: settingObj
    }
}

export const EditSettingsAction = (settingObj) =>{
    return {
        type: SET_EDIT_PAGE_COLOR,
        allEditSettings: settingObj
    }
}