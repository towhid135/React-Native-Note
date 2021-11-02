import React,{useEffect,useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    FlatList,
    ActivityIndicator,
    LayoutAnimation,
    UIManager,
    Image,
    Dimensions
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
import FontNames from '../Constants/FontNames';


const HomeScreen = props => {
    const userInfo = useSelector((state) => state.userInfo);
    const userId = userInfo.userId;
    const userName = userInfo.userName;

    //console.log('userName',props.route);
    const dispatch = useDispatch();
    useEffect(()=>{
        props.navigation.setOptions({
            title: userName+"'s Note",
            headerTitleStyle:{
                fontFamily: FontNames.MontserratBoldItalic
            }
        })
        dispatch(FetchAction(userId))
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

        //Delete animation function
        const onCheckTask = () =>{
            if (
                Platform.OS === "android" &&
                UIManager.setLayoutAnimationEnabledExperimental
              ) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
              }
              
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
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
                borderColor: itemData.item.pageColor,
                height: 50,
                width: "100%"
            }} 
            textStyle={{color:itemData.item.textColor,fontFamily: itemData.item.textFont}}
            taskId={itemData.item.id}
            deleteAnimation= {onCheckTask}
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
                       <View style={styles.imageView}> 
                           <Image 
                             source={require('../assets/Illustrations/addTask.png')}
                             style={styles.imageStyle}
                           />
                       </View>
                       <View style={styles.warningTextView}>

                       <Text style={styles.warningTextStyle}>Hey, 
                        <Text style={{color:Color.red}}> {userName}! </Text> 
                          please add some task.
                        </Text>
                       </View>

                       <AddButton route = {() =>
                       props.navigation.navigate({name:'Add',params:{addMode:true}})
                       } 
                       container={{
                           backgroundColor: "#fff",
                           borderTopColor: '#ccc',
                           borderTopWidth: 1,
                           borderBottomColor: '#ccc',
                           borderBottomWidth: 1,
                        }}
                       />

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
                       
                    }
                    container={{
                        backgroundColor: "#fff",
                        borderTopColor: '#ccc',
                        borderTopWidth: 1,
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                     }}
                     />
                    
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
        fontSize: 15,
        color: Color.darkSlate,
        fontFamily: FontNames.MontserratBoldItalic,
    },
    warningTextView:{
        flex: 2,
        alignItems: 'center',
        //backgroundColor: 'green'
    },
    imageView:{
        flex: 4,
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignItems: 'center',
        //backgroundColor: 'red',
    },
    imageStyle:{
        height: 150,
        width: '80%'
    }
})

export default HomeScreen;