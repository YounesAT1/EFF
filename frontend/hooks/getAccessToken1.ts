import axios from "axios";
import { useEffect, useState } from "react";

const useAmadeusTokenOne = () => {
  const [tokenOne, setTokenOne] = useState<string>("");
  const apiUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
  const client_id = "rHnhjRzHpLeo9P8SA3S95eJx2vYrZfTa";
  const client_secret = "vcmGDQslsSzTdq30";

  const getAccessTokenOne = async () => {
    const requestData = {
      grant_type: "client_credentials",
      client_id: encodeURIComponent(client_id),
      client_secret: encodeURIComponent(client_secret),
    };
    try {
      const response = await axios.post(
        apiUrl,
        new URLSearchParams(requestData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      setTokenOne(response.data.access_token);
    } catch (error: any) {
      console.error(
        "Error making token request:",
        error.response ? error.response.data : error.message
      );
    }
  };
  useEffect(() => {
    getAccessTokenOne();
  }, []);

  return tokenOne;
};

export default useAmadeusTokenOne;
