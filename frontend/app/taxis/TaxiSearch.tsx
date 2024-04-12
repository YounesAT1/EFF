"use client";
import React, { useEffect, useState } from "react";
import TaxiBookingForm from "./TaxiBookingForm";
import MapBox from "./Map";
import { UserLocationContext } from "@/context/userLocationContext";
import { PickUpCoordinatesContext } from "@/context/pickUpContext";
import { DropOffCoordinatesContext } from "@/context/dropOffContext";

export default function TaxiSearch() {
  const [userLocation, setUserLocation] = useState<any>();
  const [pickUpCoordinates, setPickUpCoordinates] = useState<any>([]);
  const [dropOfCoordinates, setDropOffCoordinates] = useState<any>([]);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      <PickUpCoordinatesContext.Provider
        value={{ pickUpCoordinates, setPickUpCoordinates }}
      >
        <DropOffCoordinatesContext.Provider
          value={{ dropOfCoordinates, setDropOffCoordinates }}
        >
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div>
                <TaxiBookingForm />
              </div>
              <div className="col-span-2 md:pl-16">
                <MapBox />
              </div>
            </div>
          </div>
        </DropOffCoordinatesContext.Provider>
      </PickUpCoordinatesContext.Provider>
    </UserLocationContext.Provider>
  );
}
