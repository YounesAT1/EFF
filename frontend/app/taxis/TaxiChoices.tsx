"use client";
import { DirectionContext } from "@/context/directionContext";
import { taxiOption } from "@/lib/taxiOptions";
import Image from "next/image";
import React, { useContext, useState } from "react";

export default function TaxiChoices() {
  const [selectedTaxiOption, setSelectedTaxiOption] = useState<any>();
  const { direction } = useContext(DirectionContext);

  const getCost = (charges: any) => {
    const distanceInMeters = direction?.data?.routes[0].distance;
    const distanceInKilometers = distanceInMeters ? distanceInMeters / 1000 : 0;
    return (charges * distanceInKilometers).toFixed(2);
  };

  return (
    <div>
      <h1 className="font-medium text-l">Select a car </h1>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 ">
        {taxiOption.map((taxi, index) => (
          <div
            key={index}
            className={`m-2 p-2 border rounded-md hover:border-violet-400 cursor-pointer flex flex-col justify-between ${
              index === selectedTaxiOption
                ? "border-violet-400 border-[2px]"
                : ""
            }`}
            onClick={() => setSelectedTaxiOption(index)}
          >
            <Image
              src={taxi.image}
              alt={taxi.name}
              width={75}
              height={90}
              quality={100}
              priority
              className="w-full"
            />
            <div className="flex flex-col items-center justify-between">
              <h2 className="text-sm text-slate-700 dark:text-slate-100">
                {taxi.name}
              </h2>
              {direction && (
                <span className=" text-sm font-semibold">
                  {getCost(taxi.charges)} $
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
