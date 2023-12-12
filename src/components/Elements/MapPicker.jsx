/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '40vh'
};

function Map({handleGet, position}) {

  // const [position, setPosition] = useState({ lat: -6.2088, lng: 106.8456 });

  // const handleMapClick = (event) => {
  //   setPosition({
  //     lat: event.latLng.lat(),
  //     lng: event.latLng.lng(),
  //   });

  // }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCmR6EH3XkpW8VYFpVGhlxImlBv4yrNEuE'
  });


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={5} // Set your desired zoom level here
      onClick={handleGet}
    >
      <Marker position={position} />
    </GoogleMap>
  ) : <></>;

}

export default Map;
