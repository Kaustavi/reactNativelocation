/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

 // import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Platform
} from 'react-native';

 //import all the components we are going to use.
 import Geolocation from '@react-native-community/geolocation';
import {firebaseRef, geoFire} from './firebase';
import DeviceInfo from 'react-native-device-info';
import {ref, onValue} from 'firebase/database';
 
 const App = () => {
   const [coordinate, setCoordinate] = useState({latitude: 0, longitude: 0});

   const deviceInfo = DeviceInfo.getDeviceId();

  function storedData() {
    var geoQuery = geoFire.query({
      center: [coordinate.latitude, coordinate.longitude],
      radius: 10.5,
    });
    geoFire.set(deviceInfo, geoQuery.center()).then(
        function () {
          console.log('Provided key has been added to GeoFire');
        },
        function (error) {
          console.log('Error: ' + error);
        },
     );
    
   }

   function getStoredData() {
    const locationRef = ref(
      firebaseRef,
      'geoLocation/-N3cvLhMPuyCYC0N4MgJ/k69v1_64',
    );
    onValue(locationRef, snapshot => {
      console.log('stored data: ' + snapshot.val());
    });
      
   }

  const getDynamicLocation = () => {
    Geolocation.watchPosition(
      position => {
        const newCoordinate = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        console.log(
          'my coordinate: ' + (newCoordinate.latitude, newCoordinate.longitude),
        );
        setCoordinate(newCoordinate);
      },
      {enableHighAccuracy: true, timeout: 30000, maximumAge: 1000},
    );
    storedData();
  };

   useEffect(() => {
    if (Platform.OS === 'ios') {
      getStoredData();
    } else {
      getDynamicLocation();
    }
   });
   return (
    <SafeAreaView style={{flex: 1}}>
       <View style={styles.container}>
        {coordinate !== (null || undefined) && (
          <MapView
              provider={PROVIDER_GOOGLE}
              style={{height: 300, width: '100%'}}
              region={{
                latitude: Number(coordinate.latitude),
                longitude: Number(coordinate.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onUserLocationChange={v => {
              setCoordinate(v.nativeEvent.coordinate);
              }}
              showsUserLocation>
            <MapView.Marker coordinate={coordinate} title="MyCoordinate" />
          </MapView>
        )}
        <View style={styles.container}>
           <Image
             source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
             }}
            style={{width: 100, height: 100}}
           />
           <Text style={styles.boldText}>Device coordinate</Text>
          <Text style={styles.boldText}>Longitude: {coordinate.longitude}</Text>
          <Text style={styles.boldText}>Latitude: {coordinate.latitude}</Text>
          <View style={{marginTop: 20}}>
            <Button title="Store to database" onPress={() => storedData()} />
           </View>
         </View>
       </View>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'white',
     padding: 10,
     alignItems: 'center',
     justifyContent: 'center',
   },
   boldText: {
     fontSize: 25,
     color: 'red',
     marginVertical: 16,
   },
 });
 
 export default App;
 
