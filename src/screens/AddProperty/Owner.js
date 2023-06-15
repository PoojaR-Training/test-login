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
      <View style={{ backgroundColor: '#9bbad1', marginTop: windowHeight / 30 }}>
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
              source={image ? { uri: image } :{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAYFBMVEVVYIDn7O3///9TXn9LV3rs8fFPW3xEUXZNWXvc4eTX3OCzt8RIVHhpco77/Pzv8PNeaIbHytN9hZyco7Krsr6PlajW19729vjk5upzfJXM0dijqbiEi6G8w8xud5FjbYqtyksrAAAGCElEQVRogcWba5eiMAyGKy0UuYs4gKL+/3+5BXUUbJO3Dp7Nlz07B3nIpW2apiLwlzLZpftDnVfCSJXXh326S8oPXiQ8uT9NXUWxUnEkpZhEytv/q7r58fwCD3jRpXWlsl/qXMw3ZKqq0674ArxsegO2YV/FfEDfwPqD8N2gM6vCFhNkut6tB28bqVmdZ/pr2bSrwMu9Uj7kmyi1563PwdtGfICe8OLEac/Ad9fsM/Qo2ZXxPQnvag1GmV2krrtP4alfmNkk0s1H8LLXf0WPkuXuwHPCdyJeg22Ul07Pu+An9Sdvv4pUJy94MaDzGUTPBvuEb4W3+Ydj2yWx3fE2eCf+HOVLiaRtzFngCcKWZg2VkRHzjwBcFIkEgScVy5Yqk1Xe1/Uw1HWfVzLjw9NGf4OzNpdK5Pvzcdttwkk23fZ43l8Ex4/Em+WX8FLS7CjL02REzsT8IWlyJteI5HKhWcCLK/0CfTm2C/DvB7RHZk6M8oKED+S0FlXnpc5z/c8V+Xs1UPATuYCqfkugJ/y2J2eI7OSG78h5TdUbhm3om5qiy2zngpf2pPguUc6iJzwZNVKWDnhOBlu8RdjG8qTb494Ob2iHp5Dihp6SbtepDd6R40ReMPQoF3K60Z0FXpNGz1DFR9VJE0b1O3xHTxAV5vFJtuSbhN4t4e2VtFU0wIob1Wkjymu7gNPTi1CND7yhc5GsmcNL8unRVD5wxoVClDP4nsmbdIKzN5uEgT8yyhu85XI25QfnXhe3L3DGSavDVfMCZ55d2+wm4p9wNkBWh9/GuuAnt2/Ao+EBL/kd4dpwocs7nF7OvgPP0hu86Pmkf3W47IsJ3gEbs/XhcTfB6RXwS/DJ7gKJ9W/Ax2VdBGXFP/kFuKxKA/9B9uLrw4X6MXBgoH0H3hg44nLpk0WZPKpCduyDgSMP6sQjlzDZBOb0QJQRD48PXmxDP/B1NBmVIgHKbconiZrgOyCK40RAj3l5fBRMJUFvbu6PecO3yFtTsUe+8SvweC8OwEj7Djw6iBoYad+By1rk/w9+Eciy8h04hP4aHJP/CvefZOjCjJeooy/8iPkc8Xp88p3bT4jmV2ioycxXc+SUxAw1ZJIRce2l96ZGFDeTDDK9jmXXDocfeyjczPSKLCxG9BF1e7jnz/gniU/QkirGSgYcc9D7xLSkIsmEGPdWaPXzjM4vJplAco4RLsDkmSnCvYhJo5AEcvpO0O5b9Ph3TCCh1Hl8tsLK7WAA31JnaNMwijpDdPgAeNo0sGWwx5deC0RxeDkze2RwoziKBlRP8MPnaaNYgk4Xkj9kQXYqD5m2yLDTheYK/vgYfxQHoLLI/WO5pII+IprJvSzSxaijFL1hbA+44o+CEFIKe3wuFXPh2aO95FEK87A7OcmyteaZGile/vz9jfu4w2OIi5fyZzDAcUKctXjBn4VfoOS9Nvyl5B0gLRdrwqV4OWkA05nV4LNjjhadFVeCzw54ghP4w3Xg86OtoAS9vgpcLg71ghQLeOIUPUStJ/TiODNokW2TybvcW0Z4dn0/yMXGusydbCNg1L4fYXMtMjehFxbM6fGzWeYJB2b4jF5Swyuiuy4tcDbmpN4zmUx3AQ7UrA0bQUBuLqXu+bp3mApmZ+5qVaEGu8wuZFvUL33TVBT+d4i/wYOjK6HKrinfmnTHd83VuXGQsbM9yXWwGYsTir7jK0fcU41ZZry9/yrODlwzmMX40qY93ZIWBPki6CI9+KInfNiINytGeUDDi1n7pcyAEHdqvwi9SDBtiCbkn3SDhkLcjX8NvahiGzDNHuJBVxUc4i78S+RH1fYNZWm6vdFj6RXibvztWoKNbW03LqtYaO8Qd+E3jYptTa8OeFBcBFx2Q/CDzq13Kxwt5iup/cCfPVrMjbRrwl1XSpzXCoACDCrOq1TuCxXFSpYP3de4qKskq5ieusVDXqL5u/KE2hz8z8ozl5fYW1t/wIfcu/krY5/anrY4CDf4D7RH7sqh1wRd7fwOpSG0xwXJAuWHLXw/0+deKsD3IHvCmQ8wYB/yB/DpA4q2fd4mCcMybL25k/wDdXVfaRRwktgAAAAASUVORK5CYII=',
              }}
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
