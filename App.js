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
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';

 //import all the components we are going to use.
 import Geolocation from '@react-native-community/geolocation';
 
 const App = () => {
   const [currentLongitude, setCurrentLongitude] = useState(0);
   const [currentLatitude, setCurrentLatitude] = useState(0);
   const [locationStatus, setLocationStatus] = useState('');

 
   const getOneTimeLocation = () => {
     setLocationStatus('Getting Location ...');
     Geolocation.requestAuthorization();
     Geolocation.getCurrentPosition(
       //Will give you the current location
      position => {
         setLocationStatus('You are Here');
         const currentLongitude = JSON.stringify(position.coords.longitude);
         //getting the Longitude from the location json
         const currentLatitude = JSON.stringify(position.coords.latitude);
         //getting the Latitude from the location json
         setCurrentLongitude(currentLongitude);
         //Setting state Longitude to re re-render the Longitude Text
         setCurrentLatitude(currentLatitude);
         //Setting state Latitude to re re-render the Longitude Text
       },
      error => {
        console.log({error})
         setLocationStatus(error.message);
       },
      {enableHighAccuracy: true, timeout: 30000, maximumAge: 1000},
     );
   };
 
   
   return (
    <SafeAreaView style={{flex: 1}}>
       <View style={styles.container}>
         <Text>Hiii</Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{height: 100}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
        />
         <View style={styles.container}>
           <Image
             source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
             }}
            style={{width: 100, height: 100}}
           />
           <Text style={styles.boldText}>{locationStatus}</Text>
           <Text
             style={{
               justifyContent: 'center',
               alignItems: 'center',
               marginTop: 16,
             }}>
             Longitude: {currentLongitude}
           </Text>
           <Text
             style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
             Latitude: {currentLatitude}
           </Text>
          <View style={{marginTop: 20}}>
             <Button title="Button" onPress={getOneTimeLocation} />
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
 
