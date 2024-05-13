"use client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { decodeData, formatDate } from "@/lib/helpers";
import { Circle } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function FlightSamary() {
  const params = useSearchParams();

  const flight = params.get("flight");
  const flightOfferInfos = decodeData(flight);

  return (
    <>
      <Card className="border-gray-200 p-2 shadow-none h-[560px] flex flex-col justify-center items-center w-full gap-y-2">
        <h1 className="text-lg font-semibold text-slate-800">
          Your flight summary
        </h1>
        {/* OUTBOUND FLIGHT */}
        <div className="flex items-center justify-around w-full mt-12">
          <div className="flex items-center gap-x-1 w-[20%]">
            {flightOfferInfos.outbound.airlines.map(
              (airline: any, index: number) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild className="cursor-pointer">
                      <Image
                        src={`https://images.kiwi.com/airlines/64/${airline.id}.png`}
                        alt={airline.name}
                        width={40}
                        height={40}
                        priority
                        quality={90}
                        className="rounded"
                      />
                    </TooltipTrigger>

                    <TooltipContent>
                      <p className="text-sm font-semibold">{airline.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            )}
          </div>

          <div className="flex items-center justify-center gap-x-1 w-[70%]">
            <div className="flex flex-col items-center justify-center">
              <p className="text-slate-600 text-sm dark:text-white">
                {flightOfferInfos.outbound.infos.departureTime}
              </p>
              <p className="text-slate-900 font-semibold dark:text-white">
                {flightOfferInfos.outbound.infos.departureAirport}
              </p>
            </div>
            <div className="flex flex-col items-center w-full justify-center">
              <p>{flightOfferInfos.outbound.duration}</p>
              <div className="flex items-center">
                <Circle className="w-4 h-4" />
                <Separator className=" bg-slate-600 rounded my-1 dark:bg-white w-20" />
                <Circle className="w-4 h-4" />
              </div>
              {flightOfferInfos.outbound.infos.overlays ? (
                <div className="flex flex-col items-center">
                  <p className="text-sm text-slate-800 dark:text-white">
                    <span className="text-red-500"> Stops :</span>{" "}
                    {flightOfferInfos.outbound.infos.overlays.length}
                  </p>
                  <div className="flex items-center gap-x-3">
                    {flightOfferInfos.outbound.infos.overlays.map(
                      (overlay: any, index: number) => (
                        <p key={index} className="flex text-sm">
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
              <p className="text-slate-600 text- dark:text-white">
                {flightOfferInfos.outbound.infos.arrivalTime}
              </p>
              <p className="text-slate-900 font-semibold dark:text-white">
                {flightOfferInfos.outbound.infos.arrivalAirport}
              </p>
            </div>
          </div>
        </div>
        {/* RETURN FLIGHT */}
        <div className="flex items-center justify-around w-full mt-12">
          <div className="flex items-center gap-x-1 w-[20%]">
            {flightOfferInfos.return.airlines.map(
              (airline: any, index: number) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild className="cursor-pointer">
                      <Image
                        src={`https://images.kiwi.com/airlines/64/${airline.id}.png`}
                        alt={airline.name}
                        width={40}
                        height={40}
                        priority
                        quality={90}
                        className="rounded"
                      />
                    </TooltipTrigger>

                    <TooltipContent>
                      <p className="text-sm font-semibold">{airline.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            )}
          </div>

          <div className="flex items-center justify-center gap-x-1 w-[70%]">
            <div className="flex flex-col items-center justify-center">
              <p className="text-slate-600 text-sm dark:text-white">
                {flightOfferInfos.return.infos.departureTime}
              </p>
              <p className="text-slate-900 font-semibold dark:text-white">
                {flightOfferInfos.return.infos.departureAirport}
              </p>
            </div>
            <div className="flex flex-col items-center w-full justify-center">
              <p>{flightOfferInfos.return.duration}</p>
              <div className="flex items-center">
                <Circle className="w-4 h-4" />
                <Separator className=" bg-slate-600 rounded my-1 dark:bg-white w-20" />
                <Circle className="w-4 h-4" />
              </div>
              {flightOfferInfos.return.infos.overlays ? (
                <div className="flex flex-col items-center">
                  <p className="text-sm text-slate-800 dark:text-white">
                    <span className="text-red-500"> Stops :</span>{" "}
                    {flightOfferInfos.return.infos.overlays.length}
                  </p>
                  <div className="flex items-center gap-x-3">
                    {flightOfferInfos.return.infos.overlays.map(
                      (overlay: any, index: number) => (
                        <p key={index} className="flex text-sm">
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
              <p className="text-slate-600 text- dark:text-white">
                {flightOfferInfos.return.infos.arrivalTime}
              </p>
              <p className="text-slate-900 font-semibold dark:text-white">
                {flightOfferInfos.return.infos.arrivalAirport}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
