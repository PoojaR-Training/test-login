import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
const PropertyDetails = () => {
  const navigate = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Home', value: 'home'},
    {label: 'Apartment', value: 'apartment'},
    {label: 'Villa', value: 'villa'},
    {label: 'PG/Hostel', value: 'pg/hostel'},
  ]);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onNext = () => {
    console.log('next');
    navigate.navigate('AddScreen2');
  };
  return (
    <ScrollView>
      <View>
        <Text style={style.txt}>Property Details</Text>
        <Controller
          control={control}
          rules={{
            required: 'Title is required',
            pattern: {
              value: /^[A-Z]+$/i,
              message: 'Invalid title',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Enter Title of Property"
              name="title"
              style={style.container}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="title"
        />
        {errors.title && (
          <Text style={style.error}>{errors.title.message}</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: 'Description is required',
            maxLength: 500,
            minLength: 20,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Enter Description of Property"
              name="description"
              style={style.container}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="description"
        />
        {errors.description && (
          <Text style={style.error}>{errors.description.message}</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: 'Price is required',
            pattern: {
              value: /^\d+$/,
              message: 'Invalid Price',
            },
            min: 1,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Enter Price of Property"
              name="price"
              style={style.container}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="price"
        />
        {errors.price && (
          <Text style={style.error}>{errors.price.message}</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: 'Location is required',
            pattern: {
              value: /^[A-Z]+$/i,
              message: 'Invalid Location',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Enter Location of Property by City"
              name="location"
              style={style.container}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="location"
        />
        {errors.location && (
          <Text style={style.error}>{errors.location.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: 'Address is required',
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Enter Detail Address of Property"
              name="address"
              style={style.container}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="address"
        />
        {errors.address && (
          <Text style={style.error}>{errors.address.message}</Text>
        )}
        <SafeAreaView>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={style.container}
            placeholder="Select Type of Property"
          />
        {/* Add image field ...*/}
          
      </SafeAreaView>

        <TouchableOpacity onPress={handleSubmit(onNext)} style={style.btn}>
          <Text style={style.btntxt}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: 'row',
    padding: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  container: {
    width: '90%',
    height: 60,
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
    color: 'black',
  },
  txt: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    color: '#042675',
  },
  btntxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#3b72f3',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '90%',
    borderRadius: 5,
    padding: 5,
    margin: 20,
  },
  error: {
    color: 'red',
    marginLeft: 20,
  },
});
export default PropertyDetails;
