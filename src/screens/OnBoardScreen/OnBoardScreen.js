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
} from 'react-native';
import COLORS from '../../consts/colors';
const images = new Array(6).fill(
  '/Users/imac17/Documents/training/React-native/test/src/assets/onboardImage.jpg',
);

const OnBoardScreen = ({navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const {width: windowWidth} = useWindowDimensions();

  return (
    <View style={{flex: 1,backgroundColor:"#d5e0e8"}}>
      <StatusBar translucent backgroundColor={COLORS.tranparent} />
      <View style={{flex: 1.5, marginTop: 20}}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],[])}
          scrollEventThrottle={1}>
          {images.map((image, imageIndex) => {
            return (
              <View style={{width: windowWidth, height: 150}} key={imageIndex}>
                <Image source={{uri: image}} style={styles.card} />
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, {width}]}
              />
            );
          })}
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 20}}>
        
          <View>
            <Text style={styles.title}>Find your</Text>
            <Text style={styles.title}>sweet home</Text>
          </View>

     
          <View style={{marginTop: 10}}>
            <Text style={styles.textStyle}>
              Schedule visits in just a few clicks
            </Text>
            <Text style={styles.textStyle}>visit in just a few clicks</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: 40,
          }}>
          
          <Pressable onPress={() => navigation.navigate('HomeScreen')}>
            <View style={styles.btn}>
              <Text style={{color: 'white'}}>Get Started</Text>
            </View>
          </Pressable>
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
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  title: {fontSize: 32, fontWeight: 'bold'},
  textStyle: {fontSize: 16, color: COLORS.black},
});

export default OnBoardScreen;
