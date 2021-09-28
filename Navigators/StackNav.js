import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import AddScreen from "../Screens/AddScreen";

const StackNav = props => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
             />
             <Stack.Screen 
              name = "Add"
              component={AddScreen}
             />
        </Stack.Navigator>
    );
}

export default StackNav;