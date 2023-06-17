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
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../consts/colors';
const {width} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
import DatePicker from 'react-native-date-picker';
import {useForm, Controller} from 'react-hook-form';
const RentNowScreen = () => {
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const route = useRoute();
  const id = route.params.id;
  const [date, setDate] = useState(new Date());
  const [dateTimeOpen, setDateTimeOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [selectedRentFrom, setSelectedRentFrom] = useState(null);
  const [selectedRentTo, setSelectedRentTo] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    console.log('open modal');
    return (
      <Modal visible={isChecked} onRequestClose={closeModal}>
        <View style={styles.centerView}>
          <View style={styles.modalView}>
          <View
                style={{
                  flex: 1,
                  margin: 5,
                  marginLeft: 0,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={styles.input}
                  placeholder={'Select Date to Rent FROM'}
                  editable={false}
                  value={
                    selectedRentFrom
                      ? `Rent From: ${convert(selectedRentFrom.toString())}`
                      : ''
                  }
                  onPressIn={() => {
                    setOpen(!open);
                    setActiveField('from');
                  }}
                />

                <TextInput
                  style={styles.input}
                  placeholder={'Select Date to Rent TO'}
                  editable={false}
                  value={
                    selectedRentTo
                      ? `Rent To: ${convert(selectedRentTo.toString())}`
                      : ''
                  }
                  onPressIn={() => {
                    setOpen(!open);
                    setActiveField('to');
                  }}
                />

                <TextInput
                  style={styles.input}
                  placeholder={'Select Date and time for metting'}
                  editable={false}
                  value={selectedTime ? `Meeting time: ${selectedTime}` : ''}
                  onPressIn={() => {
                    setDateTimeOpen(!dateTimeOpen);
                  }}
                />

                <TouchableOpacity
                  style={styles.btncontainer}
                  onPress={navigate}>
                  <Text style={styles.byntxt}>Send Email to Owner </Text>
                </TouchableOpacity>
                {open && (
                  <DatePicker
                    modal={true}
                    date={date}
                    onDateChange={setDate}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    open={open}
                    onCancel={() => {
                      setOpen(false);
                    }}
                    minimumDate={new Date()}
                    //maximumDate={endOfYear(new Date())}
                  />
                )}
                {dateTimeOpen && (
                  <DatePicker
                    modal
                    open={dateTimeOpen}
                    date={date}
                    onConfirm={date => {
                      setDateTimeOpen(false);
                      setSelectedTime(date);
                    }}
                    onCancel={() => {
                      setDateTimeOpen(false);
                    }}
                  />
                )}
              </View>

            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    );
    //setModalVisible(true);
  };

  const closeModal = () => {
    setIsChecked(false);
  };

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

  useEffect(() => {
    getApiData();
  }, []);
  const handleDateConfirm = date => {
    setOpen(false);
    if (activeField === 'from') {
      setSelectedRentFrom(date);
    } else if (activeField === 'to') {
      if (selectedRentFrom && date > selectedRentFrom) {
        setSelectedRentTo(date);
      } else {
        console.log('Invalid "Rent To" date');
        Alert.alert('Invalid Date', 'Please select a valid date');
      }
    }
  };
  const convert = str => {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  };

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const navigate = async () => {
    try {
      if (
        selectedRentFrom == null ||
        selectedRentTo == null ||
        selectedTime == null
      ) {
        Alert.alert('Please select Date & Time');
      } else {
        const token = await AsyncStorage.getItem('token');
        const id = await AsyncStorage.getItem('id');
        const response = await fetch(
          `http://192.168.200.136:8000/users/userbyid/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          },
        );

        const result = await response.json();
        //console.log(result.username,'res');

        const arr = [];
        arr.push({name: result.username});
        arr.push({email: result.email});
        arr.push({from: convert(selectedRentFrom)});
        arr.push({to: convert(selectedRentTo)});
        arr.push({time: selectedTime});
        arr.push({property: capitalizeFirstLetter(data && data.type)});
        arr.push({location: capitalizeFirstLetter(data && data.location)});
        console.log(arr);
        sendRequest(arr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendRequest = async arr => {
    try {
      console.log(arr);
      const owneremail = data && data.owneremail;
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        `http://192.168.200.136:8000/property/sendrequest/${owneremail}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(arr),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.error) {
        // Alert.alert('Error','Something went wrong Please try again')
        console.log('errors.....');
      } else {
        Alert.alert('Success', 'Success');
        console.log('successssss');
      }
    } catch (error) {
      console.log(error);
    }
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
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailHome', {id})}>
          <Image
            style={{height: 35, width: 35, margin: 5}}
            source={require('../../assets/left-arrow.png')}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>Renting Details</Text>
      </View>
      <View style={{flex: 1, backgroundColor: '#dce3e8'}}>
        <ScrollView>
          {data && (
            <>
              <View style={styles.table}>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.text}>Property Title</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.data}>{data.title}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.text}>Property Type</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.data}>
                      {capitalizeFirstLetter(data.type)}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.text}>Property Location</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.data}>
                      {capitalizeFirstLetter(data.location)}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.text}>Owner Name</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.data}>
                      {capitalizeFirstLetter(data.ownername)}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.text}>Owner Email</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.data}>{data.owneremail}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.text}>Owner Contact</Text>
                  </View>
                  <View style={[styles.column]}>
                    <Text style={styles.data}>{data.ownercontact}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.text}>Monthly Rent</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.data}>${data.price}</Text>
                  </View>
                </View>
              </View>
            </>
          )}

          <View style={{margin: 10}}>
            <CheckBox
              isChecked={isChecked}
              onClick={() => setIsChecked(!isChecked)}
              rightText="If you are really interested in this property, please schedule a meeting with the owner"
              rightTextStyle={{fontSize: 15, color: 'black'}}
            />
          </View>
          {isChecked == true ? openModal() : null}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 15,
  },
  text: {
    fontSize: 16,
  },
  data: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 15,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderWidth: 1,
    width: '90%',
    margin:15,
    padding: 20,
    borderRadius: 15,
    justifyContent: 'center',
    //paddingHorizontal:20
  },
  byntxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btncontainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 65,
    width: '70%',
    borderRadius: 25,
    padding: 10,
    marginTop: 15,
  },
  error: {
    color: 'red',
    marginLeft: 15,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#adb5ba'
  },
  modalView: {
    padding: 10,
    margin: 10,
    width: '80%',
    borderRadius: 20,
    height: '80%',
   backgroundColor:'#fff',
  },
});

export default RentNowScreen;
