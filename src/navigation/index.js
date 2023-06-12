import React, { useEffect, useState } from 'react';
import { View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardScreen from '../screens/OnBoardScreen/OnBoardScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen/ForgetPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScren/NewPasswordScreen';
import EmailConfirmScreen from '../screens/EmailConfirmScreen/EmailConfirm';
import DetailHomeScreen1 from '../screens/DetailHomeScreen/DetailHomeScreen1';
import PropertDetails from '../screens/PropertyDetails/PropertyDetails1/PropertyDetails';
import Property from '../screens/AddProperty/Property';
import Images from '../screens/AddProperty/Images'
import Facility from '../screens/AddProperty/Facilty';
import Owner from '../screens/AddProperty/Owner';
import ManageProperty from '../screens/ManageProperty/ManageProperty';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../context/LoginProvider';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        setIsLoading(false); // Mark loading as complete
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Mark loading as complete even if there was an error
      }
    };

    checkToken();
  }, []);


  if (isLoading) {
    return (
      <View >
        <Text>Loading...</Text>
      </View>
    );
  }

  return isLoggedIn ? <HomeNavigator /> : <LoginNavigator />;
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
      <Stack.Screen name= "DetailHome" component={DetailHomeScreen1} />
      <Stack.Screen name="PropertyDetails" component={PropertDetails}/>
      <Stack.Screen name='Property' component={Property} />
      <Stack.Screen name="Images" component={Images}/>
     <Stack.Screen name="Facility" component={Facility} />
     <Stack.Screen name="Owner" component={Owner} />
     <Stack.Screen name="Manage" component={ManageProperty} />
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