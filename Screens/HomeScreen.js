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
import {Wave} from 'react-native-animated-spinkit'


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
        const task = (
        <TouchComponent
             onPress={()=> props.navigation.navigate({name:'Add',params:{
                 taskId: itemData.item.id,
                 viewMode: true,
                }})}
             activeOpacity={0.9}
             >
        <ViewItem 
            style={styles.ViewItemStyle} 
            textStyle={styles.viewItemText}
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
        borderColor: Color.lightNaviBlue,
        backgroundColor: Color.lightNaviBlue,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: {width:0,height:0.5},
        shadowRadius: 5,
        elevation: 7,
    },
    viewItemText:{
        fontWeight: 'bold',
        color: 'white'
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