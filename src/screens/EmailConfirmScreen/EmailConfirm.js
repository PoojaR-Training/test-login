import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView,TextInput} from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
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
    <View>
      <ScrollView>
        <Text style={styles.txt}>Confirm Email</Text>
        <Controller
            control={control}
            rules={{
              required: 'Code is required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Enter Secure Code"
                name="code"
                style={styles.container}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="username"
          />
          {errors.code && (
            <Text style={styles.error}>{errors.code.message}</Text>
          )}
    
       <CustomButton onPress={handleSubmit(onResendCodePress)} txt="Submit" types={`SECONDARY`} />
       
       
        <CustomButton
          onPress={onSignInPress}
          txt="Back to Sign In "
          types={`TERTIARY`}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  txt: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    color: '#042675',
  },
  text: {
    color: 'gray',
    marginVertical: 10,
    marginLeft: 10,
  },
  link: {
    color: '#FDB075',
    textDecorationLine: 'underline',
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
export default EmailConfirm;
