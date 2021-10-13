import TextColor from "../../Constants/TextColor";
export const FetchData = 'FetchData';
export const stillFetching = 'stillFetching';

export const FetchAction = (userId) =>{
    return async dispatch =>{
        /*fetch function by default calls the GET method, so we don't need to declare the GET method. And we also don't need to
        declare the headers here */
        dispatch({
            type: stillFetching,
            isFetching: true
        })
        const response = await fetch('https://todo-d13e8-default-rtdb.firebaseio.com/'+userId+'/todos.json');
        const fetchedData = await response.json();
        const allTasks = [];
        for (key in fetchedData){
            const Newdata = {
                id: key,
                description: fetchedData[key].description,
                title: fetchedData[key].title,
                pageColor: fetchedData[key].pageColor,
                textColor: fetchedData[key].textColor,
                textFont: fetchedData[key].textFont,
            }
            allTasks.push(Newdata);
        }

        dispatch({
            type: stillFetching,
            isFetching: false
        })

        dispatch({
            type: FetchData,
            tasks: allTasks
        })
    }
}