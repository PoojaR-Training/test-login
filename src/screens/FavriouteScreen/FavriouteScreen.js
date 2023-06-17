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
} from 'react-native';
const {width} = Dimensions.get('screen');
import {useNavigation, useIsFocused} from '@react-navigation/native';
import COLORS from '../../consts/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocuse = useIsFocused();
  const handleCard = id => {
    navigation.navigate('DetailHome', {
      id,
    });
  };
  const getApiData = async () => {
    const token = await AsyncStorage.getItem('token');
    
    let result = await fetch(
      'http://192.168.200.136:8000/property/getpropertybylike',
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
  }, [isFocuse]);

  
  const likeProperty = async (id, like) => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(
        `http://192.168.200.136:8000/property/updatelike/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({like: !like}),
        },
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
  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const Card = ({houses}) => {
    return (
      <View style={style.card}>
        <TouchableOpacity onPress={() => handleCard(houses._id, houses.like)}>
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
                marginTop: 10,
              }}>
              <Text style={{fontSize: 16, marginTop: 5}}>
                {capitalizeFirstLetter(houses.location)}
              </Text>
              <TouchableOpacity
                onPress={() => likeProperty(houses._id, houses.like)}>
                <Image
                  style={{height: 25, width: 25}}
                  source={
                    houses.like == true
                      ? {
                          uri: 'https://cdn-icons-png.flaticon.com/128/833/833472.png',
                        }
                      : {
                          uri: 'https://cdn-icons-png.flaticon.com/128/1077/1077035.png',
                        }
                  }
                />
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <Text style={{fontSize: 16}}>
                {capitalizeFirstLetter(houses.address)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#9bbad1'}}>
      <View style={{backgroundColor: '#9bbad1'}}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            margin: 10,
          }}>
          WishLists
        </Text>
      </View>
      <View style={{backgroundColor: '#dce3e8', flex: 1}}>
        {data.length === 0 ? (
          <Text style={style.noDataText}>No data found.</Text>
        ) : (
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
            data={data}
            renderItem={({item}) => <Card houses={item} />}
            ListEmptyComponent={() => (
              <Text style={style.noDataText}>No data found.</Text>
            )}
          />
        )}
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
export default FavoriteScreen;
