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
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
const ForgetPasswordScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSendPress = async data => {
    try {
      const response = await fetch(
        'http://192.168.200.136:8000/forgot/forgetpassword',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();
      console.log(result);

      if (result.error) {
        Alert.alert('Try again', 'Invalid Username or Email');
      } else {
        const id = result._id;
        navigation.navigate('EmailConfirm', {
          id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d5e0e8'}}>
    <View style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.heading1}>Confirm Account </Text>
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
                required: 'Email is required',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="Enter Registered Email"
                  name="email"
                  style={styles.email}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
    <TouchableOpacity
            style={styles.buttonstyle}
            onPress={handleSubmit(onSendPress)}>
            <Text style={styles.signintxt}>Send code</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSignInPress}>
            <Text style={styles.fogPw}>Back to SignIn</Text>
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
    alignSelf:'center',
    top: 30,
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
    top: 20,
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
export default ForgetPasswordScreen;
