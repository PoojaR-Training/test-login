import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import COLORS from '../../../consts/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AboutDetails from './AboutDetails';
import {useRoute} from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();
const PropertDetails = () => {
  const route = useRoute();
  const id = route.params.id;
  console.log(id, 'routeid');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#9bbad1"}}>
      <View style={{flex: 0.12}}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            margin: 10,
            marginTop: 20,
            marginBottom: 5,
          }}>
          Property Details
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <Tab.Navigator
          screenOptions={{
            labelStyle: {textTransform: 'none'},
            style: {fontSize: 5, backgroundColor: '#d5e0e8'},
          }}>
          <Tab.Screen name="Services" component={AboutDetails} initialParams={{id:id}} />
          <Tab.Screen name="Owner" component={AboutDetails} initialParams={{id:id}} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default PropertDetails;
