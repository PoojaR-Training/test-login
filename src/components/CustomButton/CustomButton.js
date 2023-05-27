import {react} from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';

const CustomButton = ({onPress, txt, types = 'PRIMARY', bgcolor, fgcolor}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[
          style.container,
          style[`container_${types}`],
          bgcolor ? {backgroundColor: bgcolor} : {},
        ]}>
        <Text
          style={[
            style.txt,
            style[`txt_${types}`],
            fgcolor ? {color: fgcolor} : {},
          ]}>
          {txt}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    width: '90%',
    borderRadius: 5,
    padding: 4,
    
  
  },
  container_PRIMARY: {
    backgroundColor: 'black',
  },
  txt: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txt_SECONDARY: {
    color: '#3b72f3',
  },
  txt_TERTIARY: {
    color: '#5a6166',
  },
});

export default CustomButton;
