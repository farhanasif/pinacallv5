import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../assets/utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


const screen = Dimensions.get("screen");
const WIDTH = screen.width;

const Signin = ({ navigation }) => {
  const [mobile, setMobile] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/pinacall_final_01.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <View style={{marginHorizontal: 10}}>
        <View style={styles.searchSection}>
            <Entypo style={styles.searchIcon} name="mobile" size={24}/>
            <TextInput
                style={styles.input}
                placeholder="MOBILE"
                underlineColorAndroid={COLORS.pinacall_pink}
                onChangeText={text => setMobile(text)}
                defaultValue={mobile}
            />
        </View>
        <View style={styles.searchSection}>
            <Entypo style={styles.searchIcon} name="keyboard" size={24}/>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="PASSWORD"
                underlineColorAndroid={COLORS.pinacall_pink}
            />
        </View>
        <Button
          title="Sign In"
          icon={
            <FontAwesome
              name="sign-in"
              size={15}
              color="white"
              style={{marginRight: 10}}
            />
          }
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#E7412B','#F50B5E','#CF005F', '#9A0F3C'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          buttonStyle={{marginTop: 20,}}
          onPress={async() => {
            //alert('success')
            if(mobile == ''){
              alert('enter mobile');
            }
            else{
              await AsyncStorage.setItem('@mobile', mobile);
              navigation.navigate('Root', { screen: 'Home' });
            }

          }}
        />
        <Button
          title="Sign In With Gmail"
          icon={
            <MaterialCommunityIcons
              name="gmail"
              size={15}
              color="white"
              style={{marginRight: 10}}
            />
          }
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#E7412B','#F50B5E','#CF005F', '#9A0F3C'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          buttonStyle={{marginTop: 10, width: 200}}
        />
        <Button
          title="Create a new account"
          type="clear"
          titleStyle={{ color: COLORS.pinacall_pink }}
          onPress={() => navigation.navigate('SignUp')}
        />
        <Button
          title="Forgot Password"
          type="clear"
          titleStyle={{ color: COLORS.pinacall_pink }}
          onPress={() => navigation.navigate('ForgotPassword')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 260,
    height: 250,
    marginTop: 0,
    alignSelf: "center"
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  searchIcon: {
      padding: 10,
      color: COLORS.pinacall_pink,
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 3,
      backgroundColor: COLORS.white,
      color: COLORS.placeholder,
      fontSize: 15
  },
});

export default Signin;