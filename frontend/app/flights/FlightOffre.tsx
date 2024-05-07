"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { airlineInfo } from "@/lib/airlineData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { encodeData, formatDurationString } from "@/lib/helpers";
import { formatedFlight } from "./formatedFlight";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type FlightOfferProps = {
  flight: any;
  dictionaries: any;
};

export default function FlightOffer({
  flight,
  dictionaries,
}: FlightOfferProps) {
  const searchParams = useSearchParams();

  const {
    departure: originLocationCode,
    arrival: destinationLocationCode,
    from: departureDate,
    to: returnDate,
    passengers: adults,
    travelClass,
  } = Object.fromEntries(searchParams.entries());

  //! THE OUTBOUND FLIGHT
  const outboundSegments = flight.itineraries[0].segments;

  const outboundFlightInfo = formatedFlight(outboundSegments, dictionaries);

  const outboundAirline = airlineInfo.filter((airline) =>
    outboundFlightInfo.IATA.includes(airline.id)
  );

  const outboundDuration = formatDurationString(flight.itineraries[0].duration);

  //! THE RETURN FLIGHT
  const returnSegments = flight.itineraries[1].segments;

  const returnFlightInfo = formatedFlight(returnSegments, dictionaries);

  const returnDuration = formatDurationString(flight.itineraries[1].duration);

  const returnAirline = airlineInfo.filter((airline) =>
    returnFlightInfo.IATA.includes(airline.id)
  );

  //! FLIGHT OFFER ID IS IN THE OUTBOUND FLIGHT OBJECT
  const flightOfferInfos = {
    id: flight.id,
    outbound: {
      infos: outboundFlightInfo,
      airlines: outboundAirline,
      duration: outboundDuration,
    },
    return: {
      infos: returnFlightInfo,
      airlines: returnAirline,
      duration: returnDuration,
    },
  };

  return (
    <Card className="flex items-center justify-between py-4 px-5 shadow-none">
      <div className="flex flex-col items-center w-full">
        <CardContent className="flex items-center  p-4 w-full">
          <div className="flex items-center gap-x-5 w-[300px]">
            {outboundAirline.map((airline, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <Image
                      src={`https://images.kiwi.com/airlines/64/${airline.id}.png`}
                      alt={airline.name}
                      width={50}
                      height={30}
                      priority
                      quality={90}
                      className="rounded"
                    />
                  </TooltipTrigger>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {airline.name}
                  </p>
                  <TooltipContent>
                    <p className="text-sm font-semibold">{airline.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          <div className="flex items-center justify-center gap-x-5 w-[63%] ms-[40px]">
            <div className="flex flex-col items-center justify-center">
              <p className="text-slate-600 text-lg dark:text-white">
                {outboundFlightInfo.departureTime}
              </p>
              <p className="text-slate-900 font-semibold dark:text-white">
                {outboundFlightInfo.departureAirport}
              </p>
            </div>
            <div className="flex flex-col items-center w-full justify-center">
              <p>{outboundDuration}</p>
              <Separator className=" bg-slate-600 rounded my-1 dark:bg-white" />
              {outboundFlightInfo.overlays ? (
                <div className="flex flex-col items-center">
                  <p className="text-sm text-slate-800 dark:text-white">
                    Stops : {outboundFlightInfo.overlays.length}
                  </p>
                  {outboundFlightInfo.overlays.map((overlay, index) => (
                    <p key={index} className="flex">
                      <span>
                        {overlay.airport} {""}
                      </span>{" "}
                      {""}-{""}
                      {overlay.duration}
                    </p>
                  ))}
                </div>
              ) : (
                <p>No stops</p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-slate-600 text-lg dark:text-white">
                {outboundFlightInfo.arrivalTime}
              </p>
              <p className="text-slate-900 font-semibold dark:text-white">
                {outboundFlightInfo.arrivalAirport}
              </p>
            </div>
          </div>
        </CardContent>

        <CardContent className="flex   items-center p-4 w-full">
          <div className="flex items-center gap-x-5 w-[300px]">
            {returnAirline.map((airline, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <Image
                      src={`https://images.kiwi.com/airlines/64/${airline.id}.png`}
                      alt={airline.name}
                      width={50}
                      height={30}
                      priority
                      quality={90}
                      className="rounded"
                    />
                  </TooltipTrigger>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {airline.name}
                  </p>
                  <TooltipContent>
                    <p className="text-sm font-semibold">{airline.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          <div className="flex items-center justify-center gap-x-5 w-[63%] ms-[40px]">
            <div className="flex flex-col items-center justify-center">
              <p className="text-slate-600 text-lg dark:text-white">
                {returnFlightInfo.departureTime}
              </p>
              <p className="text-slate-900 font-semibold dark:text-white">
                {returnFlightInfo.departureAirport}
              </p>
            </div>
            <div className="flex flex-col items-center w-full">
              <p>{returnDuration}</p>
              <Separator className=" bg-slate-600 rounded my-1 dark:bg-white" />
              {returnFlightInfo.overlays ? (
                <div className="flex flex-col items-center">
                  <p className="text-sm text-slate-800 dark:text-white">
                    Stops : {returnFlightInfo.overlays.length}
                  </p>
                  {returnFlightInfo.overlays.map((overlay, index) => (
                    <p key={index} className="flex">
                      <span>
                        {overlay.airport} {""}
                      </span>{" "}
                      {""}-{""}
                      {overlay.duration}
                    </p>
                  ))}
                </div>
              ) : (
                <p>No stops</p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-slate-600 text-lg dark:text-white">
                {returnFlightInfo.arrivalTime}
              </p>
              <p className="text-slate-900 font-semibold dark:text-white">
                {returnFlightInfo.arrivalAirport}
              </p>
            </div>
          </div>
        </CardContent>
      </div>
      <div className="h-[200px] w-1 rounded bg-violet-400 border-2"></div>
      <div className="flex flex-col items-center justify-center gap-y-5 w-[25%]">
        <p>{flight.numberOfBookableSeats} Seats available</p>
        <Link
          href={`/flights/${
            flight.id
          }/details?departure=${originLocationCode}&arrival=${destinationLocationCode}&from=${departureDate}&to=${returnDate}&passengers=${adults}&travelClass=${travelClass}&flightOfferInfos=${encodeData(
            flightOfferInfos
          )}&outboundSegments=${encodeData(
            outboundSegments
          )}&returnSegments=${encodeData(returnSegments)}`}
          className="text-white bg-slate-900 px-3 py-2 rounded-md"
        >
          Show details
        </Link>

        <p className="font-semibold">{flight.price.total} EUR</p>
      </div>
    </Card>
  );
}
