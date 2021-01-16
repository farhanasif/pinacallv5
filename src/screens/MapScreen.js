import React, {useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import * as Location from 'expo-location';
import pin_green from '../assets/images/pin-green-icon.png';
import pin_red from '../assets/images/pin-red-icon.png';


export default function MapScreen () {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [nearby, setNearbyofferslist] = useState(null);

  const _fetchData = async() => {
    try {
        let response = await fetch(
            'http://103.108.144.246/pinacallapi/process.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: region.latitude,
                    longitude: region.longitude,
                    action: 'getNearByRange'
                }),
            }
        );

        let responseJson = await response.json();
        console.log(responseJson);
        setNearbyofferslist(responseJson);
        
    } 
    catch (error) {
        alert('An error occured during api data fetch: '+error);
    }
}


  useEffect(() => {
    (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        //console.log(location);
        setLocation(location);
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      console.log(location)
    }

    const _onPress = (e) => {
      console.log(e.nativeEvent.coordinate);
      let region = {
          latitude:       e.nativeEvent.coordinate.latitude,
          longitude:      e.nativeEvent.coordinate.longitude,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5
      }

      setRegion(region);

    }

    const _checkNearByData = async() =>{
      alert(region.longitude);
      if(region){
        await _fetchData();
      }
    }

    return (
      <View style={styles.container}>
        { region ? (
          <MapView 
              style={styles.mapStyle}
              region={region}
              followUserLocation={true}
              onPress={(e) => _onPress(e)}
          >
            <MapView.Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
            >
              <Image
                  source={require('../assets/images/pin-red-icon.png')}
                  style={{ width: 28, height: 28 }}
              />
            </MapView.Marker>
            {nearby ? nearby.map((marker, index) => (
                <MapView.Marker 
                    coordinate={{
                    latitude: parseFloat(marker.latitude),
                    longitude: parseFloat(marker.longitude),
                }}
                key={index}
                >
                  <Image
                    source={require('../assets/images/pin-green-icon.png')}
                    style={{ width: 28, height: 28 }}
                  />
                </MapView.Marker>
            )) : <View></View>
          }
          </MapView>
        ): <View></View>}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => _checkNearByData()}
            style={styles.button}>
            <Text style={styles.buttonItem}>SEARCH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('pressed')}
            style={styles.button}>
            <Text style={styles.buttonItem}>CALL</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 30,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  button: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(246,12,93,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,

  },

  buttonItem: {
    textAlign: 'center',
    fontWeight: '700',
    color: 'white'
  },
});
