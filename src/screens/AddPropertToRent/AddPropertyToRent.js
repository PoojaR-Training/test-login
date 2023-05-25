import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  StyleSheet,
  Image,

  TouchableOpacity,
} from 'react-native';
import COLORS from '../../consts/colors';
import PropertyDetails from '../../components/PropertyDetails'
const AddPropertyToRent = ({navigation}) => {

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d5e0e8'}}>
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
      <View style={{flex: 0.25}}>
        <View style={style.header}>
          <Text
            style={{
              color: COLORS.dark,
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 10,
              justifyContent: 'center',
            }}>
            Add Your Property On Rent..
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#668fad',
          flex: 1.1,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
    <PropertyDetails/>
      </View>
      <View style={{backgroundColor: '#d5e0e8', flex: 0.15}}>
        <View style={style.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={{
                uri: 'https://www.iconpacks.net/icons/2/free-home-icon-2503.png',
              }}
              style={{width: 35, height: 35}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Add')}>
            <Image
              source={{
                uri: 'https://www.iconpacks.net/icons/4/free-icon-add-button-12005.png',
              }}
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
    padding:5,
    marginLeft:20,
    marginRight:20,
    marginBottom:10,
    marginTop:10,
    color:'black',
    
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
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn:{
    backgroundColor: '#3b72f3',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '90%',
    borderRadius: 5,
    padding: 5,
    margin :20
  
  },
  error: {
    color:'red',
    marginLeft: 20,

  },
});
export default AddPropertyToRent;
