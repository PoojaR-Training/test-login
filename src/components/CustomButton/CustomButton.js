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
    marginLeft: 10,
    height: 50,
    width: '90%',
    borderRadius: 5,
    padding: 5,
    margin :3
  
  },
  container_PRIMARY: {
    backgroundColor: '#3b72f3',
  },
  container_TERTIARY: {},
  container_SECONDARY: {
    borderColor: '#3b72f3',
    borderWidth: 2,
  },
  txt: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txt_SECONDARY: {
    color: '#3b72f3',
  },
  txt_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;
