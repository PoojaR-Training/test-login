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
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import COLORS from '../../consts/colors';
const {width} = Dimensions.get('screen');
const DetailHomeScreen = () => {
  const route = useRoute();
  const [data, setData] = useState(null);
  const itemId = route.params.id;

  let result;

  const getApiData = async () => {
    result = await fetch(`http://192.168.200.136:8000/farm/getfarm/${itemId}`);
    result = await result.json();
    setData(result);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const InteriorCard = ({interior}) => {
    return <Image source={{uri:interior}} style={style.interiorImage} />;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data && (
          <View style={style.backgroundImageContainer}>
            <ImageBackground
              style={style.backgroundImage}
              source={{uri: data.coverimage}}></ImageBackground>
          </View>
        )}

        <View style={style.detailsContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {data && (
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {data.title}
              </Text>
            )}

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={style.ratingTag}>
                <Text style={{color: COLORS.white}}>4.8</Text>
              </View>
              <Text style={{fontSize: 13, marginLeft: 5}}>155 ratings</Text>
            </View>
          </View>
          <View style={style.facility}>
            {data && <Text style={style.facilityText}>{data.address}</Text>}
          </View>
          {data && <Text style={{fontSize: 16}}>{data.location}</Text>}
          {data && <Text style={{marginTop: 20}}>{data.description}</Text>}

          <FlatList
            contentContainerStyle={{marginTop: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={data && data.farmimages} // Updated data prop
            renderItem={({item}) => <InteriorCard interior={item} />}
          />
          <View style={style.footer}>
            <View>
              {data && (
                <Text
                  style={{
                    color: COLORS.blue,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  ${data.price}
                </Text>
              )}

              <Text
                style={{fontSize: 12, color: COLORS.grey, fontWeight: 'bold'}}>
                Total Price
              </Text>
            </View>
            <View style={style.bookNowBtn}>
              <Text style={{color: COLORS.white}}>Book Now</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    height: 350,
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
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
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
  facility: {flexDirection: 'row', marginTop: 10},
});

export default DetailHomeScreen;
