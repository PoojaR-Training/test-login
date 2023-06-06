import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import COLORS from '../../../consts/colors';
import AboutDetails from './AboutDetails';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

const PropertDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params.id;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#9bbad1'}}>
        <View style={{flex: 0.10, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailHome', {id})}>
            <Image
              style={{height: 35, width: 35,marginTop:10,margin:5}}
              source={require('../../../assets/left-arrow.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
             marginTop: 10,
            }}>
            Property Details
          </Text>
        </View>
        <AboutDetails />
   
    </SafeAreaView>
  );
};

export default PropertDetails;
