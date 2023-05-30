import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardScreen from '../screens/OnBoardScreen/OnBoardScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen/ForgetPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScren/NewPasswordScreen';
import EmailConfirmScreen from '../screens/EmailConfirmScreen/EmailConfirm';
import AddPropertyToRent from '../screens/AddPropertToRent/AddPropertyToRent';
import DetailHomeScreen1 from '../screens/DetailHomeScreen/DetailHomeScreen1';
import DetailHomeScreen2 from '../screens/DetailHomeScreen/DetailHomeScreen2';
import DetailHomeScreen3 from '../screens/DetailHomeScreen/DetailHomeScreen3';
import DetailHomeScreen4 from '../screens/DetailHomeScreen/DetailHomeScreen4';
import PropertDetails from '../screens/PropertyDetails/PropertyDetails1/PropertyDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../context/LoginProvider';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {isLoggedIn, setIsLoggedIn} = useLogin()
  
  useEffect(() => {
  const checkToken = async () => {
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

  checkToken();
}, []);
 return(
isLoggedIn ? <HomeNavigator/> :<LoginNavigator/>
 )

 
};

const HomeNavigator =()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={
        {
          headerShown: false,
        }
      }>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Add" component={AddPropertyToRent} />
      <Stack.Screen name= "DetailHome" component={DetailHomeScreen1} />
      <Stack.Screen name="DetailHome2" component={DetailHomeScreen2} />
      <Stack.Screen name="DetailHome3" component={DetailHomeScreen3} />
      <Stack.Screen name="PropertyDetails" component={PropertDetails}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const LoginNavigator =()=>{
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}> 
      <Stack.Screen name="OnBoard" component={OnBoardScreen}/>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Forget" component={ForgetPasswordScreen} />
      <Stack.Screen name="EmailConfirm" component={EmailConfirmScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigation;