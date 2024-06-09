"use client";
import { axiosClient } from "@/api/axios";
import PageLoader from "@/app/profile/[userID]/Loader";
import { Button } from "@/components/ui/Button";
import React, { useEffect, useState } from "react";

const FlightReservation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [flightReservations, setFlightReservations] = useState([]);

  useEffect(() => {
    const fetchFlightReservations = async () => {
      setIsLoading(true);
      try {
        const response = await axiosClient.get("/api/reservation");
        setFlightReservations(response.data.data);
      } catch (error) {
        console.error("Error fetching flight reservations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlightReservations();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <table className="table-auto border border-gray-500">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-500 px-4 py-2">Flight Number</th>
          <th className="border border-gray-500 px-4 py-2">Reservation date</th>
          <th className="border border-gray-500 px-4 py-2">Departure</th>
          <th className="border border-gray-500 px-4 py-2">Destination</th>
          <th className="border border-gray-500 px-4 py-2">Departure Date</th>
          <th className="border border-gray-500 px-4 py-2">Arrival Date</th>
          <th className="border border-gray-500 px-4 py-2">Duration</th>
          <th className="border border-gray-500 px-4 py-2">Price</th>
          <th className="border border-gray-500 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {flightReservations.length === 0 && !isLoading ? (
          <tr>
            <td
              className="border border-gray-500 text-red-600 px-4 py-2 text-center font-semibold text-xl"
              //@ts-ignore
              colSpan="9"
            >
              No flight reservations available
            </td>
          </tr>
        ) : (
          flightReservations.map((reservation: any) => (
            <tr key={reservation.id}>
              <td className="border border-gray-500 px-4 py-2">
                {reservation.flightNumber}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {reservation.reservation_date}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {reservation.from}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {reservation.to}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {reservation.departure}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {reservation.arrival}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {reservation.duration}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {reservation.price} EUR
              </td>
              <td className="border border-gray-500 px-4 py-2">
                <Button variant="destructive">Cancel flight</Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default FlightReservation;
