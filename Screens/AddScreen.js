import React,{useLayoutEffect,useState} from 'react';
import {View,StyleSheet,FlatList} from 'react-native';
import InputItem from '../Component/UI/InputItem';
import CustomHeaderButton from '../Component/UI/CustomHeaderButton';
import {HeaderButton, HeaderButtons,Item} from 'react-navigation-header-buttons';
import {useSelector,useDispatch} from 'react-redux';
import { AddAction } from '../Store/Action/AddAction';

const AddScreen = props => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const dispatch = useDispatch();

    const titleChangeHandler = text =>{
        setTitle(text);
    }
    const descriptionChangeHandler = text =>{
        setDescription(text);
    }

    const submitHandler = () =>{
        dispatch(AddAction({title:title,description:description}))
        props.navigation.goBack();
    }
    useLayoutEffect(()=>{
        props.navigation.setOptions({
            headerRight: () =>{
                return(
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item 
                         name = 'save-button'
                         iconName = 'md-save'
                         iconSize = {32}
                         color = 'black'
                         onPress = {submitHandler}
                        />
                    </HeaderButtons>
                )
            }
        })
    })


    return (
        <View>
            <InputItem 
            title={title} 
            description={description} 
            titleChange={titleChangeHandler} 
            desChange={descriptionChangeHandler} 
            />
        </View>
    );
}

const styles = StyleSheet.create({

})

export default AddScreen;