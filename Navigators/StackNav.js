import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import AddScreen from "../Screens/AddScreen";
import TaskViewScreen from "../Screens/TaskViewScreen";
import EditScreen from "../Screens/EditScreen";

const StackNav = props => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title:'Task Lists'}}
             />
             <Stack.Screen 
              name = "Add"
              component={AddScreen}
             />
    
            <Stack.Screen 
            name = 'singleTaskViewScreen'
            component={TaskViewScreen}
            options={{title:'Your Task'}}
            />
            <Stack.Screen 
             name = 'EditScreen'
             component={EditScreen}
             options={{title:"Edit Task"}}
            />
            
        </Stack.Navigator>
    );
}

export default StackNav;