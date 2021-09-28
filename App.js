import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNav from './Navigators/MainNav';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import AddReducer from './Store/Reducer/AddReducer';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  allTask: AddReducer,
})
const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  
  return (
    <Provider store={store}>
      <MainNav />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
