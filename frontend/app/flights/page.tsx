"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Plane } from "lucide-react";
import Header from "@/components/Header";
import FlightOffre from "./FlightOffre";
import useAmadeusTokenOne from "@/hooks/getAccessToken1";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/Footer";
import Loader from "./Loader";

export default function FlightsPage() {
  const token = useAmadeusTokenOne();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [flightOfferData, setFlightOfferData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [totalOffers, setTotalOffers] = useState<number>(0);
  const [dictionaries, setDictionaries] = useState<any[]>([]);

  console.log(token);

  const {
    departure: originLocationCode,
    arrival: destinationLocationCode,
    from: departureDate,
    to: returnDate,
    passengers: adults,
    travelClass,
  } = Object.fromEntries(searchParams.entries());
  console.log(token);
  useEffect(() => {
    const fetchFlightOffers = async () => {
      setIsLoading(true);

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

        const totalOffersCount = response.data.meta.count;
        setTotalOffers(totalOffersCount);
        const totalPagesCount = Math.ceil(totalOffersCount / 10);
        setNumberOfPages(totalPagesCount);

        setDictionaries(response.data.dictionaries);

        const slicedData = response.data.data.slice(
          (currentPage - 1) * 10,
          currentPage * 10
        );
        setFlightOfferData(slicedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlightOffers();
  }, [
    adults,
    currentPage,
    departureDate,
    destinationLocationCode,
    originLocationCode,
    returnDate,
    token,
    travelClass,
  ]);

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Header />
      <section className="mx-auto max-w-7xl">
        {isLoading || flightOfferData.length === 0 ? (
          <div className="flex items-center justify-center h-screen">
            <Loader />
          </div>
        ) : flightOfferData.length > 0 && !isLoading ? (
          <>
            <div className="max-w-6xl mx-auto p-5">
              <div className="flex items-center gap-x-4 justify-center mb-12">
                <Plane
                  className="text-slate-600 dark:text-slate-200 sm:block hidden"
                  width={28}
                  height={28}
                />
                <h1 className="font-bold text-xl text-slate-600 dark:text-slate-200 sm:text-3xl">
                  We found{" "}
                  <span className="text-rose-500 italic decoration-wavy underline">
                    {totalOffers}
                  </span>{" "}
                  <span className="text-violet-500 italic decoration-wavy underline">
                    amazing
                  </span>{" "}
                  flight offers
                  <span className="text-pink-600 italic decoration-wavy underline">
                    {" "}
                    for you{" "}
                  </span>
                  !
                </h1>
                <Plane
                  className="text-slate-600 dark:text-slate-200 sm:block hidden"
                  width={28}
                  height={28}
                />
              </div>
            </div>
            {flightOfferData.map((flight: any) => (
              <div key={flight.id} className="px-4 my-3">
                <FlightOffre flight={flight} dictionaries={dictionaries} />
              </div>
            ))}
            <div className="flex justify-center mt-4 gap-x-3 my-16">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === numberOfPages}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          // Show "No flight offers found" message when isLoading is false and flightOfferData is empty
          <div className="flex items-center justify-center h-screen">
            <p>No flight offers found.</p>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
