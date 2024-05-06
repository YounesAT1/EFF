"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Circle, Plane } from "lucide-react";
import {
  formatDate,
  formatDuration,
  formatDurationString,
  formatTime,
} from "@/lib/helpers";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { airlineInfo } from "@/lib/airlineData";
import { airports } from "@/lib/airportData";

function FlightDetails() {
  const params = useSearchParams();
  const { from: departureDate } = Object.fromEntries(params.entries());

  const formatedFlight = params.get("flightOfferInfos");
  const outboundSegments = params.get("outboundSegments");

  function decodeData(dataString: any) {
    return JSON.parse(decodeURIComponent(dataString));
  }

  const flightOfferInfos = decodeData(formatedFlight);

  const outboundSegmentsInfos = decodeData(outboundSegments);

  type uniqueSegmentType = {
    airCraftCode: string;
    departureTime: string;
    departureAirport: string;
    arrivalTime: string;
    arrivalAirport: string;
    airline: string;
    duration: string;
    airlineName: string | undefined;
    departureAirportName: string | undefined | null;
    arrivalAirportName: string | undefined | null;
    overlayDuration: string | null;
  };

  const uniqueSegments: uniqueSegmentType[] = [];

  for (let i = 0; i < outboundSegmentsInfos.length; i++) {
    const segment = outboundSegmentsInfos[i];
    const nextSegment = outboundSegmentsInfos[i + 1];

    let overlayDuration = null;
    if (nextSegment) {
      const currentArrivalTime = new Date(segment.arrival.at);
      const nextDepartureTime = new Date(nextSegment.departure.at);
      //@ts-ignore
      overlayDuration = nextDepartureTime - currentArrivalTime;
      overlayDuration = formatDuration(overlayDuration); // Format overlay duration
    }

    const uniqueSegment = {
      airCraftCode: segment.aircraft.code,
      departureTime: formatTime(segment.departure.at),
      departureAirport: segment.departure.iataCode,
      arrivalTime: formatTime(segment.arrival.at),
      arrivalAirport: segment.arrival.iataCode,
      airline: segment.carrierCode,
      duration: formatDurationString(segment.duration),
      airlineName: airlineInfo.find(
        (airline) => airline.id === segment.carrierCode
      )?.name,
      departureAirportName: airports.find(
        (airport) => airport.iata === segment.departure.iataCode
      )?.name,
      arrivalAirportName: airports.find(
        (airport) => airport.iata === segment.arrival.iataCode
      )?.name,
      overlayDuration: overlayDuration, // Add overlay duration to the unique segment object
    };
    uniqueSegments.push(uniqueSegment);
  }

  function formatDuration(duration: any) {
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} h${minutes} m`;
  }

  console.log(uniqueSegments);

  return (
    <main className="mt-8 flex flex-col gap-y-3">
      <div>
        <div className="flex items-center gap-x-1">
          <Plane className="text-slate-800" />
          <h1 className="text-2xl font-medium text-slate-800">
            Outbound{" "}
            <span className="text-slate-500 font-normal">
              {formatDate(departureDate)}
            </span>
          </h1>
        </div>
        <Card className="py-4 px-5  shadow-none mt-4">
          <CardContent className="pt-[21px] flex items-center">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg hover:no-underline">
                  <div className="flex items-center gap-x-5">
                    {flightOfferInfos.outbound.airlines.map(
                      (airline: any, index: number) => (
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

                            <TooltipContent>
                              <p className="text-sm font-semibold">
                                {airline.name}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-x-5 w-[63%] ms-[40px]">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-slate-600 text-lg dark:text-white">
                        {flightOfferInfos.outbound.infos.departureTime}
                      </p>
                      <p className="text-slate-900 font-semibold dark:text-white">
                        {flightOfferInfos.outbound.infos.departureAirport}
                      </p>
                    </div>
                    <div className="flex flex-col items-center w-full justify-center">
                      <p>{flightOfferInfos.outbound.duration}</p>
                      <Separator className=" bg-slate-600 rounded my-1 dark:bg-white" />
                      {flightOfferInfos.outbound.infos.overlays ? (
                        <div className="flex flex-col items-center">
                          <p className="text-sm text-slate-800 dark:text-white">
                            <span className="text-red-500"> Stops :</span>{" "}
                            {flightOfferInfos.outbound.infos.overlays.length}
                          </p>
                          <div className="flex items-center gap-x-3">
                            {flightOfferInfos.outbound.infos.overlays.map(
                              (overlay: any, index: number) => (
                                <p key={index} className="flex ">
                                  <span>
                                    {overlay.airport} {""}
                                  </span>{" "}
                                  {""}-{""}
                                  {overlay.duration}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      ) : (
                        <p>No stops</p>
                      )}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-slate-600 text-lg dark:text-white">
                        {flightOfferInfos.outbound.infos.arrivalTime}
                      </p>
                      <p className="text-slate-900 font-semibold dark:text-white">
                        {flightOfferInfos.outbound.infos.arrivalAirport}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-5">
                  <div className="flex flex-col items-center gap-y-3">
                    {uniqueSegments.map((segment, index) => (
                      <>
                        <div
                          className="flex items-center justify-around w-full mb-3"
                          key={index}
                        >
                          <Image
                            src={`https://images.kiwi.com/airlines/64/${segment.airline}.png`}
                            //@ts-ignore
                            alt={segment.airlineName}
                            width={50}
                            height={20}
                            priority
                            quality={90}
                            className="rounded"
                          />
                          <div className="flex items-center gap-x-3">
                            <p className="text-lg font-semibold text-slate-700">
                              {segment.airlineName}
                            </p>
                            <p className="text-lg font-semibold text-slate-700">
                              {segment.airCraftCode}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                          <p className="font-semibold text-slate-700">
                            {segment.duration}
                          </p>
                          <div className="flex flex-col items-center">
                            <Circle className="text-violet-400 " />
                            <div className="h-[40px] w-1 rounded bg-violet-400 border-2"></div>
                            <Circle className="text-violet-400 " />
                          </div>
                          <div className="flex flex-col items-start text-left">
                            <div className="flex items-center gap-x-3 text-lg font-semibold">
                              <p>{segment.departureTime}</p>
                              <p>{segment.departureAirport}</p>
                              <p>{segment.departureAirportName}</p>
                            </div>
                            <div className="flex items-center gap-x-3 text-lg font-semibold">
                              <p>{segment.arrivalTime}</p>
                              <p>{segment.arrivalAirport}</p>
                              <p>{segment.arrivalAirportName}</p>
                            </div>
                            {segment.overlayDuration !== null && (
                              <p className="text-[16px] font-bold mt-2 px-4 py-2 rounded-md text-slate-700 bg-slate-200">
                                {segment.overlayDuration}
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default FlightDetails;
