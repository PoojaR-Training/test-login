import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import SPACING from '../../config/SPACING';
import colors from '../../config/colors';
import DATA from '../../config/DATA';
import DetailsScreen1 from '../DetailScreen/DetailsScreen1';
import SearchScreen from '../SearchScrren/SearchScreen';

const Header = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#9bbad1' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.22, backgroundColor: '#9bbad1' }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginTop: 10 }}>
            <View style={styles.searchInputContainer1}>
              <TextInput
                placeholder="Search by city"
                style={{ fontSize: 14 }}
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={() => setSearch(input)}
              />
              {input.length > 0 && (
                <TouchableOpacity onPress={() => setSearch(input)} style={styles.searchicon}>
                  <Image
                    source={require('../../assets/search2.png')}
                    style={{ width: 20, height: 20,  }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>



          <ScrollView horizontal showsHorizontalScrollIndicator={false}  contentContainerStyle={{alignItems:'center'}}>
            {DATA.map((category, index) => (
              <TouchableOpacity
                style={styles.headerScroll }
                key={index}
                onPress={() => setActiveCategory(index)}>
                <Text
                  style={[
                    {
                      fontSize: SPACING * 1.7,
                      fontWeight: '600',
                      color: colors.gray,
                    },
                    activeCategory === index && {
                      color: colors.black,
                      fontWeight: '700',
                      fontSize: SPACING * 1.8,
                    },
                  ]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{flex: 1}}>
        
          {
            
            (!input)?<DetailsScreen1 activeCategory={activeCategory}/>:
            search?<SearchScreen search={search} activeCategory={activeCategory}/>:<DetailsScreen1 activeCategory={activeCategory}/>
          }
     
        </View>
      
                
     </View>
  
      </SafeAreaView>
    );
  };
  
 
  
  const styles = StyleSheet.create({
    headerScroll:{
      marginRight: SPACING * 2,
      marginLeft: SPACING * 1,
    },
    searchInputContainer1: {
      flex:1,
      backgroundColor: 'white',
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      padding: Platform.OS=='ios'? 10:5,
      borderRadius: 20,
      borderColor: 'black',
      borderWidth: 1,
      marginLeft: 10,
      marginRight: 10,
    },
    bottomTabIcon: {
      height: 30,
      width: 30,
    },
    bottomTabIcon2: {
      height: 22,
      width: 22,
    },
    footer: {
      flexDirection: 'row',
      padding: 10,
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    tabBar: {
      //backgroundColor: colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    searchicon:{
      flex:1,
      justifyContent:'flex-end',
      alignItems:'flex-end'
    }
  });
  export default Header;