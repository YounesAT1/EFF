import React, { useEffect } from "react";
import { Layer, Source } from "react-map-gl";

export default function MapRoute(props: any) {
  useEffect(() => {
    console.log(props.coordinates);
  }, [props.coordinates]);
  return (
    <Source
      type="geojson"
      // @ts-ignore
      data={{
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: props.coordinates,
        },
      }}
    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "square" }}
        paint={{ "line-color": "#0462d4", "line-width": 4 }}
      />
    </Source>
  );
}
