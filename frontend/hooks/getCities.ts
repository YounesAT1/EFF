import { useState } from "react";
import axios, { AxiosResponse } from "axios";

const useGetCities = () => {
  const [cities, setCities] = useState([]);

  const loadOptions = async (inputValue: string) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        "https://place-autocomplete1.p.rapidapi.com/autocomplete/json",
        {
          params: {
            input: inputValue,
            radius: "500",
          },
          headers: {
            "X-RapidAPI-Key":
              "93abd18dd7msh379be200cdc2ab3p1ebe53jsne1fa920f6b35",
            "X-RapidAPI-Host": "place-autocomplete1.p.rapidapi.com",
          },
        }
      );

      console.log(response.data.predictions);

      const cityOptions = response.data.predictions.map((prediction: any) => ({
        value: prediction.terms[0].value,
        label: prediction.description,
      }));

      setCities(cityOptions);

      return cityOptions;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };

  return { cities, loadOptions };
};

export default useGetCities;
