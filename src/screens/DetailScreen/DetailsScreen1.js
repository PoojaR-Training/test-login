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
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import COLORS from '../../consts/colors';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('screen');
const DetailsScreen1 = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const getApiData = async () => {
    let result = await fetch('http://192.168.200.136:8000/home/gethome');
    result = await result.json();
    setData(result);
  };

 useEffect(() => {
    getApiData();
  }, []);
  const handleCard = id => {
    navigation.navigate('DetailHome',{
      id
    });
  };
  const Card = ({houses}) => {
    return (
      <View style={style.card}>
        <TouchableOpacity onPress={() => handleCard(houses._id)}>
          
        <View style={style.imageContainer}>
            <ImageBackground
              source={{ uri: houses.coverimage }}
              style={style.cardImage}
              resizeMode="cover"
            />
            <View style={style.heartIconContainer}>
              
            <SvgUri
              style={style.heartIcon}
              uri="https://img.uxwing.com/wp-content/themes/uxwing/download/relationship-love/heart-thin-icon.svg"
              fill="white"
              backgroundColor="white"
            />
            </View>
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
                style={{fontWeight: 'bold', color: COLORS.blue, fontSize: 18}}>
                ${houses.price}
              </Text>
            </View>
            <Text style={{fontSize: 16, marginTop: 5}}>{houses.location}</Text>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <Text style={{fontSize:16}}>{houses.address}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:"#9bbad1"}}>
        <View>
      <FlatList
          snapToInterval={width - 20}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          data={data}
          renderItem={({item}) => <Card houses={item}/>
        }
        />
     
      </View>
    
      </ScrollView>
  
    </View>
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
  overlay: {

  },
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
    tintColor:'white',
    
    
  },
  heartIconContainer: {
backgroundColor :'white',

  },
});

export default DetailsScreen1;
