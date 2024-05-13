"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Circle, Plane } from "lucide-react";
import {
  decodeData,
  encodeData,
  formatDate,
  formatDurationString,
  formatSegemntDuration,
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
import Link from "next/link";

function FlightDetails() {
  const params = useSearchParams();
  const { from: departureDate, to: arrivalDate } = Object.fromEntries(
    params.entries()
  );

  const formattedFlight = params.get("flightOfferInfos");
  const outboundSegments = params.get("outboundSegments");
  const returnSegments = params.get("returnSegments");

  const flightOfferInfos = decodeData(formattedFlight);
  const outboundSegmentsInfos = decodeData(outboundSegments);
  const returnSegmentsInfos = decodeData(returnSegments);

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

  const decodeAndFormatSegments = (segments: any[]) => {
    const formattedSegments: uniqueSegmentType[] = [];

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const nextSegment = segments[i + 1];

      let overlayDuration: string | null = null;
      if (nextSegment) {
        const currentArrivalTime = new Date(segment.arrival.at);
        const nextDepartureTime = new Date(nextSegment.departure.at);
        overlayDuration = formatSegemntDuration(
          nextDepartureTime.getTime() - currentArrivalTime.getTime()
        );
      }

      const formattedSegment: uniqueSegmentType = {
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
        overlayDuration: overlayDuration,
      };

      formattedSegments.push(formattedSegment);
    }

    return formattedSegments;
  };

  const outboundUniqueSegments = decodeAndFormatSegments(outboundSegmentsInfos);
  const returnUniqueSegments = decodeAndFormatSegments(returnSegmentsInfos);

  return (
    <main className="mt-8 flex flex-col gap-y-6">
      {/* OUTBOUND FLIGHT */}
      <div>
        <div className="flex items-center gap-x-1 mb-8">
          <Plane className="text-slate-800" />
          <h1 className="text-2xl font-medium text-slate-800">
            Outbound{" "}
            <span className="text-slate-500 font-normal">
              {formatDate(departureDate)}
            </span>
          </h1>
        </div>
        <Card className="py-4 px-5  shadow-none mt-4 border-violet-300">
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
                  <div className="flex items-center justify-center gap-x-5 w-[66%] ">
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
                    {outboundUniqueSegments.map((segment, index) => (
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
                          </div>
                        </div>
                        {segment.overlayDuration !== null && (
                          <p className="text-[16px] w-[64%] text-center font-bold mt-2 px-4 py-2 rounded-md text-slate-700 bg-slate-200 mb-3">
                            Overlay duration : {segment.overlayDuration}
                          </p>
                        )}
                      </>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
      {/* RETURN FLIGHT */}
      <div>
        <div className="flex items-center gap-x-1 mb-8">
          <Plane className="text-slate-800" />
          <h1 className="text-2xl font-medium text-slate-800">
            Return{" "}
            <span className="text-slate-500 font-normal">
              {formatDate(arrivalDate)}
            </span>
          </h1>
        </div>
        <Card className="py-4 px-5  shadow-none mt-4 border-violet-300">
          <CardContent className="pt-[21px] flex items-center">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg hover:no-underline">
                  <div className="flex items-center gap-x-5">
                    {flightOfferInfos.return.airlines.map(
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
                  <div className="flex items-center justify-center gap-x-5 w-[66%] ">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-slate-600 text-lg dark:text-white">
                        {flightOfferInfos.return.infos.departureTime}
                      </p>
                      <p className="text-slate-900 font-semibold dark:text-white">
                        {flightOfferInfos.return.infos.departureAirport}
                      </p>
                    </div>
                    <div className="flex flex-col items-center w-full justify-center">
                      <p>{flightOfferInfos.return.duration}</p>
                      <Separator className=" bg-slate-600 rounded my-1 dark:bg-white" />
                      {flightOfferInfos.return.infos.overlays ? (
                        <div className="flex flex-col items-center">
                          <p className="text-sm text-slate-800 dark:text-white">
                            <span className="text-red-500"> Stops :</span>{" "}
                            {flightOfferInfos.return.infos.overlays.length}
                          </p>
                          <div className="flex items-center gap-x-3">
                            {flightOfferInfos.return.infos.overlays.map(
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
                        {flightOfferInfos.return.infos.arrivalTime}
                      </p>
                      <p className="text-slate-900 font-semibold dark:text-white">
                        {flightOfferInfos.return.infos.arrivalAirport}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-5">
                  <div className="flex flex-col items-center gap-y-3">
                    {returnUniqueSegments.map((segment, index) => (
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
                          </div>
                        </div>
                        {segment.overlayDuration !== null && (
                          <p className="text-[16px] w-[64%] text-center font-bold mt-2 px-4 py-2 rounded-md text-slate-700 bg-slate-200 mb-3">
                            Overlay duration : {segment.overlayDuration}
                          </p>
                        )}
                      </>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
      <div className="mt-16 flex items-center justify-between">
        <div className="font-bold text-lg text-slate-800 border-violet-500 border-2 p-3 rounded">
          <p className="text-slate-700 ">
            Total price : <span>{flightOfferInfos.totalPrice} EUR</span>
          </p>
        </div>

        <Link
          href={`/flights/${flightOfferInfos.id}/book?flight=${encodeData(
            flightOfferInfos
          )}`}
          className="font-semibold w-36 text-white bg-slate-800 px-4 py-2 text-center rounded-md"
        >
          Book now
        </Link>
      </div>
    </main>
  );
}

export default FlightDetails;
