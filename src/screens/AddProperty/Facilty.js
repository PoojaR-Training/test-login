import RadioGroup from 'react-native-radio-buttons-group';
import React, {useEffect, useState, useMemo} from 'react';
import {
  Image,
  Text,
  View,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
export default function Facility() {
  const navigation = useNavigation();
  const route = useRoute();
  const arr = route.params.arr;
  const type = arr[1];
  const windowHeight = Dimensions.get('window').height;
  const radioButtons = useMemo(
    () => [
      {
        id: '0',
        label: 'Yes',
        value: 'yes',
      },
      {
        id: '1',
        label: 'No',
        value: 'no',
      },
    ],
    [],
  );

  const [wifiselected, setwifiSelected] = useState('1');
  const [lanselected, setlanSelected] = useState('1');
  const [acselected, setacSelected] = useState('1');
  const [dryerselected, setdryerSelected] = useState('1');
  const [tvselected, settvSelected] = useState('1');
  const [washingmachineselected, settmachineseSelected] = useState('1');
  const [furnitureselected, setfurnitureSelected] = useState('1');
  const [kitchenAppliancesselected, setKitchenAppliancesSelected] = useState('1');
  const [kitchenSelected, setkitchenSelected] = useState('1');
  const [elevatorSelected, setelevatorSelected] = useState('1');
  const [housekeeperSelected, sethousekeeperSelected] = useState('1');
  const [laundrySelected, setlaundrySelected] = useState('1');
  const [mealSelected, setmealSelected] = useState('1');
  const [breakfastSelected, setbreakfastSelected] = useState('1');
  const [parkingSelected, setparkingSelected] = useState('1');
  const [seaviewSelected, setseaviewSelected] = useState('1');
  const [securitycameraSelected, setsecuritycameraSelected] = useState('1');

  console.log(wifiselected, 'security');
  const navigate = () => {
    arr.push({freeWifi: wifiselected});
    arr.push({lanConnections: lanselected});
    arr.push({AC: acselected});
    arr.push({washingMachine: washingmachineselected});
    arr.push({dryer: dryerselected});
    arr.push({furniture: furnitureselected});
    arr.push({TV: tvselected});
    arr.push({kitchenAppliances: kitchenAppliancesselected});
    arr.push({elevator:elevatorSelected});
    arr.push({housekeeping:housekeeperSelected});
    arr.push({laundry: laundrySelected});
    arr.push({meals: mealSelected});
    arr.push({breakfast: breakfastSelected});
    arr.push({seaview :seaviewSelected});
    arr.push({freeparking: parkingSelected});
    arr.push({kitchen: kitchenSelected});
    arr.push({securitycamera: securitycameraSelected});
    // console.log(arr);
    navigation.navigate('Owner', {arr});
  };
  console.log(type.type, 'type');
  return (
    <View style={{flex: 1, backgroundColor: '#9bbad1'}}>
      <View style={{backgroundColor: '#9bbad1', marginTop: windowHeight / 20}}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            margin: 10,
          }}>
          Add Your Property on Rent
        </Text>
      </View>
      <View style={{backgroundColor: '#dce3e8', flex: 1}}>
        <View style={{margin: 15}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
            Select Property Facilities
          </Text>
        </View>
        <ScrollView>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Free Wifi</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setwifiSelected}
              selectedId={wifiselected}
              layout="row"
            />
          </View>
          <View style={styles.separator} />

          <View style={styles.rowContainer}>
            <Text style={styles.label}>LAN Connection</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setlanSelected}
              selectedId={lanselected}
              layout="row"
            />
          </View>
          <View style={styles.separator} />

          <View style={styles.rowContainer}>
            <Text style={styles.label}>Furniture</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setfurnitureSelected}
              selectedId={furnitureselected}
              layout="row"
            />
          </View>
          <View style={styles.separator} />

          <View style={styles.rowContainer}>
            <Text style={styles.label}>Air Conditioner</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setacSelected}
              selectedId={acselected}
              layout="row"
            />
          </View>
          <View style={styles.separator} />

          {type.type == 'farm' ? null : (
            <>
              <View style={styles.rowContainer}>
                <Text style={styles.label}>Washing Machine</Text>
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={settmachineseSelected}
                  selectedId={washingmachineselected}
                  layout="row"
                />
              </View>
              <View style={styles.separator} />
              <View style={styles.rowContainer}>
                <Text style={styles.label}>Television</Text>
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={settvSelected}
                  selectedId={tvselected}
                  layout="row"
                />
              </View>
              <View style={styles.separator} />
              <View style={styles.rowContainer}>
                <Text style={styles.label}>Dryer</Text>
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={setdryerSelected}
                  selectedId={dryerselected}
                  layout="row"
                />
              </View>
              <View style={styles.separator} />
            </>
          )}

          <View style={styles.rowContainer}>
            <Text style={styles.label}>Kitchen Appliances</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setKitchenAppliancesSelected}
              selectedId={kitchenAppliancesselected}
              layout="row"
            />
          </View>
          <View style={styles.separator} />
          {type.type == 'flat' ? (
            <>
              <View style={styles.rowContainer}>
                <Text style={styles.label}>Elevator</Text>
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={setelevatorSelected}
                  selectedId={elevatorSelected}
                  layout="row"
                />
              </View>
              <View style={styles.separator} />
            </>
          ) : null}

          <View style={styles.rowContainer}>
            <Text style={styles.label}>House Keeper</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={sethousekeeperSelected}
              selectedId={housekeeperSelected}
              layout="row"
            />
          </View>
          <View style={styles.separator} />
          {
            (type.type== 'pg')?<>
              <View style={styles.rowContainer}>
            <Text style={styles.label}>Laundry</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setlaundrySelected}
              selectedId={laundrySelected}
              layout="row"
            />
          </View>
          <View style={styles.separator} />

          <View style={styles.rowContainer}>
            <Text style={styles.label}>Meal</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setmealSelected}
              selectedId={mealSelected}
              layout="row"
            />
          </View>
          <View style={styles.separator} />

          <View style={styles.rowContainer}>
            <Text style={styles.label}>Breakfast</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setbreakfastSelected}
              selectedId={breakfastSelected}
              layout="row"
            />
          </View>
          <View style={styles.separator} />

          <View style={styles.rowContainer}>
            <Text style={styles.label}>Ready to cook Kitchen</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setkitchenSelected}
              selectedId={kitchenSelected}
              layout="row"
            />
          </View>
          <View style={styles.separator} />

            </>:null
          }
        
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Sea Side Facing</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setseaviewSelected}
              selectedId={seaviewSelected}
              layout="row"
            />
          </View>
          <View style={styles.separator} />

          <View style={styles.rowContainer}>
            <Text style={styles.label}>Parking</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setparkingSelected}
              selectedId={parkingSelected}
              layout="row"
            />
          </View>
          <View style={styles.separator} />

          <View style={styles.rowContainer}>
            <Text style={styles.label}>Security Camera</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setsecuritycameraSelected}
              selectedId={securitycameraSelected}
              layout="row"
            />
          </View>
          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={() => navigate(arr)}>
            <Text style={styles.signintxt}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  txtbox: {
    height: 55,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
  },

  buttonstyle: {
    borderRadius: 10,
    height: 55,
    margin: 12,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    // top: 20,
  },

  signintxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginLeft: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
