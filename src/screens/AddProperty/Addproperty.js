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
} from 'react-native';
// Update the import statement to match the correct package name for SelectList
import {SelectList} from 'react-native-dropdown-select-list';

import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

const AddPropertyScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState();
  const data = [
    {key: 'house', value: 'House'},
    {key: 'flat', value: 'Flat'},
    {key: 'farm', value: 'Farm'},
    {key: 'pg', value: 'PG'},
  ];
  const [error, setError] = useState(false);
  const navigate = selected => {
    if (selected) {
      setError(false);
      navigation.navigate('Property', {selected});
    } else {
      setError(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#9bbad1'}}>
      <View style={{backgroundColor: '#9bbad1'}}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            margin: 10,
          }}>
          Add Your Property on Rent
        </Text>
      </View>
      <View style={{flex: 1, backgroundColor: '#dce3e8'}}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 30,
            marginBottom: 10,
          }}>
          What do you want to rent?
        </Text>

        <SelectList
          placeholder="Select Type of Property"
          inputStyles={{fontSize: 16, justifyContent: 'center', margin: 7}}
          data={data}
          setSelected={setSelected}
          boxStyles={{
            height: 65,
            margin: 12,
            borderWidth: 0,
            padding: 10,
            borderRadius: 8,
            backgroundColor: 'white',
          }}
          dropdownStyles={{
            margin: 12,
            backgroundColor: 'white',
          }}
          dropdownTextStyles={{fontSize: 16}}
        />

        {error ? <Text style={styles.error}>Type is Required</Text> : null}

        <TouchableOpacity
          style={styles.buttonstyle}
          onPress={() => navigate(selected)}>
          <Text style={styles.signintxt}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default AddPropertyScreen;
