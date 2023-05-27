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
  TouchableOpacity
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton/CustomButton';
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
          const saved = await AsyncStorage.getItem('token');
          console.log('Token save: ', saved);
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
    <SafeAreaView style={{flex: 1,backgroundColor: '#d5e0e8'}}>
      <View style={{flex: 0.35, }}>
        <Image
          source={{
            uri: 'https://cdn3.iconfinder.com/data/icons/rental-property-filloutline/64/BROKER-real_estate-broker-housin-price-marketing-64.png',
          }}
          style={styles.img}
        />
      </View>
      <View
        style={{
          backgroundColor: '#9bbad1',
          flex: 1,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <ScrollView>
          <View style={styles.item}>
          <Text style={styles.txt}>Welcome Back</Text>
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
          

            <TouchableOpacity style={styles.btncontainer} onPress={handleSubmit(onSignInPress)}>
            <Text style={styles.byntxt}>SIGN IN</Text>
            </TouchableOpacity>
         
        
          <CustomButton
            onPress={onSignUpPress}
            types={'TERTIARY'}
            txt="Don't have a Account? SIGN UP"
          />
            <CustomButton
            txt="Forget Password?"
            types={`TERTIARY`}
            onPress={onForgetPress}
          />
         </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  txt: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    color: 'black',
  },
  container: {
    width: '90%',
    height: 55,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    fontSize :15
  },
  error: {
    color: 'red',
    marginLeft: 8,
  },
  img: {
    height: '70%',
    width: '30%',
    marginTop: 20,
    marginLeft: 155,
    overflow: 'visible',
  },

  byntxt:{
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  btncontainer:{
    backgroundColor :"black",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    height: 60,
    width: '90%',
    borderRadius: 20,
    padding: 5,
    marginTop: 20,
  },
  item:{
    marginTop: 50,
  },
  
});

export default SignInScreen;
