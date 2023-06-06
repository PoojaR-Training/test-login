import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
  Modal,
  Button,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {
  InternetService,
  WifiService,
  LanService,
  AC,
  TV,
  KitchenAppliances,
  Furniture,
  WashingMachine,
  Dryer,
  Breakfast,
  Meal,
  Kitchen,
  Elevator,
  Laundry,
  CCTV,
  Seaview,
  Parking,
  Housekeeper,
} from '../../../components/Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get('screen');
const AboutDetails = () => {
  const callme = () => {
    let phoneNumber = '01234567';
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const openComposer = () => {
  Linking.openURL('sms:+91234567')
  };
  const [data, setData] = useState(null);
  const route = useRoute();
  const id = route.params.id;
  let result;

  const getApiData = async () => {
    const token =await AsyncStorage.getItem('token')
    console.log(token);
    result = await fetch(
      `http://192.168.200.136:8000/property/getproperty/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    result = await result.json();
    setData(result);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const renderServices = () => {
    const services = [];
    if (data) {
      if (data.freeWifi) services.push(<WifiService key="wifi" />);
      if (data.lanConnections) services.push(<LanService key="lan" />);
      if (data.freeInternet) services.push(<InternetService key="internet" />);
      if (data.AC) services.push(<AC key="ac" />);
      if (data.dryer) services.push(<Dryer key="dryer" />);
      if (data.furniture) services.push(<Furniture key="furniture" />);
      if (data.washingMachine)
        services.push(<WashingMachine key="washingMachine" />);
      if (data.TV) services.push(<TV key="tv" />);
      if (data.kitchenAppliances)
        services.push(<KitchenAppliances key="kitchenAppliances" />);
      if (data.laundry) services.push(<Laundry key="laundry" />);
      if (data.breakfast) services.push(<Breakfast key="breakfast" />);
      if (data.meal) services.push(<Meal key="meal" />);
      if (data.elevator) services.push(<Elevator key="elevator" />);
      if (data.kitchen) services.push(<Kitchen key="kitchen" />);
      if (data.seaview) services.push(<Seaview key="view" />);
      if (data.housekeeper) services.push(<Housekeeper key="housekeeper" />);
      if (data.freeparking) services.push(<Parking key="parking" />);
      if (data.securitycamera) services.push(<CCTV key="cctv" />);
    }
    return services;
  };

  const renderItem = ({item}) => <View style={{flexBasis: '50%'}}>{item}</View>;
  const InteriorCard = ({interior}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
    };

    return (
      <View>
        <TouchableOpacity onPress={openModal}>
          <Image source={{uri: interior}} style={style.interiorImage} />
        </TouchableOpacity>
        <Modal visible={modalVisible} onRequestClose={closeModal}>
          <View style={style.centerView}>
            <View style={style.modalView}>
              <Image
                source={{uri: interior}}
                style={{width: '100%', height: '100%', resizeMode: 'contain'}}
              />
              <Button title="Close" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1,backgroundColor:'#dce3e8'}}>
      <ScrollView>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 25,
              marginTop: 5,
              fontWeight: 'bold',
              marginBottom: 15,
              marginLeft: 10,
            }}>
            Facilities
          </Text>
          <FlatList
            data={renderServices()}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View
          style={{
            borderWidth: 0.7,
            borderColor: 'gray',
            margin: 10,
          }}
        />

        <View style={{flex: 0.5}}>
          <Text
            style={{
              fontSize: 25,
              marginTop: 5,
              fontWeight: 'bold',
              marginBottom: 10,
              marginLeft: 10,
            }}>
            About
          </Text>
          {data && (
            <Text
              style={{
                fontSize: 18,
                textAlign: 'justify',
                marginLeft: 10,
                marginRight: 15,
              }}>
              {data.description}
            </Text>
          )}
        </View>
        <View
          style={{
            borderWidth: 0.7,
            borderColor: 'gray',
            margin: 10,
            marginTop: 20,
          }}
        />
        <View style={{flex: 0.5}}>
          <Text
            style={{
              fontSize: 25,
              marginTop: 5,
              fontWeight: 'bold',
              marginBottom: 10,
              marginLeft: 10,
            }}>
            Inside View
          </Text>
          <FlatList
            contentContainerStyle={{marginTop: 20, marginLeft: 10}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data && data.propertyimages}
            renderItem={({item}) => <InteriorCard interior={item} />}
          />
        </View>
        <View
          style={{
            borderWidth: 0.7,
            borderColor: 'gray',
            margin: 10,
            marginTop: 20,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 25,
              marginTop: 5,
              fontWeight: 'bold',
              marginBottom: 15,
              marginLeft: 10,
            }}>
            OwnerDetails
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            style={style.image}
            source={require('../../../assets/person.jpg')}
          />
          <Text style={style.text}>Pooja Ranpara</Text>
          <View style={{flexDirection: 'row', alignContent: 'flex-end'}}>
            <TouchableOpacity onPress={callme}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  marginTop: 40,
                  tintColor: 'green',
                  marginLeft: 50,
                }}
                source={require('../../../assets/phone-call.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openComposer}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  marginTop: 40,
                  tintColor: 'blue',
                  marginLeft: 20,
                }}
                source={require('../../../assets/comment.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
       
        </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  interiorImage: {
    width: width / 2 - 25,
    height: 120,
    marginRight: 10,
    borderRadius: 10,
  },
  imageContainer: {
    backgroundColor: 'gray',
    borderRadius: 25,
    width: 100,
    height: 100,
    marginLeft: 20,
    marginBottom: 20,
  },
  main: {
    flexDirection: 'row',
    marginRight: 10,
  },
  image: {height: 100, width: 100, margin: 10, borderRadius: 45},
  text: {
    fontSize: 16,
    marginTop: 50,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    padding: 10,
    margin: 10,
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    height: '40%',
    justifyContent: 'center',
  },
});

export default AboutDetails;
