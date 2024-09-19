import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "40vh",
};

function Map({ position, onPositionChange, handleGet }) {
  const [markerPosition, setMarkerPosition] = useState(position);
  const [address, setAddress] = useState("");

  const formatAddress = (address) => {
    if (address.includes('+')) {
      const [firstPart, ...restParts] = address.split(' ');
      const formattedAddress = `${restParts.join(' ')} (${firstPart})`;
      
      return formattedAddress;
    }
    return address;
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // eslint-disable-next-line no-undef
    googleMapsApiKey: process.env.GOOGLE_MAP_API,
  });

  useEffect(() => {
    setMarkerPosition(position);
  }, [position]);

  const handleMarkerDragEnd = useCallback(
    async (event) => {
      const { latLng } = event;

      const newPosition = {
        lat: latLng.lat(),
        lng: latLng.lng(),
      };
      setMarkerPosition(newPosition);

      // Call the function to get the address
      const newAddress = await getAddressFromLatLng(newPosition);
      const formattedAddress = formatAddress(newAddress);
      setAddress(formattedAddress);

      if (onPositionChange) {
        onPositionChange(newPosition, formattedAddress);
      }
    },
    [onPositionChange]
  );

  const handleMapClick = useCallback(
    async (event) => {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      const newAddress = await getAddressFromLatLng(newPosition);
      const formattedAddress = formatAddress(newAddress);
      setAddress(formattedAddress);

      if (onPositionChange) {
        onPositionChange(newPosition, formattedAddress);
      }
    },
    [onPositionChange]
  );

  const getAddressFromLatLng = async (position) => {
    const geocoder = new window.google.maps.Geocoder();
    const { results } = await geocoder.geocode({
      location: position,
    });

    if (results[0]) {
      return results[0].formatted_address;
    } else {
      return "No address found";
    }
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={5}
        onClick={handleMapClick} // Update handleMapClick on GoogleMap
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default Map;
