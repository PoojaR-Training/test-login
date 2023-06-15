import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../consts/colors';
const {width} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';

const DetailHomeScreen = () => {
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState(null);
  const id = route.params.id;
  let result;
  const getApiData = async () => {
    const token = await AsyncStorage.getItem('token');
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
  const callme = () => {
    let phoneNumber = '01234567';
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const openComposer = () => {
  Linking.openURL('sms:+91234567')
  };

  const readmore = () => {
    navigation.navigate('PropertyDetails', {id});
  };

  useEffect(() => {
    getApiData();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  return (
    <View style={{flex: 1, backgroundColor: '#9bbad1'}}>
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: windowHeight / 35,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={{height: 35, width: 35,margin:5}}
            source={require('../../assets/left-arrow.png')}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          Property Details
        </Text>
      </View>
      <View style={{flex: 1, backgroundColor: '#dce3e8'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data && (
            <View style={style.backgroundImageContainer}>
              <ImageBackground
                style={style.backgroundImage}
                source={{uri: data.coverimage}}
                resizeMode="cover"
              />
            </View>
          )}

          <View style={style.detailsContainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {data && (
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                  {data.title}
                </Text>
              )}

              
            </View>

            <View style={style.location}>
              <Image
                style={{height: 30, width: 30, marginTop: 10}}
                source={require('../../assets/location.png')}
              />
              {data && (
                <Text style={{fontSize: 16, marginTop: 10}}>
                  {data.address},
                </Text>
              )}
            </View>

            {data && (
              <Text style={{fontSize: 16, marginLeft: 30}}>
                {capitalizeFirstLetter(data.location)}
              </Text>
            )}

            <View style={{borderWidth: 0.5, borderColor: 'grey', margin: 10}} />
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 22,
                  marginTop: 5,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                About
              </Text>
            
              {data && (
                <Text
                  style={{fontSize: 16, maxHeight: 90, textAlign: 'justify'}}>
                  {data && data.description.substring(0, 500)}
                </Text>
              )}
              <TouchableOpacity onPress={readmore}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={style.detailbtn}>Read More</Text>
                  <Image
                    source={require('../../assets/arrow-right.png')}
                    style={{height: 30, width: 30, marginTop: 16}}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <FlatList
              contentContainerStyle={{marginTop: 20}}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, key) => key.toString()}
              data={data && data.propertyimages}
              renderItem={({item}) => <InteriorCard interior={item} />}
            />

          
          </View>
        </ScrollView>
        <View style={style.footer}>
              <View>
                {data && (
                  <Text
                    style={{
                      color: COLORS.blue,
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    ${data.price}
                  </Text>
                )}
                <Text style={{fontSize: 14, fontWeight: '400'}}>
                  Total Price
                </Text>
              </View>
              <TouchableOpacity onPress={()=>navigation.navigate('Rent',{id})} >
                <View style={style.bookNowBtn}>
                  <Text style={{color: COLORS.white, fontSize: 16}}>
                    Rent Now
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
      </View>

      
    </View>
  );
};

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

const style = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    height: 350,
    position: 'relative',
    flexDirection: 'row',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },

  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    
    borderRadius: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
   
   backgroundColor:'#b0c5d4'
  },
  bookNowBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: {flex: 1, paddingHorizontal: 20, marginTop: 40},
  location: {flexDirection: 'row', marginTop: 10},

  backIcon: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
  backIconContainer: {
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    right: 280,
    bottom: 115,
  },
  detailbtn: {
    marginLeft: 200,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#dce3e8',
  },
  modalView: {
    padding: 10,
    margin: 10,
    width: '100%',
    borderRadius: 20,
    height: '90%',
   
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
});

export default DetailHomeScreen;
