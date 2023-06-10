import React, { useEffect, useState } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useRoute } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Owner = () => {
  const [image, setImage] = useState();
  const [imageEmpty, setImageEmpty] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [loading, setLoading] = useState(false); // Loading state
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const route = useRoute();
  const arr = route.params.arr;
  console.log(arr, 'route');

  const navigate = async (data) => {
    try {
      if (image) {
        arr.push({ ownerimage: image });
        arr.push({ ownername: name });
        arr.push({ ownercontact: contact });
        arr.push({ owneremail: email });
        console.log(arr, 'data');
        setLoading(true); // Start loading

        await postData(arr);

        setImageEmpty(false);
      } else {
        setImageEmpty(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const postData = async (arr) => {
    try {
      let ownerid = await AsyncStorage.getItem('id');
      console.log(ownerid);
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        `http://192.168.200.136:8000/property/postproperty/${ownerid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(arr),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.error) {
        // Alert.alert('Error','Something went wrong Please try again')
        console.log('errors.....');
      } else {
        Alert.alert('Success', 'Success');
        navigation.navigate('Home');
        console.log('successssss');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imagePick = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then((image) => {
          console.log('img', image);
          setImage(image.path);
        })
        .catch((error) => {
          Alert.alert('Try again', 'Image selection cancelled');
          console.log('Image selection cancelled');
        });
    } catch (err) {
      console.log(err);
      Alert.alert('Try again', 'Profile image not updated');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#9bbad1' }}>
      <View style={{ backgroundColor: '#9bbad1', marginTop: windowHeight / 20 }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            margin: 10,
          }}
        >
          Add Your Property on Rent
        </Text>
      </View>
      <ScrollView style={{ backgroundColor: '#dce3e8', flex: 1 }}>
        <View style={{ flex: 1, margin: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
            Add Property Owner Details
          </Text>
        </View>
        <View style={{ backgroundColor: '#dce3e8', flex: 1 }}>
          {imageEmpty && <Text style={styles.error}>*Owner Image is required</Text>}
          <TouchableOpacity onPress={imagePick}>
            <Image
              source={image ? { uri: image } : require('../../assets/person.jpg')}
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
                value: /^[A-Za-z\s]+$/,
                message: 'Invalid name',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter Name Of Property Owner"
                name="ownername"
                value={value}
                onChangeText={(text) => {
                  setName(text);
                  onChange(text);
                }}
                style={styles.txtbox}
              />
            )}
            name="ownername"
          />
          {errors.ownername && <Text style={styles.error}>{errors.ownername.message}</Text>}

          <Controller
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter Email Of Property Owner"
                name="owneremail"
                value={value}
                keyboardType="email-address"
                style={styles.txtbox}
                onChangeText={(text) => {
                  onChange(text);
                  setEmail(text);
                }}
              />
            )}
            name="owneremail"
          />
          {errors.owneremail && <Text style={styles.error}>{errors.owneremail.message}</Text>}
          <Controller
            control={control}
            rules={{
              required: 'Contact is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Invalid contact number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter Contact Number Of Property Owner"
                name="ownercontact"
                value={value}
                keyboardType="phone-pad"
                style={styles.txtbox}
                onChangeText={(text) => {
                  onChange(text);
                  setContact(text);
                }}
              />
            )}
            name="ownercontact"
          />
          {errors.ownercontact && <Text style={styles.error}>{errors.ownercontact.message}</Text>}

          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={handleSubmit((data) => navigate(data))}
          >
            <Text style={styles.signintxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}
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
  loaderContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Owner;
