import { BsShopWindow } from "react-icons/bs";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "60vh",
};

const boxStyle = {
  backgroundColor: "red",
  width: "20px",
  height: "20px",
  borderRadius: "3px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "10px",
  position: "relative",
};

const tooltipStyle = {
  position: "absolute",
  top: "-25px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "black",
  color: "white",
  padding: "5px 10px",
  borderRadius: "3px",
  fontSize: "12px",
  whiteSpace: "nowrap",
  zIndex: "10",
};

function UmkmDistribution({ locations }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // eslint-disable-next-line no-undef
    googleMapsApiKey: process.env.GOOGLE_MAP_API,
  });

  const [map, setMap] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={locations[0]}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locations.map((location, index) => (
        <OverlayView
          key={index}
          position={location}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            style={boxStyle}
            onMouseEnter={() => setHoveredLocation(location)}
            onMouseLeave={() => setHoveredLocation(null)}
          >
            {hoveredLocation === location && (
              <div style={tooltipStyle}>{location.name}</div>
            )}
            <BsShopWindow />
          </div>
        </OverlayView>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default UmkmDistribution;
