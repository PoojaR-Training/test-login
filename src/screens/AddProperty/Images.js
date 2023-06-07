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
import {SelectList} from 'react-native-dropdown-select-list';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import ImagePicker from 'react-native-image-crop-picker';
import {useRoute} from '@react-navigation/native';
const AddPropertyScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const route = useRoute();
  const data = route.params.data;
 // console.log(data, 'route');
  const navigation = useNavigation();
  const windowHeight = Dimensions.get('window').height;
  const [image, setImage] = useState();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false)
  const arr = [];
  arr.push(data);
  //console.log(arr, 'arr');
 
  const imagePick = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
        //  console.log('img', image);
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
  let imagesList = [];
  const imagesPick = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        multiple: 'true',
      })
        .then(response => {
         // console.log('img', response);
          response.map(image => {
            imagesList.push( image.path);
          
           
          });
          setImages(imagesList);
        })
        .catch(error => {
          Alert.alert('Try again', 'Image selection cancelled');
          console.log('Image selection cancelled');
        });
    } catch (err) {
      console.log(err);
      Alert.alert('Try again', 'image not uploaded');
    }
  };
  const navigate = arr => {
    if(image &&images){
      arr.push({cover:image});
      arr.push(images);
     navigation.navigate('Facility', {arr});
     setError(false)
    }
    else{
      setError(true)
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
      <View style={{backgroundColor: '#dce3e8', flex: 1}}>
        <View style={{margin: 15}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
            Add Property Images
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            flex: 0.3,
            margin: 12,
            borderRadius: 8,
          }}>
             {error ? <Text style={styles.error}>*Cover Image is required</Text> : null}
          <Controller
            control={control}
            rules={{
              required: 'Cover Image is required',
            }}
            render={({field: {value, onChange}}) => (
              <TouchableOpacity onPress={imagePick}>
                <Text style={styles.txt}>Select Cover Image</Text>
                {image ? (
                  <Image
                    source={{uri: image}}
                    style={{height: 100, width: 100, alignSelf: 'center'}}
                  />
                ) : null}
              </TouchableOpacity>
            )}
            name="title"
          />
          
        </View>
        <View
          style={{
            backgroundColor: 'white',
            flex: 0.5,
            margin: 12,
            borderRadius: 8,
          }}>
          <TouchableOpacity onPress={imagesPick}>
            <Text style={styles.txt}>Select Property Image</Text>
          </TouchableOpacity>
          {images && (
            <FlatList
              data={images}
              horizontal
              renderItem={({item}) => (
                <Image
                  source={{uri: item.path}}
                  style={{
                    height: 150,
                    width: 250,
                    alignSelf: 'center',
                    margin: 10,
                  }}
                />
              )}
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.buttonstyle}
          onPress={() => navigate(arr)}>
          <Text style={styles.signintxt}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  txtbox: {
    height: 45,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  txt: {
    margin: 12,
    borderColor: 'white',
    color: 'gray',
    textAlign: 'center',

    fontSize: 16,
  },
  txtmultiline: {
    height: 70,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },

  buttonstyle: {
    borderRadius: 10,
    height: 55,
    margin: 12,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
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
export default AddPropertyScreen;
