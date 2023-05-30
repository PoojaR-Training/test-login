import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView,TextInput,Alert,Image,TouchableOpacity} from 'react-native';
import CustomButton from '../../components/CustomButton';
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
    <Image
          source={{
            uri: 'https://cdn3.iconfinder.com/data/icons/rental-property-filloutline/64/BROKER-real_estate-broker-housin-price-marketing-64.png',
          }}
          style={styles.img}
        />
</View>
<View style={{backgroundColor:"#9bbad1", flex:1,borderTopRightRadius:20, borderTopLeftRadius:20}}>
      <ScrollView>
        <View style={{marginTop:50}}>
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
        <TouchableOpacity
              style={styles.btncontainer}
              onPress={handleSubmit(onSendPress)}>
              <Text style={styles.byntxt}>SUBMIT</Text>
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
    marginTop:10,
    marginBottom:10,
    marginLeft:20,
    marginRight:20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    fontSize :15
  },
 error: {
  color:'red',
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
export default NewPasswordScreen;
