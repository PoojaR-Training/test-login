import React, {useEffect, useState} from 'react';
import {Image, Text, View, useWindowDimensions, StyleSheet, ScrollView,TextInput, Alert} from 'react-native';
import Logo from '../../../assest/images/logo.png';
import {useNavigation} from '@react-navigation/native'
import CustomButton from '../../components/CustomButton/CustomButton';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/LoginProvider';

const SignInScreen = () => {
  const navigation = useNavigation();
  const {height} = useWindowDimensions();
  const {isLoggedIn, setIsLoggedIn} = useLogin();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignUpPress = () => {
    navigation.navigate('SignUp')
  };
  const onForgetPress = () => {
    navigation.navigate('Forget')
  };
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
  const onSignInPress = async data => {
    try {
      const response = await fetch(
        'http://192.168.200.136:8000/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (result.error) {
       Alert.alert("Try again", "Invalid Username or Password")
      }
      else{
        try{
        await AsyncStorage.setItem('token', result.token);
        const saved = await AsyncStorage.getItem('token');
        console.log("Token save: ",saved);
        checkToken();
        isLoggedIn ? navigation.navigate('Home'):null
        console.log(isLoggedIn);
        }
        catch(error){
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>      
      <ScrollView>
      <Image
        source={Logo}
        resizeMode="contain"
        style={[styles.logo, {height: height * 0.3}]}
      />
          <Controller
            control={control}
            rules={{
              required: 'Username is required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Username"
                name="username"
                style={styles.container}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="username"
          />
          {errors.username && (
            <Text style={styles.error}>{errors.username.message}</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: 'Password is required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Password"
                secureTextEntry={false}
                name="password"
                style={styles.container}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
      <CustomButton
        onPress={handleSubmit(onSignInPress)}
        txt="Sign In"
        types={`PRIMARY`}
        style= {styles.container}
      />
      <CustomButton
        txt="Forget Password?"
        types={`TERTIARY`}
        onPress={onForgetPress}
      />
      <CustomButton
        onPress={onSignUpPress}
        types={'TERTIARY'}
        txt="Don't have a Account? SIGN UP"
      />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: '70%',
    alignSelf: 'center',
  },
  container :{
    width : '90%',
    height : 50,
    justifyContent : 'center',
    marginLeft : 10,
    marginVertical : 10,
    paddingHorizontal:10,
    backgroundColor : 'white',
    borderColor : 'black',
    borderWidth  :1,
    borderRadius : 5
 },
 error: {
  color:'red',
  marginLeft: 8,

},

});

export default SignInScreen
