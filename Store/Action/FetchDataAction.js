export const FetchData = 'FetchData';

export const FetchAction = () =>{
    return async dispatch =>{
        /*fetch function by default calls the GET method, so we don't need to declare the GET method. And we also don't need to
        declare the headers here */
        const response = await fetch('https://todo-d13e8-default-rtdb.firebaseio.com/todos.json');
        const fetchedData = await response.json();
        const allTasks = [];
        for (key in fetchedData){
            const Newdata = {
                id: key,
                description: fetchedData[key].description,
                title: fetchedData[key].title
            }
            allTasks.push(Newdata);
        }

        dispatch({
            type: FetchData,
            tasks: allTasks
        })
    }
}