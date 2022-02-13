import { View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import tw from "tailwind-react-native-classnames"
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env"
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image style={{width: 100, height: 100, resizeMode: 'contain'}} source={{uri: "https://links.papareact.com/gzs"}}/>
        <GooglePlacesAutocomplete 
            styles={{container: {flex: 0,}, textInput: {fontSize: 18,}, height: 100}}
            nearbyPlacesAPI='GooglePlacesSearch' 
            debounce={400}
            fetchDetails={true}
            placeholder="Where From?"
            enablePoweredByContainer={false}
            returnKeyType={"search"}
            onPress={(data, details = null) => {
              dispatch(setOrigin({
                location: details.geometry.location,
                description: data.description
              }))
              dispatch(setDestination(null))
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            />
        <NavOptions/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

