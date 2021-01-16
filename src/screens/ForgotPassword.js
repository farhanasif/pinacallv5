import * as React from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../assets/utils/colors';

const ForgotPassword = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/pinacall_final_01.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <Text style={{fontSize: 17, fontFamily: 'Roboto' , color: COLORS.pinacall_pink}}>Forgot your password?</Text>
      <View>
        <View style={styles.searchSection}>
            <Entypo style={styles.searchIcon} name="mail" size={24} color={COLORS.pinacall_pink}/>
            <TextInput
                style={styles.input}
                placeholder="Enter your gmail"
                underlineColorAndroid={COLORS.pinacall_pink}
            />
        </View>
        <Button
          title="Send reset link"
          icon={
            <FontAwesome
              name="sign-in"
              size={15}
              color="white"
              style={{marginRight: 10}}
            />
          }
          buttonStyle={{marginTop: 20}}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#E7412B','#F50B5E','#CF005F', '#9A0F3C'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />
        <Button
          title="Login here..."
          type="clear"
          titleStyle={{ color: COLORS.pinacall_pink}}
          onPress={() => navigation.navigate('Signin')}
          buttonStyle={{minWidth:200}}
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
    justifyContent: 'center',
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
      paddingLeft: 0,
      backgroundColor: COLORS.white,
      color: COLORS.placeholder,
      fontSize: 15,
      minWidth: 200
  },
});

export default ForgotPassword;