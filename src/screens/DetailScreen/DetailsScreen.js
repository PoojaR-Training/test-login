import React from 'react';
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
  StatusBar,
} from 'react-native';
import houses from '../../consts/houses';
import COLORS from '../../consts/colors';
const {width} = Dimensions.get('screen');
const DetailsScreen = () => {
  const Card = ({houses}) => {
    return (
     
        <View style={style.card}>
          <Image source={houses.image} style={style.cardImage} />
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
                $1,500
              </Text>
            </View>

 

            <Text style={{fontSize: 14, marginTop: 5}}>
              {houses.location}
            </Text>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={style.facility}>
                <Text style={style.facilityText}>2</Text>
              </View>
              <View style={style.facility}>
               
                <Text style={style.facilityText}>2</Text>
              </View>
              <View style={style.facility}>
                
                <Text style={style.facilityText}>100m</Text>
              </View>
            </View>
          </View>
        </View>
   
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: "#d5e0e8", flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
   
        <FlatList
          snapToInterval={width - 20}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
         
          data={houses}
          renderItem={({item}) => <Card houses={item}/>
        }
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
    marginBottom:15
  },
  cardImage: {
    width: '100%',
    height: 190,
    borderRadius: 15,
  },
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5},
});

export default DetailsScreen;
