import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { capitalizeFirstLetter } from "@/lib/helpers";
import useAmadeusToken from "./getAccessToken";

const useAirportOptions = () => {
  const [airportOptions, setAirportOptions] = useState([]);
  const token = useAmadeusToken();

  const loadOptions = async (inputValue: string) => {
    const params = {
      subType: "AIRPORT",
      keyword: inputValue,
      "page[limit]": 10,
      "page[offset]": 0,
      sort: "analytics.travelers.score",
      view: "FULL",
    };

    const airportsUrl =
      "https://test.api.amadeus.com/v1/reference-data/locations";

    try {
      const response: AxiosResponse = await axios.get(airportsUrl, {
        params,
        headers: {
          Accept: "application/vnd.amadeus+json",
          Authorization: `Bearer ${token}`,
        },
      });

      const filteredAirports = response.data.data.filter(
        (airport: {
          address: { cityName: string; countryName: string };
          name: string;
        }) =>
          airport.address.cityName
            .toLowerCase()
            .includes(inputValue.toLowerCase()) ||
          airport.address.countryName
            .toLowerCase()
            .includes(inputValue.toLowerCase()) ||
          airport.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      const airportData = filteredAirports.map(
        (airport: {
          iataCode: string;
          name: string;
          address: { countryName: string };
        }) => ({
          value: airport.iataCode,
          label: `${capitalizeFirstLetter(airport.name)} - (${
            airport.iataCode
          }) - ${capitalizeFirstLetter(airport.address.countryName)}`,
        })
      );

      setAirportOptions(airportData);
      return airportData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  return { airportOptions, loadOptions };
};

export default useAirportOptions;
