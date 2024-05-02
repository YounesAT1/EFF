import React from "react";
import { formatOutboundFlightInfo } from "./outboundFlight";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/Button";
import { formatReturnFlightInfo } from "./returnFlight";

type FlightOfferProps = {
  flight: any;
  dictionaries: any;
};

export default function FlightOffer({
  flight,
  dictionaries,
}: FlightOfferProps) {
  //! THE OUTBOUND FLIGHT
  const outboundSegments = flight.itineraries[0].segments;
  const outboundFlightInfo = formatOutboundFlightInfo(
    outboundSegments,
    dictionaries
  );

  //! THE RETURN FLIGHT
  const returnSegments = flight.itineraries[1].segments;
  const returnFlightInfo = formatReturnFlightInfo(returnSegments, dictionaries);

  return (
    <Card className="flex items-center justify-between py-4 px-5 shadow-none">
      <div className="flex flex-col items-center w-full">
        <CardContent className="flex items-center  p-4 w-full">
          <div className="flex flex-col w-[240px]">
            {outboundFlightInfo.airlines.map((airline, index) => (
              <p
                className="text-sm font-semibold text-slate-700 inline dark:text-white"
                key={index}
              >
                {airline}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-center gap-x-5 w-[63%] ms-14">
            <div className="flex flex-col items-center justify-center">
              <p className="text-slate-600 text-lg dark:text-white">
                {outboundFlightInfo.departureTime}
              </p>
              <p className="text-slate-900 font-semibold dark:text-white">
                {outboundFlightInfo.departureAirport}
              </p>
            </div>
            <div className="flex flex-col items-center w-full justify-center">
              <p>{outboundFlightInfo.totalDuration}</p>
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
          <div className="flex flex-col w-[240px]">
            {returnFlightInfo.airlines.map((airline, index) => (
              <p
                className="text-sm font-semibold text-slate-700 inline dark:text-white"
                key={index}
              >
                {airline}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-center gap-x-5 w-[63%] ms-14">
            <div className="flex flex-col items-center justify-center">
              <p className="text-slate-600 text-lg dark:text-white">
                {returnFlightInfo.departureTime}
              </p>
              <p className="text-slate-900 font-semibold dark:text-white">
                {returnFlightInfo.departureAirport}
              </p>
            </div>
            <div className="flex flex-col items-center w-full">
              <p>{returnFlightInfo.totalDuration}</p>
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
      <div className="flex flex-col items-center justify-center gap-y-5 w-[20%]">
        <p>{flight.numberOfBookableSeats} Seats available</p>
        <Button>See details</Button>
        <p className="font-semibold">{flight.price.total} EUR</p>
      </div>
    </Card>
  );
}
