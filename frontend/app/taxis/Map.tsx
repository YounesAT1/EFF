"use client";
import { UserLocationContext } from "@/context/userLocationContext";
import * as React from "react";
// @ts-ignore
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { PickUpCoordinatesContext } from "@/context/pickUpContext";
import { DropOffCoordinatesContext } from "@/context/dropOffContext";
import useGetAddresses from "@/hooks/getAddresses";
import { DirectionContext } from "@/context/directionContext";
import MapRoute from "./MapRoute";
import DistanceAndTime from "./DistanceAndTime";
import { MapLoader } from "./MapLoader";

export default function MapBox() {
  const { userLocation } = React.useContext(UserLocationContext);
  const { pickUpCoordinates } = React.useContext(PickUpCoordinatesContext);
  const { dropOfCoordinates } = React.useContext(DropOffCoordinatesContext);
  const { direction } = React.useContext(DirectionContext);
  const { getDirectionRoote } = useGetAddresses();

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

    if (
      pickUpCoordinates.lng !== undefined &&
      pickUpCoordinates.lat !== undefined &&
      dropOfCoordinates.lng !== undefined &&
      dropOfCoordinates.lat !== undefined
    ) {
      getDirectionRoote();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropOfCoordinates]);

  if (!userLocation) {
    return (
      <div className="flex items-center justify-center h-full">
        <MapLoader />
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden relative">
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

          {direction?.data?.routes ? (
            <MapRoute
              coordinates={direction.data.routes[0].geometry.coordinates}
            />
          ) : null}
        </Map>
      ) : null}
      {direction && (
        <div className="absolute top-0 right-0 p-3 rounded-md bg-opacity-50 backdrop-blur-lg backdrop-filter backdrop-saturate-150 dark:bg-black dark:bg-opacity-50 dark:backdrop-blur-lg dark:backdrop-filter dark:backdrop-saturate-150 text-violet-800 w-full dark:text-purple-900">
          <DistanceAndTime />
        </div>
      )}
    </div>
  );
}
