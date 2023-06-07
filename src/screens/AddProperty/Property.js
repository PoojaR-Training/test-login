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
import {useRoute} from '@react-navigation/native';
const Property = () => {
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const route = useRoute();
  const selected = route.params.selected;
  console.log(selected, 'type');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const navigate = (data) => {
    navigation.navigate('Images',{data});
  };
  const data = [];

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [rent, setRent] = useState();
  const [area, setArea] = useState();
  data.push({title: title});
  data.push({description: description});
  data.push({location: location});
  data.push({address: address});
  data.push({rent: rent});
  data.push({area: area});
  data.push({type:selected});
  console.log(data,"data");
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
        <View style={{flex: 1, margin: 12}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
            Add Property Details
          </Text>
        </View>
        <View style={{backgroundColor: '#dce3e8', flex: 1}}>
          <Controller
            control={control}
            rules={{
              required: 'Title is required',
              pattern: {
                value:  /^[a-zA-Z][a-zA-Z\\s]/,
                message: 'Invalid Title',
              },
            }}
            render={({field: {value,onChange}}) => (
    
                <TextInput
                  placeholder="Enter Title of Property"
                  name="title"
                  value={value}
                  style={styles.txtbox}
                  onChangeText={text => {
                    onChange(text);
                    setTitle(text);
                  }}
                />
            )}
            name="title"
          />

          {errors.title && (
            <Text style={styles.error}>{errors.title.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: 'Description is required',
              pattern:{
                value: /^.{10,700}$/,
                message: 'Length must be between 10 - 700'
              }
            }}
            render={({field: {value,onChange}}) => (
              <TextInput
                placeholder="Enter Description of Property"
                name="description"
                multiline
                numberOfLines={10}
                value={value}
                style={styles.txtmultiline}
                onChangeText={text=>{
                  setDescription(text);
                  onChange(text)
                }}
              />
            )}
            name="description"
          />
          {errors.description && (
            <Text style={styles.error}>{errors.description.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: 'Rent is required',
              pattern: {
                value:  /^\d+$/,
                message: 'Invalid Rent Amount',
              },
            }}
            render={({field: {value,onChange}}) => (
              <TextInput
                placeholder="Enter Rent of Property"
                name="rent"
                value={value}
                style={styles.txtbox}
                keyboardType="number-pad"
                onChangeText={text=>{
                  setRent(text);
                  onChange(text)
                }}
              />
            )}
            name="rent"
          />
          {errors.rent && (
            <Text style={styles.error}>{errors.rent.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: 'Location is required',
              pattern:{
                value:  /^[a-zA-Z][a-zA-Z\\s]+$/,
                message: 'Invalid Location',
              }
            }}
            render={({field: {value,onChange}}) => (
              <TextInput
                placeholder="Enter Location of Property by City"
                name="location"
                style={styles.txtbox}
                value={value}
                onChangeText={text=>{
                  setLocation(text);
                  onChange(text)
                }}
              />
            )}
            name="location"
          />
          {errors.location && (
            <Text style={styles.error}>{errors.location.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: 'Address is required',
              
            }}
            render={({field: {value,onChange}}) => (
              <TextInput
                placeholder="Enter Address of Property"
                name="address"
                multiline
                value={value}
                numberOfLines={3}
                style={styles.txtmultiline}
                onChangeText={text=>{
                  setAddress(text);
                  onChange(text)
                }}
              />
            )}
            name="address"
          />
          {errors.address && (
            <Text style={styles.error}>{errors.address.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: 'Area is required',
              pattern: {
                value:  /^\d+$/,
                message: 'Invalid Area',
              },
            }}
            render={({field: {value,onChange}}) => (
              <TextInput
                placeholder="Enter Carpet Area Of Property in sqft"
                name="area"
                style={styles.txtbox}
                keyboardType="number-pad"
                value={value}
                onChangeText={text=>{
                  setArea(text);
                  onChange(text)
                }}
                
              />
            )}
            name="area"
          />
          {errors.area && (
            <Text style={styles.error}>{errors.area.message}</Text>
          )}
          <TouchableOpacity
            style={styles.buttonstyle}
           onPress={()=>navigate(data)}>
            <Text style={styles.signintxt}>Next</Text>
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
    // top: 10,
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
export default Property;
