import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/LoginProvider';

const UserProfileScreen = ({ navigation }) => {
  const [data, setData] = useState({ image: null });

  const { isLoggedIn, setIsLoggedIn } = useLogin();

  async function checkToken() {
    try {
      await AsyncStorage.removeItem('token');
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      if (isLoggedIn == false) {
        navigation.navigate('OnBoard');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getApiData = async () => {
    let id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');
    let result = await fetch(`http://192.168.200.136:8000/users/userbyid/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    result = await result.json();
    setData(result);
  };
 
  useEffect(() => {
    getApiData()
  }, []);
  const imagePick = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then((image) => {
          console.log('img', image);
          storeImage(image.path);
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

  const storeImage = async (image) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('calling storeImage', image);
      const id = await AsyncStorage.getItem('id');
      const data = new FormData();
      data.append('image', {
        uri: image,
        name: 'image.png',
        fileName: 'image',
        type: 'image/png',
      });
      const response = await fetch(
        `http://192.168.200.136:8000/users/userimage/image/${id}`,
        {
          method: 'put',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
          body: data,
        },
      );
      Alert.alert('Success', 'Profile image saved');
      setData(prevData => ({ ...prevData, image: image }));
    } catch (error) {
      console.log(error);
    }
  };

  const dbimg = data && data.image;
console.log(dbimg,"profile image saved");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#dce3e8',
      }}>
      <View style={{ width: '100%' }}>
        <TouchableOpacity onPress={imagePick}>
          <Image
            source={
              dbimg ? { uri: dbimg } : require('../../assets/person.jpg')
            }
            resizeMode="cover"
            style={{
              height: 160,
              width: '100%',
            }}
            blurRadius={12}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.15, alignItems: 'center' }}>
        <TouchableOpacity onPress={imagePick}>
          <Image
            source={
              dbimg ? { uri: dbimg } : require('../../assets/person.jpg')
            }
            style={{
              height: 130,
              width: 130,
              borderRadius: 999,
              borderColor: 'black',
              borderWidth: 2,
              marginTop: -90,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>User Name</Text>
          {data && <Text style={styles.name}>{data.username}</Text>}
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Email</Text>
          {data && <Text style={styles.name}>{data.email}</Text>}
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Contact</Text>
          {data && <Text style={styles.name}>{data.contact}</Text>}
        </View>

        <TouchableOpacity style={styles.btncontainer} onPress={checkToken}>
          <Text style={styles.byntxt}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btncontainer} >
          <Text style={styles.byntxt}>Manage your Property</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 15,
    width: '85%',
    alignSelf: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d2d4a',
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
    alignSelf: 'center',
    height: 60,
    width: '80%',
    borderRadius: 25,
    padding: 4,
    marginBottom:10
  },
};

export default UserProfileScreen;
