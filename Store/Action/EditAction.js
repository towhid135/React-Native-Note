import React from "react";
import app from "../../fireBase/config";
export const EDIT = 'EDIT';


export const EditAction = (EditDataObj) =>{
    return async dispatch => {
        const Id = EditDataObj.id;
        console.log('edit Data id',EditDataObj.id);
        await app.database().ref('/todos/'+Id).update(
            {
                'title':EditDataObj.title,
                 'description': EditDataObj.description
            }
            )
        dispatch({type:EDIT,editData: EditDataObj})
    }
}
