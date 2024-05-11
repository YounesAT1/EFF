import { useState, useEffect } from "react";
import axios from "axios";

const useAmadeusToken = () => {
  const [token, setToken] = useState<string>("");
  const apiUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
  const client_id = "rHnhjRzHpLeo9P8SA3S95eJx2vYrZfTa";
  const client_secret = "vcmGDQslsSzTdq30";

  const getAccessToken = async () => {
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

      setToken(response.data.access_token);
    } catch (error: any) {
      console.error(
        "Error making token request:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return token;
};

export default useAmadeusToken;
