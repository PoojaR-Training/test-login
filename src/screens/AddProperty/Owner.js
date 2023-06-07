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
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
const Owner = () => {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const route = useRoute();
  const arr = route.params.arr;
  console.log(arr, 'route');
  const navigate =()=>{
    navigation.navigate('Images')
  }
  const imagePick = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          console.log('img', image);
          setImage(image.path);
        })
        .catch(error => {
          Alert.alert('Try again', 'Image selection cancelled');
          console.log('Image selection cancelled');
        });
    } catch (err) {
      console.log(err);
      Alert.alert('Try again', 'Profile image not updated');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#9bbad1'}}>
      <View style={{backgroundColor: '#9bbad1', marginTop: windowHeight / 20}}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            margin: 10,
          }}>
          Add Your Property on Rent
        </Text>
      </View>
      <ScrollView style={{backgroundColor: '#dce3e8', flex: 1}}>
        <View style={{flex: 1, margin: 15}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
            Add Property Owner Details
          </Text>
        </View>
        <View style={{backgroundColor: '#dce3e8', flex: 1}}>
          <TouchableOpacity onPress={imagePick}>
            <Image
              source={image ? {uri: image} : require('../../assets/person.jpg')}
              style={{
                height: 150,
                width: 150,
                borderRadius: 999,
                borderColor: 'black',
                borderWidth: 2,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          <Controller
            control={control}
            rules={{
              required: 'Name is required',
              pattern: {
                value: /^[a-zA-Z][a-zA-Z\\s]/,
                message: 'Invalid Name',
              },
            }}
            render={({field: {value, onChange}}) => (
              <TextInput
                placeholder="Enter Name Of Property Owner"
                name="name"
                value={value}
                onChangeText={text => {
                  onChange(text);
                  setName(text);
                }}
                style={styles.txtbox}
              />
            )}
            name="name"
          />

          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: 'Emai; is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid Email',
              },
            }}
            render={({field: {value, onChange}}) => (
              <TextInput
                placeholder="Enter Email Of Property Owner"
                name="email"
                keyboardType="email-address"
                style={styles.txtbox}
                value={value}
                onChangeText={text => {
                  onChange(text);
                  setEmail(text);
                }}
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
              required: 'Contact is required',
              pattern: {
                value:  /^\d+$/,
                message: 'Invalid Contact',
              },
            }}
            render={({field: {value, onChange}}) => (
              <TextInput
                placeholder="Enter Contact Number Of Property Owner"
                name="contact"
                keyboardType="phone-pad"
                style={styles.txtbox}
                value={value}
                onChangeText={text => {
                  onChange(text);
                  setContact(text);
                }}
              />
            )}
            name="contact"
          />

          {errors.contact && (
            <Text style={styles.error}>{errors.contact.message}</Text>
          )}

          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={ handleSubmit(navigate)}>
            <Text style={styles.signintxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  txtbox: {
    height: 55,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
  },
  txt: {
    margin: 12,
    borderColor: 'white',
    color: 'gray',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 16,
    marginTop: '30%',
  },
  txtmultiline: {
    height: 70,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
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
export default Owner;
