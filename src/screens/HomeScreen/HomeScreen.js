import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../consts/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DetailsScreen1 from '../DetailScreen/DetailsScreen1';
import DetailsScreen2 from '../DetailScreen/DetailsScreen2';

const Tab = createMaterialTopTabNavigator();
const HomeScreen = ({navigation}) => {
 
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d5e0e8'}}>
      <View style={{flex: 0.18}}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: 15,
          }}>
          <View style={style.searchInputContainer}>
            <TextInput
              placeholder="Search address, city, location"
              style={{fontSize: 18}}
            />
          </View>
        </View>
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
          <Tab.Screen
            name="House"
            component={DetailsScreen1}
            options={{
              tabBarIcon: () => (
                <Image
                  style={style.bottomTabIcon2}
                  source={require('../../assets/home.png')}
                />
              ),
              tabBarLabel: 'House',
            }}
          />
          <Tab.Screen
            name="Apartment"
            component={DetailsScreen2}
            options={{
              tabBarIcon: () => (
                <Image
                  style={style.bottomTabIcon}
                  source={require('../../assets/flat.png')}
                />
              ),
              tabBarLabel: 'Flat',
            }}
          />
          <Tab.Screen
            name="Farms"
            component={DetailsScreen2}
            options={{
              tabBarIcon: () => (
                <Image
                  style={style.bottomTabIcon}
                  source={require('../../assets/farmhouse.png')}
                />
              ),
              tabBarLabel: 'Farms',
            }}
          />
          <Tab.Screen
            name="PG"
            component={DetailsScreen2}
            options={{
              tabBarIcon: () => (
                <Image
                  style={style.bottomTabIcon}
                  source={require('../../assets/house.png')}
                />
              ),
              tabBarLabel: 'PG',
            }}
          />
        </Tab.Navigator>
      </View>
      <View style={{backgroundColor: '#d5e0e8', flex: 0.1}}>
        <View style={style.footer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Image
              source={require('../../assets/search2.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/heart.png')}
            style={{width: 30, height: 30}}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Add')}>
            <Image
              source={require('../../assets/new.png')}
              style={{width: 35, height: 35}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={{
                uri: 'https://www.iconpacks.net/icons/2/free-icon-user-4250.png',
              }}
              style={{width: 35, height: 35}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  searchInputContainer: {
    height: '180%',
    width: '95%',
    backgroundColor: 'white',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  bottomTabIcon: {
    height: 25,
    width: 25,
  },
  bottomTabIcon2: {
    height: 22,
    width: 22,
    
  },
  footer: {
    flexDirection: 'row',
    padding: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});
export default HomeScreen;
