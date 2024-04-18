import React from "react";
// @ts-ignore
import { Marker } from "react-map-gl";

import Image from "next/image";
import { UserLocationContext } from "@/context/userLocationContext";
import { PickUpCoordinatesContext } from "@/context/pickUpContext";
import { DropOffCoordinatesContext } from "@/context/dropOffContext";

export default function Markers() {
  // const { userLocation } = React.useContext(UserLocationContext);

  const { pickUpCoordinates } = React.useContext(PickUpCoordinatesContext);
  const { dropOfCoordinates } = React.useContext(DropOffCoordinatesContext);

  return (
    <div>
      {/* User Marker */}

      {/* <Marker
        longitude={Number(userLocation?.lng)}
        latitude={Number(userLocation?.lat)}
        anchor="bottom"
      >
        <Image src="/marker.png" alt="marker" width={40} height={40} />
      </Marker> */}

      {/* Pick Up Marker */}

      {pickUpCoordinates &&
        pickUpCoordinates.lat !== undefined &&
        pickUpCoordinates.lng !== undefined && (
          <Marker
            longitude={Number(pickUpCoordinates?.lng)}
            latitude={Number(pickUpCoordinates?.lat)}
            anchor="bottom"
          >
            <Image src="/marker3.png" alt="marker" width={40} height={40} />
          </Marker>
        )}

      {/* Drop Off Marker */}

      {dropOfCoordinates &&
        dropOfCoordinates.lat !== undefined &&
        dropOfCoordinates.lng !== undefined && (
          <Marker
            longitude={Number(dropOfCoordinates?.lng)}
            latitude={Number(dropOfCoordinates?.lat)}
            anchor="bottom"
          >
            <Image src="/marker3.png" alt="marker" width={40} height={40} />
          </Marker>
        )}
    </div>
  );
}
