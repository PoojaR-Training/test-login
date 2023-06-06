import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView,TextInput,Image,TouchableOpacity,SafeAreaView} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { Controller,useForm } from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
const EmailConfirm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userId=route.params.id;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onResendCodePress = () => {
    navigation.navigate('NewPassword',{
      userId,
    })
  };
  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d5e0e8'}}>
    <View style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.heading1}>Confirm Email </Text>
      </View>
      <View style={styles.view2}>
        <Controller
            control={control}
            rules={{
              required: 'Code is required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Enter Secure Code"
                name="code"
                style={styles.email}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="code"
          />
          {errors.code && (
            <Text style={styles.error}>{errors.code.message}</Text>
          )}
    
  
    <TouchableOpacity
            style={styles.buttonstyle}
            onPress={handleSubmit(onResendCodePress)}>
            <Text style={styles.signintxt}>Submit</Text>
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
export default EmailConfirm;
