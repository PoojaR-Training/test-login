import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native'
import { useLogin } from '../../context/LoginProvider';

const HomeScreen = () => {
  const {isLoggedIn, setIsLoggedIn} = useLogin()
  const navigation = useNavigation()
  async function checkToken()  {
    try {
      const token = await AsyncStorage.getItem('token');
      if(token){
        setIsLoggedIn(true)
      }
      else{
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  
 const clearAsyncStorage = async() => {
   await AsyncStorage.removeItem('token')
    const saved = await AsyncStorage.getItem('token');
    console.log("Token remove",saved);
    checkToken();
    isLoggedIn ? null : navigation.navigate('SignIn')

}
  return (
    <View>
      <Text style={style.txt}>Application start page</Text>
      <Button title='clear' onPress={clearAsyncStorage}/>
     
    </View>
  );
};
const style = StyleSheet.create(
  {
    txt:{
      fontSize: 30,
      fontWeight: 'bold',
      margin  : 20,
      textAlign: 'center'
    }
  }
)


export default HomeScreen;
