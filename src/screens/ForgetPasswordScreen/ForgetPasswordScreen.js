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
} from 'react-native';

import CustomButton from '../../components/CustomButton/CustomButton';
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
    <View style={{flex: 1}}>
      <View style={{flex: 0.35, backgroundColor: '#d5e0e8'}}>
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
          <View style={{marginTop: 50}}>
            <Text style={styles.txt}>Comfirm Account</Text>
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
                required: 'Email is required',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="Enter Registered Email"
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

            <TouchableOpacity
              style={styles.btncontainer}
              onPress={handleSubmit(onSendPress)}>
              <Text style={styles.byntxt}>SEND CODE</Text>
            </TouchableOpacity>
            <CustomButton
              onPress={onSignInPress}
              txt="Back to Sign In "
              types={`TERTIARY`}
            />
          </View>
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
    color: 'black',
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
    height: 55,
    marginTop: 10,
    marginBottom: 10,
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
    height: '40%',
    width: '30%',
    marginTop: 50,
    marginLeft: 140,
    overflow: 'visible',
  },
  byntxt: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btncontainer: {
    backgroundColor: 'black',
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
});
export default ForgetPasswordScreen;
