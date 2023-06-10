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
      <Text style={style.txt} adjustsFontSizeToFit>Wifi</Text>
    </View>
  );
};
const InternetService = () => {
  return (
    <View style={style.main}>
      <View style={style.imageContainer}>
        <Image style={style.image} source={require('../assets/radio.png')} />
      </View>
      <Text style={style.txt} adjustsFontSizeToFit>Internet Access</Text>
    </View>
  );
};
const LanService = () => {
  return (
    <View style={style.main}>
      <View style={style.imageContainer}>
        <Image style={style.image} source={require('../assets/lan.png')} />
      </View>
      <Text style={style.txt} adjustsFontSizeToFit>LAN</Text>
    </View>
  );
};
const AC = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/air-conditioner.png')} />
        </View>
        <Text style={style.txt} adjustsFontSizeToFit>AC</Text>
      </View>
    );
  };
  const WashingMachine= () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/washing-machine.png')} />
        </View>
        <Text style={style.txt} adjustsFontSizeToFit  >Washing Machine</Text>
      </View>
      
    );
  };
  const Dryer = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/dryer.png')} />
        </View>
        <Text style={style.txt} adjustsFontSizeToFit>Dryer</Text>
      </View>
    );
  };
  const Furniture = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/sofa.png')} />
        </View>
        <Text style={style.txt} adjustsFontSizeToFit>Furniture</Text>
      </View>
    );
  };
  const TV = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/tv.png')} />
        </View>
        <Text style={style.txt} adjustsFontSizeToFit>TV</Text>
      </View>
    );
  };
  const KitchenAppliances = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/kitchen.png')} />
        </View>
        <Text style={style.txt} adjustsFontSizeToFit>Kitchen Appliances</Text>
      </View>
    );
  };
  const Kitchen = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/kitchen.png')} />
        </View>
        <Text style={style.txt} adjustsFontSizeToFit>Kitchen</Text>
      </View>
    );
  };
  const Meal= () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/food.png')} />
        </View>
        <Text style={style.txt} adjustsFontSizeToFit>2 Time Meal</Text>
      </View>
    );
  };
  const Elevator = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/elevator.png')} />
        </View>
        <Text style={style.txt} adjustsFontSizeToFit>Elevator</Text>
      </View>
    );
  };
  const Laundry = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/fashion.png')} />
        </View>
        <Text style={style.txt} adjustsFontSizeToFit>Laundry</Text>
      </View>
    );
  };
  const Housekeeper = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/housekeeper.png')} />
        </View>
        <Text style={style.txt} adjustsFontSizeToFit>Housekeeper</Text>
      </View>
    );
  };
  const Seaview = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/sea.png')} />
        </View>
        <Text style={style.txt} adjustsFontSizeToFit>Seaview</Text>
      </View>
    );
  };
  const Breakfast = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/coffee.png')} />
        </View>
        <Text style={style.txt} adjustsFontSizeToFit>Breakfast</Text>
      </View>
    );
  };
  const Parking = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/parking.png')} />
        </View>
        <Text style={style.txt}  adjustsFontSizeToFit>Parking Area</Text>
      </View>
    );
  };
  const CCTV = () => {
    return (
      <View style={style.main}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={require('../assets/cctv-camera.png')} />
        </View>
        <Text style={[style.txt,{}]} adjustsFontSizeToFit >Security Camera</Text>
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
  txt: {flex:1,fontSize: 14, marginTop: 10, marginLeft: 10, fontWeight: '400'},
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
    WashingMachine,
    Breakfast,
    Meal,
    Kitchen,
    Elevator,
    Laundry,
    CCTV,
    Seaview,
    Parking,
    Housekeeper
    
};
