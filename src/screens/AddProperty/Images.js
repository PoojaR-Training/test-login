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
const selected =route.params.selected
console.log(data,"dataimage");
console.log(selected,"selected");
  const navigation = useNavigation();
  const windowHeight = Dimensions.get('window').height;
  const [image, setImage] = useState();
  const [images, setImages] = useState([]);
  const [covererror, setCoverError] = useState();
  const [propertyError, setPropertyError] = useState();
  const [navigateTo, setNavigateTo] = useState(false);
  const arr = [];
  arr.push(data);
  arr.push({type:selected});
console.log(arr,'imagepagedata');
  const imagePick = () => {
    try {
      ImagePicker.openPicker({
        width: 500,
        height: 500,
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
          console.log('img', response);
          response.map(image => {
            imagesList.push(image.path);
            console.log(imagesList);
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

    if(image && images.length>0){
      arr.push({cover: image});
      arr.push({property:images});
      navigation.navigate('Facility', {arr});
      setCoverError(false);
      setPropertyError(false);
    }
    else{
      setCoverError(true);
      setPropertyError(true);
    }
    if(!image){
      setCoverError(true);
    }
    if(images.length<0){
      setPropertyError(true);
    }
    
   
  };
  const renderCoverImage = () => {
    if (image) {
      return (
        <Image
          source={{ uri: image }}
          style={{
            height: 150,
            width: 250,
            alignSelf: 'center',
            
            marginBottom: 5
          }}
        />
      );
    }
    return null;
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
            flex: 0.5,
            margin: 12,
            marginBottom: 5,
            borderRadius: 8,
          }}>
          {covererror ? (
            <Text style={styles.error}>*Cover Image is required</Text>
          ) : null}

          <TouchableOpacity onPress={imagePick}>
            <Text style={styles.txt}>Select Cover Image</Text>
            {renderCoverImage()}
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            flex: 0.5,
            margin: 12,
            borderRadius: 8,
          }}>
          {propertyError ? (
            <Text style={styles.error}>*Property Image is required</Text>
          ) : null}
          <TouchableOpacity onPress={imagesPick}>
            <Text style={styles.txt}>Select Property Image</Text>
          </TouchableOpacity>

          {images && (
            <FlatList
              data={images}
              horizontal
              renderItem={({item}) => (
                <Image
                  source={{uri: item}}
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
