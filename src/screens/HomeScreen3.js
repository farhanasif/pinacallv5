import React, {useState, useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native';
import { COLORS } from '../assets/utils/colors';
import { Appbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons }  from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function HomeScreen3({navigation}) {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => navigation.openDrawer();
  const [animation, setAnimation] = useState(new Animated.Value(0));


  const handleAnimation = () => {
    Animated.timing(animation, {
      toValue:1,
      duration: 1000,
      useNativeDriver: false,
    }).start( () => {
      Animated.timing(animation,{
        toValue:0,
        duration: 1000,
        useNativeDriver: false,
      }).start()
    })
  }

  const boxInterpolation =  animation.interpolate({
    inputRange: [0, 1],
    outputRange:[COLORS.pinacall_middle , COLORS.pinacall_pink]
  })
  
  const animatedStyle = {
    backgroundColor: boxInterpolation
  }

  useEffect(() => {    
    handleAnimation()
  });

  return (
    <View style={{ flex: 1,}}>
      <View style={styles.header}>
        <Image
          style={{height: 140, width: 140}}
          source={require('../assets/images/pinacall_final_01.png')}
        />
      </View>
      
      <View>
        <View style={{ alignItems: 'flex-start', paddingLeft: 20, paddingTop: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: '700'}}>Welcome Farhan,</Text>
          <Text style={{ fontWeight: '300', color: '#414141'}}>Choose the type of service you are interested</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: 12}}>
          <Animated.View style={{...styles.box, ...animatedStyle}} >
            <MaterialCommunityIcons name="phone" size={55} color="white" />
            <Text style={{marginTop: 40, fontSize: 14, fontWeight: '700', color: '#FFF'}}>PIN A CALL</Text>
          </Animated.View>
          <View style={{
            borderColor: COLORS.pinacall_middle,
            borderWidth: 3,
            width: windowWidth/2 - 30,
            borderRadius: 10,
            height: 170,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.pinacall_orange,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
          }}>
            <FontAwesome5 name="shopping-bag" size={55} color="white" />
            <Text style={{marginTop: 40, fontSize: 14, fontWeight: '700', color: '#FFF'}}>WINDOW SHOPPING</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: 30}}>
          <View style={{
            borderColor: COLORS.orange2,
            borderWidth: 3,
            width: windowWidth/2 - 30,
            borderRadius: 10,
            height: 170,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.orange2,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}>
            <FontAwesome5 name="hotel" size={55} color="white" />
            <Text style={{marginTop: 40, fontSize: 14, fontWeight: '700', color: '#FFF'}}>HOTEL BOOKING</Text>
          </View>
          <View style={{
            borderColor: COLORS.pinacall_pink,
            borderWidth: 3,
            width: windowWidth/2 - 30,
            borderRadius: 10,
            height: 170,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.pinacall_pink,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}>
            <MaterialCommunityIcons name="account-box-outline" size={55} color="white" />
            <Text style={{marginTop: 40, fontSize: 14, fontWeight: '700', color: '#FFF'}}>EXPERT ADVISE</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 30, paddingLeft: 18}}>
          <View style={{
            borderColor: COLORS.blue,
            borderWidth: 3,
            width: windowWidth/2 - 30,
            borderRadius: 10,
            height: 170,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.blue,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}>
            <MaterialCommunityIcons name="eye" size={55} color="white" />
            <Text style={{marginTop: 40, fontSize: 14, fontWeight: '700', color: '#FFF'}}>3RD EYE</Text>
          </View>
          
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },  
  box: {
    borderWidth: 0,
    width: windowWidth/2 - 30,
    borderRadius: 10,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pinacall_middle,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  }
});