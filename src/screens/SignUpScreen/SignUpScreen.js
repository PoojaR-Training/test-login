import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import {useForm, Controller} from 'react-hook-form';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();
  const pwd = watch('password');
  const onSignUpPress = () => {
    navigation.navigate('SignIn');
  };
  const onForget = () => {
    navigation.navigate('Forget');
  };
  const onSubmit = async data => {
    try {
      const response = await fetch(
        'http://192.168.200.136:8000/users/register',
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
        Alert.alert('Try again', 'Username already registered');
      } else {
        navigation.navigate('SignIn');
        Alert.alert(
          'Registration Success',
          'Please Login with your credentials to continue',
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d5e0e8'}}>
      <View style={styles.container}>
        <View style={styles.view1}>
          <Text style={styles.heading1}>Registration</Text>
        </View>
        <View style={styles.view2}>
          <Controller
            control={control}
            rules={{
              required: 'Username is required',
              pattern: {
                value: /^[A-Za-z0-9_-]*$/,
                message: 'Invalid username',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Username"
                name="username"
                style={styles.txtbox}
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
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Email"
                name="email"
                style={styles.txtbox}
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
                placeholder="Password"
                secureTextEntry={true}
                name="password"
                style={styles.txtbox}
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
              required: 'Confirm Password is required',
              validate: value => value === pwd || 'Password does not match',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={true}
                name="confirmPassword"
                style={styles.txtbox}
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

          <Controller
            control={control}
            rules={{
              required: 'Contact is required',
              pattern: {
                value: /^\d+$/,
                message: 'Invalid contact number',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Contact Number"
                name="contact"
                style={styles.txtbox}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                maxLength={10}
              />
            )}
            name="contact"
          />
          {errors.contact && (
            <Text style={styles.error}>{errors.contact.message}</Text>
          )}
          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.signintxt}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{bottom: '-1%'}}>
          <TouchableOpacity onPress={onSignUpPress}>
            <Text style={{textAlign: 'center', fontSize:16}}>
              Already have a account?{' '}
              <Text style={{color: '#1580FF', fontSize:16}}>Login here</Text>{' '}
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
    paddingVertical: '5%',
    paddingHorizontal: '4%',
  },
  view1: {
    flex: 1,
  },
  view2: {
    flex: 2,

    top: '-25%',
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
    backgroundColor: 'red',
  },
  txtbox: {
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
  },
  buttonstyle: {
    borderRadius: 10,
    height: 50,
    margin: 12,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    // top: 8,
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

export default SignUpScreen;
