import { MdLocationOn } from "react-icons/md"; 
import React from "react";
import GoogleMapReact from 'google-map-react';
import Icon from "./Icon";

const AnyReactComponent = ({ text= "Apa gitu" }) => <div>{text}</div>;

export default function Map(){
  const defaultProps = {
    center: {
        lat: -8.113750063882303,
        lng:  115.0913508971701,
    },
    zoom: 15
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '60vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBEkv6dNWZFd4MGOz-AZxkjhP9fYUwxkvE" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={-8.113750063882303}
          lng={115.0913508971701}
          text={<Icon><MdLocationOn /></Icon>}
        />
      </GoogleMapReact>
    </div>
  );
}