import React from "react";
import app from "../../fireBase/config";
export const EDIT = 'EDIT';


export const EditAction = (EditDataObj) =>{
    return async dispatch => {
        const Id = EditDataObj.id;
        app.database().ref('/'+EditDataObj.userId+'/todos/'+Id).update(
            {
                'title':EditDataObj.title,
                 'description': EditDataObj.description,
                 'pageColor': EditDataObj.pageColor,
                 'textColor': EditDataObj.textColor,
                 'textFont': EditDataObj.textFont
            }
            )
        dispatch({type:EDIT,editData: EditDataObj})
    }
}
