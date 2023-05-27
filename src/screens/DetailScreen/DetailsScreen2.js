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
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../consts/colors';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('screen');
const DetailsScreen2 = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const getApiData = async () => {
    let result = await fetch('http://192.168.200.136:8000/apartment/getapartment');
    result = await result.json();
    setData(result);
  };

  useEffect(() => {
    getApiData();
  }, []);
  const handleCard = id => {
    console.log(id);
    navigation.navigate('DetailHome',{
      id
    });
  };
  const Card = ({houses}) => {
    return (
      <View style={style.card}>
        <TouchableOpacity onPress={() => handleCard(houses._id)}>
          <Image source={{uri: houses.coverimage}} style={style.cardImage} />
          <View style={{marginTop: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {houses.title}
              </Text>
              <Text
                style={{fontWeight: 'bold', color: COLORS.blue, fontSize: 16}}>
                ${houses.price}
              </Text>
            </View>
            <Text style={{fontSize: 14, marginTop: 5}}>{houses.location}</Text>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <Text>{houses.address}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: '#d5e0e8', flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          snapToInterval={width - 20}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          data={data}
          renderItem={({item}) => (
            <Card houses={item} keyExtractor={item => item._id} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  card: {
    height: 320,
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
});

export default DetailsScreen2;
