import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
const WifiService = () => {
  return (
    <View style={style.main}>
      <View style={style.imageContainer}>
        <Image style={style.image} source={require('../assets/wifi.png')} />
      </View>
      <Text style={style.txt}>Wifi</Text>
    </View>
  );
};
const InternetService = () => {
  return (
    <View style={style.main}>
      <View style={style.imageContainer}>
        <Image style={style.image} source={require('../assets/radio.png')} />
      </View>
      <Text style={style.txt}>Internet Access</Text>
    </View>
  );
};
const LanService = () => {
  return (
    <View style={style.main}>
      <View style={style.imageContainer}>
        <Image style={style.image} source={require('../assets/lan.png')} />
      </View>
      <Text style={style.txt}>LAN</Text>
    </View>
  );
};
const AC = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/air-conditioner.png')} />
        </View>
        <Text style={style.txt}>AC</Text>
      </View>
    );
  };
  const WashingMachine= () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/washing-machine.png')} />
        </View>
        <Text style={style.txt}>Washing Machine</Text>
      </View>
      
    );
  };
  const Dryer = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/dryer.png')} />
        </View>
        <Text style={style.txt}>Dryer</Text>
      </View>
    );
  };
  const Furniture = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/sofa.png')} />
        </View>
        <Text style={style.txt}>Furniture</Text>
      </View>
    );
  };
  const TV = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/tv.png')} />
        </View>
        <Text style={style.txt}>TV</Text>
      </View>
    );
  };
  const KitchenAppliances = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/kitchen.png')} />
        </View>
        <Text style={style.txt}>Kitchen Appliances</Text>
      </View>
    );
  };

const style = StyleSheet.create({
  imageContainer: {
    backgroundColor:  "#9bbad1",
    borderRadius: 25,
    width: 50,
    height: 50,
    marginLeft: 20,
    marginBottom: 20
  },
  main: {
    flexDirection: 'row',
    marginRight: 10,

  },
  image: {height: 28, width: 28, tintColor: '#0b1b3d', margin: 10},
  txt: {fontSize: 16, marginTop: 10, marginLeft: 10, fontWeight: '400'},
});
export 
{
    WifiService, 
    InternetService, 
    LanService,
    AC,
    TV,
    Furniture,
    Dryer,
    KitchenAppliances,
    WashingMachine
};
