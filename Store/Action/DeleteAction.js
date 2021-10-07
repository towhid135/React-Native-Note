import React from "react";
export const DELETE = 'DELETE';

export const DeleteAction = (itemId) =>{
    return {type: DELETE, taskId: itemId}
}