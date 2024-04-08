import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const useGetAddresses = () => {
  const [addresses, setAddresses] = useState([]);
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

  return { addresses, loadOptions };
};

export default useGetAddresses;
