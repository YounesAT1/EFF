"use client";
import { UserLocationContext } from "@/context/userLocationContext";
import * as React from "react";
// @ts-ignore
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { PickUpCoordinatesContext } from "@/context/pickUpContext";
import { DropOffCoordinatesContext } from "@/context/dropOffContext";

export default function MapBox() {
  const { userLocation } = React.useContext(UserLocationContext);
  const { pickUpCoordinates } = React.useContext(PickUpCoordinatesContext);
  const { dropOfCoordinates } = React.useContext(DropOffCoordinatesContext);

  const mapRef = React.useRef<any>();

  React.useEffect(() => {
    if (pickUpCoordinates) {
      mapRef.current?.flyTo({
        center: [pickUpCoordinates.lng, pickUpCoordinates.lat],
        duration: 2500,
      });
    }
  }, [pickUpCoordinates]);

  React.useEffect(() => {
    if (dropOfCoordinates) {
      mapRef.current?.flyTo({
        center: [dropOfCoordinates.lng, dropOfCoordinates.lat],
        duration: 2500,
      });
    }
  }, [dropOfCoordinates]);

  return (
    <div className="rounded-lg overflow-hidden">
      {userLocation ? (
        <Map
          ref={mapRef}
          mapboxAccessToken="pk.eyJ1IjoieW91bmVzLWF0IiwiYSI6ImNsdXF3NjVjNjAweWMycWtjaXdwM25ja3oifQ.3xljpae2D3lDzTWhc0Co2Q"
          initialViewState={{
            longitude: userLocation?.lng,
            latitude: userLocation?.lat,
            zoom: 14,
          }}
          style={{ width: "100%", height: "674px", borderRadius: "10" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Markers />
        </Map>
      ) : null}
    </div>
  );
}
