import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
const NewPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params.id;
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();
  const pwd = watch('password');
  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };
  const onSendPress = async data => {
    try {
      console.log(userId);
      const response = await fetch(
        `http://192.168.200.136:8000/forgot/resetpassword/${userId}`,
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
        Alert.alert('Try again', 'Something went wrong');
      } else {
        Alert.alert(
          'Success',
          'Please Login with your credentials to continue',
        );
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d5e0e8'}}>
      <View style={styles.container}>
        <View style={styles.view1}>
          <Text style={styles.heading1}>Set New Password</Text>
        </View>
        <View style={styles.view2}>
          <Controller
            control={control}
            rules={{
              required: 'Password is required',
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: 'Invalid password',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Enter Password"
                name="password"
                style={styles.email}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={true}
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
              validate: value => value === pwd || 'Password does not match',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={true}
                name="confirmPassword"
                style={styles.email}
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
          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={handleSubmit(onSendPress)}>
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
export default NewPasswordScreen;
