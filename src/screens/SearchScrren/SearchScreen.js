import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import COLORS from '../../consts/colors';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('screen');

const SearchScreen = ({ search, activeCategory }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchData();
  }, [search, activeCategory]);

  const fetchData = async () => {
    let API = `http://192.168.200.136:8000/property/getpropertybycity/${search}`;

    if (activeCategory === 1) {
      API = `http://192.168.200.136:8000/property/getpropertybycitytype/house/${search}`;
    } else if (activeCategory === 2) {
      API = `http://192.168.200.136:8000/property/getpropertybycitytype/flat/${search}`;
    } else if (activeCategory === 3) {
      API = `http://192.168.200.136:8000/property/getpropertybycitytype/farm/${search}`;
    } else if (activeCategory === 4) {
      API = `http://192.168.200.136:8000/property/getpropertybycitytype/pg/${search}`;
    }

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

  const handleCard = (id) => {
    navigation.navigate('DetailHome', {
      id,
    });
  };
  
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const Card = ({ houses }) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => handleCard(houses._id)}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{ uri: houses.coverimage }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {capitalizeFirstLetter(houses.title)}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: COLORS.blue,
                  fontSize: 18,
                }}
              >
                ${houses.price}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16, marginTop: 5 }}>
                {capitalizeFirstLetter(houses.location)}
              </Text>
             
                <Image
                  style={{ height: 25, width: 25}}
                  source={
                    houses.like === true
                      ? {
                        uri: 'https://cdn-icons-png.flaticon.com/128/833/833472.png',
                      }
                      : {
                        uri: 'https://cdn-icons-png.flaticon.com/128/1077/1077035.png',
                      }
                  }
                />
             
            </View>

            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              <Text style={{ fontSize: 16 }}>{houses.address}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: '#dce3e8', flex: 1 }}>
      {data.length === 0 ? (
        <Text style={styles.noDataText}>No data found.</Text>
      ) : (
        <FlatList
          snapToInterval={width - 20}
          contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
          data={data}
          renderItem={({ item }) => <Card houses={item} />}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={() => (
            <Text style={styles.noDataText}>No data found.</Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  imageContainer: {
    position: 'relative',
    flexDirection: 'row',
  },
  noDataText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;
