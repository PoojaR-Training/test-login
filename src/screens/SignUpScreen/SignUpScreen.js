import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useForm, Controller} from 'react-hook-form';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();
  const pwd= watch('password')
  const onSignUpPress =()=>{
navigation.navigate('SignIn');
  }
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
        Alert.alert("Try again", "Username already registered")
       }
       else{
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
    <View style={{flex:1}}>
        <View style={{flex:0.35,backgroundColor:"#d5e0e8"}}>

</View>
<View style={{backgroundColor:"#9bbad1", flex:1,borderTopRightRadius:20, borderTopLeftRadius:20}}>
      <ScrollView>
        <Text style={styles.txt}>Create an Account</Text>
        <View>
          <Controller
            control={control}
            rules={{
              required: 'Username is required',
              pattern: {
                value: /^[A-Za-z][A-Za-z0-9_]{7,29}$/,
                message: 'Invalid username',
              },
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
                style={styles.container}
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
              required: 'Confirm Password is required',
              validate: value => value === pwd || 'Password does not match'
            }}

            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={true}
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
            
        <CustomButton onPress={handleSubmit(onSubmit)} txt="Register" types={`PRIMARY`}  />
        <CustomButton txt="Forget Password?" types={`TERTIARY`} />
        <CustomButton
          types={'TERTIARY'}
          txt="Do you already have an Account? Login"
          onPress={onSignUpPress}
        />

        </View>
      </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
  error: {
      color:'red',
      marginLeft: 8,

    },
});

export default SignUpScreen;