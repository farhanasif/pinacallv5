import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import {MySVGImage} from '../assets/images/undraw_Select_re_3kbd.svg';
// import {Menu} from '../assets/images/menu.svg';

import Title from '../components/HomeScreen/Title';
import Button from '../components/HomeScreen/Button';

const MySVGSize = 160;
const MenuSize = 24;

export default function HomeScreen({navigation}) {

  const _onMenuPress = () => {
    navigation.openDrawer();
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
          <Title headerText="Welcome Farhan," description="Choose the type of service you are interested in"/>
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
    paddingHorizontal: 10
  },
});