import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
 TextInput,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../../context/LoginProvider';

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
    navigation.navigate('SignUp');
  };
  const onForgetPress = () => {
    navigation.navigate('Forget');
  };

  async function checkToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onSignInPress = async data => {
    try {
      console.log(data);
      const response = await fetch('http://192.168.200.136:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.error) {
        Alert.alert('Try again', 'Invalid Username or Password');
      } else {
        try {
          await AsyncStorage.setItem('token', result.token);
          await AsyncStorage.setItem('id', result.user._id);
          const saved = await AsyncStorage.getItem('token');
          console.log('gtoken saved', saved);
          const id = await AsyncStorage.getItem('id');
          console.log('id save: ', id);
          checkToken();

          isLoggedIn ? navigation.navigate('Home') : null;
          console.log(isLoggedIn);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d5e0e8'}}>
      <View style={styles.container}>
        <View style={styles.view1}>
          <Text style={styles.heading1}>Welcome back </Text>
        </View>
        <View style={styles.view2}>
          <Controller
            control={control}
            rules={{
              required: 'Username is required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Username"
                name="username"
                style={styles.email}
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
                secureTextEntry={true}
                name="password"
                style={styles.email}
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
          
          <TouchableOpacity onPress={onForgetPress}>
            <Text style={styles.fogPw}>Forgot Password?</Text>
          </TouchableOpacity>
         

          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={handleSubmit(onSignInPress)}>
            <Text style={styles.signintxt}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={{bottom: '-2%'}}>
          <TouchableOpacity onPress={onSignUpPress}>
          <Text style={{textAlign: 'center', fontSize:16}}>
            Not a member? <Text style={{color: '#1580FF', fontSize:16}}>Register here</Text>{' '}
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    paddingVertical: '11%',
    paddingHorizontal: '4%',

  },
  view1: {
    flex: 1,
 
    top: '12%',
  },
  view2: {
    flex: 2,
    bottom: '7%',
  },
  heading1: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  para1: {
    fontSize: 18,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: '20%',
    top: 3,
    backgroundColor:'red'
  },
  email: {
    height: 55,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  
  },
  fogPw: {
    textAlign: 'right',
    right: 14,
    top: 2,
    color: 'grey',
    fontWeight:'bold',
  },
  buttonstyle: {
    borderRadius: 10,
    height: 55,
    margin: 12,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
  },

  signintxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginLeft: 12,
  },
});

export default SignInScreen;
