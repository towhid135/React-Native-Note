import React,{useState} from 'react';
import { StyleSheet, LogBox } from 'react-native';
import MainNav from './Navigators/MainNav';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import AddReducer from './Store/Reducer/AddReducer';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import AuthReducer from './Store/Reducer/AuthReducer';

//ignore warning
LogBox.ignoreLogs(['Setting a timer']);

const fetchFont = () =>{
  return Font.loadAsync({
    'GemunuLibreLight': require('./assets/Fonts/Gemunu/GemunuLibre-Light.ttf'),
    'GemunuLibreRegular': require('./assets/Fonts/Gemunu/GemunuLibre-Regular.ttf'),
    'MontserratBold': require('./assets/Fonts/Montserrat/Montserrat-Bold.ttf'),
    'MontserratBoldItalic': require('./assets/Fonts/Montserrat/Montserrat-BoldItalic.ttf'),
    'MontserratExtraLight': require('./assets/Fonts/Montserrat/Montserrat-ExtraLight.ttf'),
    'MontserratExtraLightItalic': require('./assets/Fonts/Montserrat/Montserrat-ExtraLightItalic.ttf'),
    'MontserratItalic': require('./assets/Fonts/Montserrat/Montserrat-Italic.ttf'),
    'MontserratLight': require('./assets/Fonts/Montserrat/Montserrat-Light.ttf'),

    'Comforter': require('./assets/Fonts/Mixed_Font/Comforter-Regular.ttf'),
    'Inconsolata': require('./assets/Fonts/Mixed_Font/Inconsolata-Medium.ttf'),
    'BebasNeue': require('./assets/Fonts/Mixed_Font/BebasNeue-Regular.ttf'),
    'JosefinSans': require('./assets/Fonts/Mixed_Font/JosefinSans-Medium.ttf'),
    'DancingScript': require('./assets/Fonts/Mixed_Font/DancingScript-Medium.ttf'),
    'Pacifico': require('./assets/Fonts/Mixed_Font/Pacifico-Regular.ttf'),
    'IndieFlower': require('./assets/Fonts/Mixed_Font/IndieFlower-Regular.ttf'),

    'বেনসেন': require('./assets/Fonts/BanglaFont/BenSenHandwriting.ttf'),
    'চন্দ্রাবতী': require('./assets/Fonts/BanglaFont/ChandrabatiOMJ.ttf'),
    'করতোয়া': require('./assets/Fonts/BanglaFont/Korotoa.ttf'),
    
     
  })
}

const rootReducer = combineReducers({
  allTask: AddReducer,
  userInfo: AuthReducer
})
const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  const [fontFlag,setFontFlag] = useState(false);
  if(!fontFlag){
    return <AppLoading 
             startAsync = {fetchFont}
             onFinish = {() => setFontFlag(true)}
             onError = {(err) => console.log(err)}
          />
  }
  
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
