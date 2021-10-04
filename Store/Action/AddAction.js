import React from "react";
import PageColor from "../../Constants/PageColor";
export const ADD = "ADD";

export const AddAction = (titleAndDes) =>{

    return async dispatch =>{

        const response = await fetch('https://todo-d13e8-default-rtdb.firebaseio.com/todos.json',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleAndDes.title, 
            description: titleAndDes.description,
            pageColor: titleAndDes.pageColor!==null ? titleAndDes.pageColor : PageColor.compositeColor1,
            textColor: titleAndDes.textColor!==null ? titleAndDes.textColor : 'black'
        })
    })
    //getting responsed data
    const resData = await response.json();

        dispatch({
            type: ADD,
            tasks: {
                id: resData.name, 
                title: titleAndDes.title, 
                description: titleAndDes.description,
                pageColor: titleAndDes.pageColor !== null ? titleAndDes.pageColor : PageColor.compositeColor1,
                textColor: titleAndDes.textColor!==null ? titleAndDes.textColor : 'black'

            }
        })
    }
}