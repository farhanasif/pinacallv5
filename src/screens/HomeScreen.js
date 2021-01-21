import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Title from '../components/HomeScreen/Title';
import Button from '../components/HomeScreen/Button';

const MySVGSize = 160;
const MenuSize = 24;

export default function HomeScreen ({navigation}) {


  const _onMenuPress = () => {
    navigation.openDrawer();
  }


  const [mobile, setMobile] = useState('');
  const [iscall, setIsCall] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [counter, setCounter] = useState(0);
  const [second, setSecond] = useState('00');
  const [call_id, setCall] = useState(0);

  const [msg, setmsg] = useState('A user requested for a call...')

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval( async() => {

        if(isActive == false){
          return () => clearInterval(intervalId);
        }
        else{
          console.log(counter)
          const secondCounter = counter;
          const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
          setSecond(computedSecond);

          if(mobile == '01717428261'){
            let response = await fetch(
              'http://103.108.144.246/pinacallapi/process.php',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mobile: mobile,
                        action: 'getnotifyForCall'
                    }),
                }
            );

            let responseJson = await response.json();
            console.log(responseJson[0].sender_mobile);
            if(responseJson[0].status == 0 && responseJson[0].sender_mobile !== ''){
              setIsActive(false);
              setCall(responseJson[0].id)
            }

          }



          console.log('counter', counter)
        }

        setCounter(counter => counter + 1);
      }, 3000)
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter])
  //const [mobile, setMobile] = useState('234324')

  const getMobile = async() => {
    const value = await AsyncStorage.getItem('@mobile')
    setMobile(value)
    console.log('mobile ',value);
  }

  getMobile();

  const joinCall = async() => {

    let response = await fetch(
      'http://103.108.144.246/pinacallapi/process.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile: mobile,
                id: call_id,
                action: 'updateJoiningCall'
            }),
        }
    );

    setIsActive(true);
    setCall(0)
    navigation.navigate('JoinCall')
  }

  return (
    <View style={{flex:1}}>
      <View style={{ flex: 1,}}>
        <View style={styles.header}>
          <Image
            style={{height: 140, width: 140}}
            source={require('../assets/images/pinacall_final_01.png')}
          />
        </View>
        <View>
          <Title headerText={"Welcome "+ mobile + ","} description="Choose the type of service you are interested in"/>
          <Title headerText="DISCOVER PINACALL" description="What you are looking for?"/>
          <View style={styles.row}>
            <Button iconName="phone" buttonTitle="Pin a Call" navigation={navigation}/>
            <Button iconName="shopping-bag" buttonTitle="Window Shopping" navigation={navigation}/>
            <Button iconName="hotel" buttonTitle="Hotel Booking" navigation={navigation}/>
            <Button iconName="user-shield" buttonTitle="Expert Advise" navigation={navigation}/>
          </View>
          <View style={styles.row}>
            <Button iconName="eye" buttonTitle="3rd Eye" navigation={navigation}/>
            <Button iconName="hands-helping" buttonTitle="SOS" navigation={navigation}/>
          </View>
        </View>
        <View style={styles.row}>
          <Text>{isActive ? second : ''}</Text>
          <Text style={{marginTop: 10, marginLeft: 10}}>{!isActive ? msg : ''}</Text>
          {!isActive ?
            <TouchableOpacity onPress={joinCall} style={styles.button}>
                <Text style={styles.buttonText}> Join Call </Text>
            </TouchableOpacity> : <View></View>}
        </View>
      </View>
      {/* <View style={{ position : 'absolute', bottom: 0, right: 0}}>
        <MySVGImage width={MySVGSize} height={MySVGSize}/>
      </View>
      <View style={{ position : 'absolute', top: 48, right: -40,}}>
        <TouchableOpacity
          onPress={_onMenuPress}
        >
          <Menu width={MySVGSize} height={MenuSize}/>
        </TouchableOpacity>

      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F60C5D',
    borderRadius: 25,
    color: '#fff',
    marginLeft: 10
  },
  buttonText: {
    color: '#fff'
  }
});