import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { PickUpCoordinatesContext } from "@/context/pickUpContext";
import { DropOffCoordinatesContext } from "@/context/dropOffContext";
import { DirectionContext } from "@/context/directionContext";

const useGetAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const { pickUpCoordinates, setPickUpCoordinates } = useContext(
    PickUpCoordinatesContext
  );
  const { dropOfCoordinates, setDropOffCoordinates } = useContext(
    DropOffCoordinatesContext
  );
  const { direction, setDirection } = useContext(DirectionContext);
  const sessionToken = uuidv4();

  const loadOptions = async (inputValue: string) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.mapbox.com/search/searchbox/v1/suggest`,
        {
          params: {
            q: inputValue,
            language: "en",
            limit: 5,
            session_token: sessionToken,
            proximity: "-83.748708,42.265837",
            country: "US,CA,GB,MA",
            access_token:
              "pk.eyJ1IjoieW91bmVzLWF0IiwiYSI6ImNsdXF3NjVjNjAweWMycWtjaXdwM25ja3oifQ.3xljpae2D3lDzTWhc0Co2Q",
          },
        }
      );

      const addressOptions = response.data.suggestions
        .map((suggestion: any) => {
          if (
            suggestion.full_address &&
            suggestion.full_address.trim() !== ""
          ) {
            return {
              value: suggestion.full_address,
              label: suggestion.full_address,
              id: suggestion.mapbox_id,
            };
          }
          return null;
        })
        .filter((option: any) => option !== null);

      setAddresses(addressOptions);

      return addressOptions;
    } catch (error) {
      console.error("Error fetching addresses:", error);
      return [];
    }
  };

  const handleSelectePickUpAdresse = async (pickUp: any) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.mapbox.com/search/searchbox/v1/retrieve/${pickUp.id}?session_token=${sessionToken}&access_token=pk.eyJ1IjoieW91bmVzLWF0IiwiYSI6ImNsdXF3NjVjNjAweWMycWtjaXdwM25ja3oifQ.3xljpae2D3lDzTWhc0Co2Q`
      );
      const lng = response.data.features[0].geometry.coordinates[0];
      const lat = response.data.features[0].geometry.coordinates[1];
      setPickUpCoordinates({ lng, lat });
    } catch (error) {
      console.log("Error fetching pick-up address:", error);
    }
  };

  const handleSelectedDropOffAddresse = async (dropOff: any) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.mapbox.com/search/searchbox/v1/retrieve/${dropOff.id}?session_token=${sessionToken}&access_token=pk.eyJ1IjoieW91bmVzLWF0IiwiYSI6ImNsdXF3NjVjNjAweWMycWtjaXdwM25ja3oifQ.3xljpae2D3lDzTWhc0Co2Q`
      );
      const lng = response.data.features[0].geometry.coordinates[0];
      const lat = response.data.features[0].geometry.coordinates[1];
      setDropOffCoordinates({ lng, lat });
      console.log(dropOfCoordinates);
    } catch (error) {
      console.log("Error fetching drop-off address:", error);
    }
  };

  const getDirectionRoote = async () => {
    const response: AxiosResponse<any> = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpCoordinates.lng},${pickUpCoordinates.lat};${dropOfCoordinates.lng},${dropOfCoordinates.lat}?overview=full&geometries=geojson&access_token=pk.eyJ1IjoieW91bmVzLWF0IiwiYSI6ImNsdXF3NjVjNjAweWMycWtjaXdwM25ja3oifQ.3xljpae2D3lDzTWhc0Co2Q`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setDirection(response);
  };

  return {
    addresses,
    loadOptions,
    handleSelectePickUpAdresse,
    handleSelectedDropOffAddresse,
    getDirectionRoote,
  };
};

export default useGetAddresses;
