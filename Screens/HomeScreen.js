import React,{useEffect} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    FlatList,
    ActivityIndicator,
} 
from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Color from '../Constants/Color';
import ViewItem from '../Component/UI/ViewItem';
import {useSelector,useDispatch} from 'react-redux';
import { FetchAction } from '../Store/Action/FetchDataAction';
import AddButton from '../Component/UI/AddButton';
import {Wave} from 'react-native-animated-spinkit';
import { EditSettingsAction } from '../Store/Action/SettingsAction';


const HomeScreen = props => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(FetchAction())
    },[dispatch])

    const viewListItem = itemData =>{
        let TouchComponent = TouchableOpacity;
        /*if(Platform.OS === 'android' && Platform.Version >= 21){
            TouchComponent = TouchableNativeFeedback;
        }*/
        const onTaskSelect = (selectedTask) =>{
            console.log('homescreen ontaskselect', selectedTask.textFont);
            const colorObj = {
                pageColor: selectedTask.pageColor,
                textColor: selectedTask.textColor,
                textFont: selectedTask.textFont
            }
            dispatch(EditSettingsAction(colorObj));

            props.navigation.navigate({name:'Add',params:{
                taskId: selectedTask.id,
                viewMode: true,
               }})
        }
        const task = (
        <TouchComponent
             onPress={onTaskSelect.bind(this,itemData.item)}
             activeOpacity={0.9}
             >
        <ViewItem 
            style={{
                ...styles.ViewItemStyle,
                backgroundColor:itemData.item.pageColor,
                borderColor: itemData.item.pageColor
            }} 
            textStyle={{color:itemData.item.textColor,fontFamily: itemData.item.textFont}}
        >
        {itemData.item.title}
        </ViewItem>
        </TouchComponent>
        )
       const keyListArray = Object.keys(itemData)
        return(
          task
        )
    }

    
    

    const taskLists = useSelector((state) => state.allTask.tasks);
    const isFetching = useSelector((state) => state.allTask.isStillFetching)
    const length = taskLists.length;
    //console.log('from home',taskLists);
    //add button


    return (
       
       <View style={styles.container}>
               { (isFetching && length===0 ) && 
                      <View style = {styles.ActivityIndicatorView}  > 
                          <Wave color='green' size={58} />
                      </View>
               }
               {
                   (length === 0 && !isFetching ) && 
                   <View style={styles.warningView}>
                       <View style={styles.warningTextView}>

                       <Text style={styles.warningTextStyle}>No task available! please add some</Text>
                       </View>

                       <AddButton route = {() =>
                       props.navigation.navigate({name:'Add',params:{addMode:true}})
                    } />

                    </View>
               }
              {length>0 && <View style={{flex:1}}>
                    <View style={styles.list}>
                    <FlatList
                        data = {taskLists}
                        keyExtractor = {(item)=> item.id}
                        renderItem = {viewListItem}
                    />
                    </View>
                    <AddButton route = {() =>
                       props.navigation.navigate({name:'Add',params:{addMode:true}})
                    } />
                    
           </View>
           } 

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
    textStyle:{
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid'
    },
    ViewItemStyle:{
        borderWidth: 1,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: {width:0,height:0.5},
        shadowRadius: 5,
        elevation: 7,
    },
    ActivityIndicatorView:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',

    },
    warningView:{
        flex: 1,
    },
    warningTextStyle:{
        fontSize: 20,
        color: 'red',
    },
    warningTextView:{
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default HomeScreen;