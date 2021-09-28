import React,{useEffect} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    FlatList
} 
from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Color from '../Constants/Color';
import ViewItem from '../Component/UI/ViewItem';
import {useSelector,useDispatch} from 'react-redux';
import { FetchAction } from '../Store/Action/FetchDataAction';

const renderListItem = itemData =>{

}

const HomeScreen = props => {

    let TouchComponent = TouchableOpacity;
    if(Platform.OS==='android' && Platform.Version >= 21)
    {
        TouchComponent = TouchableNativeFeedback;
    }
    const taskLists = useSelector((state) => state.allTask.tasks)
    //console.log('from home',taskLists);
    return (
        <View style={styles.container}>
            <View style={styles.list}>
            <FlatList
                 data = {taskLists}
                 keyExtractor = {(item)=> item.id}
                 renderItem = {(itemData) => <Text>{itemData.item.title}</Text>}
            />
            </View>

            <View style={styles.addButton} >
            <View style={styles.touchView}>
                <TouchComponent 
                onPress={() => props.navigation.navigate('Add')} 
                background={TouchableNativeFeedback.Ripple()}
                >
                <View style={styles.roundRipple}>
                   <Ionicons name="md-add" size={80} color={Color.lightGreen} />
                </View>
                </TouchComponent>
            </View>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "column"
    },
    list: {
        flex:6,
    },
    addButton:{
        flex:1,
        alignItems:'flex-end',
    },
    touchView:{
        borderRadius: 40,
        overflow: 'hidden',
        width: 80,
        height: 80
    },
    textStyle:{
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid'
    }
})

export default HomeScreen;