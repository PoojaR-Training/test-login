import React, {useRef} from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import COLORS from '../../consts/colors';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

const slides = [
  {
    image: 'https://res.cloudinary.com/dn1p21zgh/image/upload/v1685782343/onBoard/onboardImage_kmihqf.jpg',
  },
  {
    image: 'https://res.cloudinary.com/dn1p21zgh/image/upload/v1685782302/onBoard/onboard2_pi2mwq.webp'},
  {
    image: 'https://res.cloudinary.com/dn1p21zgh/image/upload/v1685782721/onBoard/white-and-brown-concrete-building_swf0lr.jpg',
  },
  {
    image: 'https://res.cloudinary.com/dn1p21zgh/image/upload/v1685782668/onBoard/exterior-home-walkway-home-exterior_slgkvm.jpg',
  },
];
const OnBoardScreen = () => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;

  //const {width: windowWidth} = useWindowDimensions();
  return (
    <View style={{flex: 1, backgroundColor: '#d5e0e8'}}>
      <View style={{flex: 1.5, marginTop: 5}}>
      
          <Swiper
            style={styles.wrapper}
            autoplay={true}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}>
            {slides.map((slide, index) => (
              <View style={styles.slide} key={index}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{uri: slide.image}} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textOverlay}>{slide.text}</Text>
                </View>
              </View>
            ))}
          </Swiper>
       
      </View>
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 20}}>
          <View>
            <Text style={styles.title}>Find your</Text>
            <Text style={styles.title}>sweet home</Text>
          </View>

          <View style={{marginTop: 10}}>
            <Text style={styles.textStyle}>
              Explore different
            </Text>
            <Text style={styles.textStyle}>Properties in just a few clicks</Text>
          </View>
        </View>

       
          {/*<Pressable onPress={() => navigation.navigate('SignIn')}>
            <View style={styles.btn}>
              <Text style={{color: 'white', fontSize: 17}}>Get Started</Text>
            </View>
        </Pressable>*/}
        
        <View style={{ flexDirection: 'row',  paddingVertical:15,marginLeft:20,top:50 }}>
          <TouchableOpacity
          onPress={ () => navigation.navigate('SignIn') }
            style={{ backgroundColor: 'black', padding: 10, width:150, borderRadius: 30, marginHorizontal: 15 }}
          >
            <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 18 }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
           onPress={ () => navigation.navigate('SignUp') }
            style={{ backgroundColor: '#FFF', padding: 10, width:150, borderRadius: 30, marginHorizontal: 2, borderWidth: 1, borderColor: '#0d47a1' }}
          >
            <Text style={{ textAlign: 'center', color: '#0d47a1', fontSize: 18 }}>Sign Up</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    marginHorizontal: 5,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: '100%',
  },

  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 5,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 10,
  },

  indicator: {
    height: 3,
    width: 30,
    backgroundColor: COLORS.grey,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  indicatorActive: {
    backgroundColor: COLORS.dark,
  },
  btn: {
    height: 60,
    marginHorizontal: 10,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  title: {fontSize: 32, fontWeight: 'bold'},
  textStyle: {fontSize: 18},
  image:{
height: '95%',
width: '100%',
marginBottom: -15
  },
  slide:{
    flex:1
  },
  imageContainer:{
alignContent: 'center',
alignItems: 'center',
  }
});

export default OnBoardScreen;
