import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, Image, FlatList,TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
import { useRoute } from '@react-navigation/native';
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
} from '../../../components/Services';
const {width} = Dimensions.get('screen');
const AboutDetails = () => {
  const [data, setData] = useState(null);
  const route = useRoute();
  const id = route.params.id;
  console.log(id);
  let result;
  const getApiData = async () => {
    result = await fetch(`http://192.168.200.136:8000/home/gethome/${id}`);
    result = await result.json();
    setData(result);
    console.log(result);
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
      if (data.washingMachine) services.push(<WashingMachine key="washingMachine" />);
      if (data.TV) services.push(<TV key="tv" />);
      if (data.kitchenAppliances) services.push(<KitchenAppliances key="kitchenAppliances" />);
    }
    return services;
  };

  const renderItem = ({ item }) => (
    <View style={{ flexBasis: '50%' }}>{item}</View>
  );
  const InteriorCard = ({interior}) => {
    return (
      
   
  <View>
      <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)} >
        <Image source={{uri: interior}} style={style.interiorImage} />
      </TouchableOpacity>
      </View>
      
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#d5e0e8' }}>
      <ScrollView>
        <View style={{ flex: 1}}>
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
        
        <View style={{ flex: 0.5}}>
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
           <View style={{ flex: 0.5}}>
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
            contentContainerStyle={{marginTop: 20,marginLeft: 10}}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={data && data.homeimages}
            renderItem={({item}) => <InteriorCard interior={item} />}
          />
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

});
export default AboutDetails;
