import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import COLORS from '../../consts/colors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get('screen');
const DetailsScreen1 = ({activeCategory}) => {
  console.log(activeCategory);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  //const [like, setLike]= useState();
  let API = 'http://192.168.200.136:8000/property/getproperty';
  if (activeCategory == 0) {
    API = 'http://192.168.200.136:8000/property/getproperty';
  } else if (activeCategory == 1) {
    API = 'http://192.168.200.136:8000/property/getpropertyType/house';
  } else if (activeCategory == 2) {
    API = 'http://192.168.200.136:8000/property/getpropertyType/flat';
  } else if (activeCategory == 3) {
    API = 'http://192.168.200.136:8000/property/getpropertyType/farm';
  } else if (activeCategory == 4) {
    API = 'http://192.168.200.136:8000/property/getpropertyType/pg';
  } else {
    API = 'http://192.168.200.136:8000/property/getproperty';
  }
  const getApiData = async () => {
    const token = await AsyncStorage.getItem('token');

    let result = await fetch(API, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    result = await result.json();

    setData(result);
  };
  useEffect(() => {
    getApiData();
  }, [activeCategory]);
  const handleCard = id => {
    navigation.navigate('DetailHome', {
      id,
    });
  };
  const likeProperty = async (id) => {
    try {
      console.log("vfv",id);
      console.log(data[0].like);
     const like = data[0].like;
      const token = await AsyncStorage.getItem('token');
      
      const response = await fetch(
        `http://192.168.200.136:8000/property/updatelike/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ like: !like }),
        }
      );
      if (response.ok) {
        console.log('Property like updated');
        getApiData();
      } else {
        console.log('Failed to update property like');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Card = ({houses}) => {
    return (
      <View style={style.card}>
        <TouchableOpacity onPress={() => handleCard(houses._id)}>
          <View style={style.imageContainer}>
            <ImageBackground
              source={{uri: houses.coverimage}}
              style={style.cardImage}
              resizeMode="cover"
            />
          </View>

          <View style={{marginTop: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {houses.title}
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
                marginTop: 10,
              }}>
              <Text style={{fontSize: 16, marginTop: 5}}>
                {houses.location}
              </Text>
              <TouchableOpacity onPress={() => likeProperty(houses._id)}>
                <Image
                  style={{height: 30, width: 30}}
                  source={houses.like==true ? {
                    uri: 'https://cdn-icons-png.flaticon.com/128/833/833472.png',
                  }
                : {
                    uri:'https://cdn-icons-png.flaticon.com/128/1077/1077035.png' ,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <Text style={{fontSize: 16}}>{houses.address}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: '#dce3e8',flex:1}}>
      <FlatList
        snapToInterval={width - 20}
        contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
        data={data}
        renderItem={({item}) => <Card houses={item} />}
      />
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    height: 330,
    backgroundColor: COLORS.white,
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
});

export default DetailsScreen1;