import { useState } from "react";
import useAmadeusToken from "./getAccessToken";
import axios, { AxiosResponse } from "axios";

type flightProps = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  max: number;
};

const useGetFlights = () => {
  const [flights, setFlights] = useState([]);

  const token = useAmadeusToken();

  const getFlights = async ({
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults,
    max,
  }: flightProps) => {
    const params = {
      originLocationCode: originLocationCode,
      destinationLocationCode: destinationLocationCode,
      departureDate: departureDate,
      returnDate: returnDate,
      adults: adults,
      max: max,
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
      console.log(response);
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  return { flights, getFlights };
};

export default useGetFlights;
