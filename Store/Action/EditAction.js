import React from "react";
import app from "../../fireBase/config";
export const EDIT = 'EDIT';


export const EditAction = (EditDataObj) =>{
    console.log('edit Data id',EditDataObj.id);
    return async dispatch => {
        await app.database().ref('/todos/'+EditDataObj.taskId).update(
            {
                'title':EditDataObj.title,
                 'description': EditDataObj.description
            }
            )
        dispatch({type:EDIT,editData: EditDataObj})
    }
}
