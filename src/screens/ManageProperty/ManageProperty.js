import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Alert
} from 'react-native';
const {width} = Dimensions.get('screen');
import {useNavigation,useIsFocused} from '@react-navigation/native';
import COLORS from '../../consts/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageProperty = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocuse=useIsFocused();
 
  const handleCard = id => {
    navigation.navigate('DetailHome', {
      id,
    });
  };
  const getApiData = async () => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    console.log(id);
    let result = await fetch(
      `http://192.168.200.136:8000/property/getrentedproperty/${id}`,
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
  },[isFocuse]);
 
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const deleteProperty = async (id) => {
    console.log('deleteProperty', id);
    const token = await AsyncStorage.getItem('token');
   
    let result = await fetch(
      `http://192.168.200.136:8000/property/deleteproperty/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    result = await result.json();

    setData(result);
    if(result.ok) {
        console.log('deleteProperty success');
    }
    else{
        console.log('deleteProperty error');
    }
  }
  const showDeleteAlert = (id) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this property?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => deleteProperty(id),
        },
      ],
    );
  };
  const Card = ({houses}) => {
    
    return (
      <View style={style.card}>
        <TouchableOpacity onPress={() => handleCard(houses._id,houses.like)}>
          <View style={style.imageContainer}>
            <ImageBackground
              source={{uri: houses.coverimage}}
              style={style.cardImage}
              resizeMode="cover"
            />
          </View>

          <View >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {capitalizeFirstLetter(houses.title)}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: COLORS.blue,
                  fontSize: 18,
                }}>
                ${houses.price}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
               marginTop: 5,
               
              }}>
              <Text style={{fontSize: 16, marginTop: 5}}>
              {capitalizeFirstLetter(houses.location)}
              </Text>
              <TouchableOpacity onPress={()=>showDeleteAlert(houses._id)}>
                <Image
                  style={{height:35, width: 35}}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/9790/9790368.png',
                  }}
               
                />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row'}}>
              <Text style={{fontSize: 16}}>{capitalizeFirstLetter(houses.address)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: '#9bbad1'}}>
      <View
        style={{ backgroundColor: '#9bbad1', flexDirection:'row'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={{height: 35, width: 35,marginTop:5}}
            source={require('../../assets/left-arrow.png')}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
           margin:10
          }}>
          Manage your Rented Property
        </Text>
      </View>
      <View style={{backgroundColor: '#dce3e8', flex: 1}}>
        <FlatList
          snapToInterval={width - 20}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          data={data}
          renderItem={({item}) => <Card houses={item} />}
          ListEmptyComponent={() => (
            <Text style={style.noDataText}>No data found.</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  card: {
    height: 330,
    backgroundColor: 'white',
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  cardImage: {
    width: '100%',
    height: 190,
    borderRadius: 15,
  },
  facility: {flexDirection: 'row'},

  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  imageContainer: {
    position: 'relative',
    flexDirection: 'row',
  },

  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  heartIconContainer: {
    backgroundColor: 'white',
  },
  noDataText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20,
  },
});
export default ManageProperty;
