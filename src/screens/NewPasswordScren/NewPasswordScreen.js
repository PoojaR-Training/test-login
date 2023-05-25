import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView,TextInput,Alert} from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
const NewPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userId=route.params.id;
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();
  const pwd= watch('password')
 const onSignInPress =()=>{
  navigation.navigate('SignIn');
 }
  const onSendPress = async data => {
    try {
      console.log(userId);
      const response = await fetch(`http://192.168.200.136:8000/forgot/resetpassword/${userId}`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log(result);
     if (result.error) {
        Alert.alert('Try again', 'Something went wrong');
      } else {
      Alert.alert('Success', 'Please Login with your credentials to continue');
      navigation.navigate('SignIn');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex:1}}>
    <View style={{flex:0.35,backgroundColor:"#d5e0e8"}}>

</View>
<View style={{backgroundColor:"#9bbad1", flex:1,borderTopRightRadius:20, borderTopLeftRadius:20}}>
      <ScrollView>
        <Text style={styles.txt}>Reset Your Password</Text>
        <Controller
            control={control}
            rules={{
              required: 'Password is required',
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: 'Invalid password',
              },
            }
          }
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Enter Password"
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

          <Controller
            control={control}
            rules={{
              required: 'Password is required',
              validate: value => value === pwd || 'Password does not match'
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={false}
                name="confirmPassword"
                style={styles.container}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword.message}</Text>
          )}
        <CustomButton
          onPress={handleSubmit(onSendPress)}
          txt="Submit"
          types={`PRIMARY`}
        />
        <CustomButton
          onPress={onSignInPress}
          txt="Back to Sign In "
          types={`TERTIARY`}
        />
      </ScrollView>
      </View>
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
  container: {
    width: '90%',
    height: 50,
    marginTop:10,
    marginBottom:10,
    marginLeft:20,
    marginRight:20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
 error: {
  color:'red',
  marginLeft: 8,

},
});
export default NewPasswordScreen;
