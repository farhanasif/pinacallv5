import * as React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Signin from './src/screens/Signin';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import HomeScreen from './src/screens/HomeScreen';
import QueryScreen from './src/screens/QueryScreen';
import MapScreen from './src/screens/MapScreen';

import { DrawerContent } from './src/components/DrawerContent';

const Drawer = createDrawerNavigator();

function rootDrawer(){
  return(
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{headerShown: false,}}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Query" component={QueryScreen} />
      <Drawer.Screen name="Map" component={MapScreen} />
    </Drawer.Navigator>
  )
}


const Stack = createStackNavigator();


function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin" >
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false,}}/>
        <Stack.Screen name="Root" component={rootDrawer} options={{headerShown: false,}}/>
        <Stack.Screen name="Signin" component={Signin} options={{headerShown: false,}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;