import React,{useState} from "react";
import {View,Text,StyleSheet,CheckBox} from 'react-native';
import app from "../../fireBase/config";
import { useDispatch,useSelector } from "react-redux";
import { DeleteAction } from "../../Store/Action/DeleteAction";

const ViewItem = props => {
    const userId = useSelector((state) => state.userInfo.userId);
    const dispatch = useDispatch();
    const [isSelected,setSelection] = useState(false);
    const onSelect = () =>{
        setSelection(true);
        setTimeout(()=>{
            props.deleteAnimation();
            app.database().ref('/'+userId+'/todos/'+props.taskId).remove();
            dispatch(DeleteAction(props.taskId));
        },500);
        
    }
    return (
        <View style={styles.container} >
            <View  style={styles.CheckBoxView}>
                <CheckBox 
                   value={isSelected}
                   onValueChange={onSelect}
                />
            </View>

            <View style={{...styles.textStyle,...props.style}}>
            <Text style={props.textStyle}>{props.children}</Text>
            </View>
        </View > 
    );
}

const styles = StyleSheet.create({
    textStyle:{
        flex: 1,
        padding: 10,
        margin: 10,
    },
    container:{
        flex: 1,
        flexDirection: 'row'
    },
    CheckBoxView:{
        paddingTop: 20,
    },
})

export default ViewItem;