import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import React, {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserProfileScreen from '../ProfileScreen/ProfileScreen';
import FavoriteScreen from '../FavriouteScreen/FavriouteScreen';
import { NavigationContainer } from '@react-navigation/native';
import AddPropertyScreen from '../AddProperty/Addproperty';

const Tab = createBottomTabNavigator();
const HomeScreen = () => {
  return (

  <Tab.Navigator screenOptions={{
    headerShown: false,
    "tabBarShowLabel": false,
    "tabBarStyle": [
      {
        "backgroundColor":'#9bbad1',
        "elevation":0,
        "borderRadius":15,
        "alignItems":'center',
        "justifyContent":'center'
      },
    ]
  }} initialRouteName='home'>
    <Tab.Screen name ={"home"} component={Header} options={{
      tabBarIcon:({focused})=>(
        <View style={{alignItems:'center',justifyContent:'center'}}>
             <Image
                 source={require('../../assets/search2.png')}
                 resizeMode='contain'
                 style={{
                  width:25,
                  height:25,
                  tintColor:focused? 'blue': '#454752'
                 }}
              />

        </View>
      )
    }}/>

<Tab.Screen name ={"like"} component={FavoriteScreen} options={{
      tabBarIcon:({focused})=>(
        <View style={{alignItems:'center',justifyContent:'center'}}>
             <Image
                 source={require('../../assets/heart.png')}
                 resizeMode='contain'
                 style={{
                  width:28,
                  height:28,
                  tintColor:focused? 'blue': '#454752'
                 }}
              />
        </View>
      )
    }}/>
    <Tab.Screen name ={"add"} component={AddPropertyScreen} options={{
      tabBarIcon:({focused})=>(
        <View style={{alignItems:'center',justifyContent:'center'}}>
             <Image
                 source={require('../../assets/new.png')}
                 resizeMode='contain'
                 style={{
                  width:30,
                  height:30,
                  tintColor:focused? 'blue': '#454752'
                 }}
              />

        </View>
      )
    }}/>

    <Tab.Screen name={'profile'} component={UserProfileScreen} options={{
      tabBarIcon:({focused})=>(
        <View style={{alignItems:'center',justifyContent:'center'}}>
             <Image
                  source={{
                    uri: 'https://www.iconpacks.net/icons/2/free-icon-user-4250.png',
                  }}
                 resizeMode='contain'
                 style={{
                  width:30,
                  height:30,
                  tintColor:focused? 'blue': '#454752'
                 }}
              />

        </View>
      )
    }}/>

  </Tab.Navigator>

  );
  
};

export default HomeScreen;


