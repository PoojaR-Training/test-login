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
            name="code"
          />
          {errors.code && (
            <Text style={styles.error}>{errors.code.message}</Text>
          )}
    
       <CustomButton onPress={handleSubmit(onResendCodePress)} txt="Submit" types={`PRIMARY`} />
       
       
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
img: {
  height: '40%',
  width: '30%',
  marginTop: 50,
  marginLeft: 140,
  overflow: 'visible',
},
});
export default EmailConfirm;
