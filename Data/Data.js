import React from "react";
import app from "../fireBase/config";

const readData = () =>{
    var taskList = [];
    app.database().ref('/todos').on('value',querySnapShot =>{
        let data = querySnapShot.val() ? querySnapShot.val() : {}
        //console.log(data);
        let todoKeys = Object.keys(data);
        //console.log(data[todoKeys[0]].title);
        for (var key in todoKeys){
            //console.log(data[todoKeys[key]].title);
            taskList.push({
                id: todoKeys[key],
                title: data[ todoKeys[key] ].title,
                description: data[ todoKeys[key] ].description
            })
        }
    })
    return taskList;
}

export default readData;