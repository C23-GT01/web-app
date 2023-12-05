import { MdLocationOn } from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import Icon from "./Icon";

const Marker = ({ text = "Here" }) => <div>{text}</div>;

export default function Map({ lat, lng }) {
  const [mapPosition, setMapPosition] = useState({ lat, lng });
  const [markerPosition, setMarkerPosition] = useState({ lat, lng });
  const map = useRef(null);
  const zoom = 14;

  useEffect(() => {
    setMapPosition({ lat, lng });
    setMarkerPosition({ lat, lng });
  }, [lat, lng]);

  const handleMapChange = ({ center }) => {
    if (map.current && center) {
      const lat = center.lat;
      const lng = center.lng;
      const latDiff = mapPosition.lat - lat;
      const lngDiff = mapPosition.lng - lng;

      setMarkerPosition({
        lat: markerPosition.lat - latDiff,
        lng: markerPosition.lng - lngDiff,
      });
      setMapPosition({ lat, lng });
    }
  };

  return (
    <div style={{ height: '60vh', width: '100%' }}>
      <GoogleMapReact
        ref={map}
        bootstrapURLKeys={{ key: "AIzaSyBEkv6dNWZFd4MGOz-AZxkjhP9fYUwxkvE" }}
        center={mapPosition}
        defaultZoom={zoom}
        onChange={handleMapChange}
      >
        <Marker
          lat={markerPosition.lat}
          lng={markerPosition.lng}
          text={<Icon active><MdLocationOn /></Icon>}
        />
      </GoogleMapReact>
    </div>
  );
}