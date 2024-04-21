import { useState } from "react";
import axios from "axios";
import useAmadeusTokenOne from "./getAccessToken1";

interface FlightParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  travelClass: string;
}

const useGetFlights = () => {
  const [flights, setFlights] = useState<any>([]);

  const token = useAmadeusTokenOne();
  const getFlights = async ({
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults,
    travelClass,
  }: FlightParams) => {
    const params = {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      travelClass,
    };

    const apiUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers";

    try {
      const response = await axios.get(apiUrl, {
        params,
        headers: {
          Accept: "application/vnd.amadeus+json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Flight Data:", response.data);
      console.log("Number of Flight Offers:", response.data.meta.count);

      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  return { flights, getFlights };
};

export default useGetFlights;
