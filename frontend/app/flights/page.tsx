"use client";
import Header from "@/components/Header";
import useGetFlights from "@/hooks/getFlights";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function FlightsPage() {
  const { getFlights, flights } = useGetFlights();
  const searchParams = useSearchParams();
  const {
    departure: originLocationCode,
    arrival: destinationLocationCode,
    from: departureDate,
    to: returnDate,
    passengers: adults,
    travelClass,
  } = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    const allParamsPresent =
      originLocationCode &&
      destinationLocationCode &&
      departureDate &&
      returnDate &&
      adults &&
      travelClass;
    if (allParamsPresent) {
      getFlights({
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        adults: parseInt(adults, 10),
        travelClass,
      });
      console.log(
        adults,
        departureDate,
        destinationLocationCode,
        originLocationCode,
        returnDate,
        travelClass
      );
    }
  }, [
    adults,
    departureDate,
    destinationLocationCode,
    getFlights,
    originLocationCode,
    returnDate,
    travelClass,
  ]);

  return (
    <>
      <Header />
      <section className="mx-auto max-w-7xl"></section>
    </>
  );
}
