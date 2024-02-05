import { destinations } from "@/lib/destinations";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot, Star } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/Button";

type DestinationProps = {
  destination: {
    name: string;
    description: string;
    seasons: string[];
    whatCanYouDo: string[];
    Rating: number;
    numberOfVisitersByYear: string;
    imageUrl: string;
  };
};

export default function Destination({ destination }: DestinationProps) {
  return (
    <div className="w-full sm:w-full">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CardTitle className="text-2xl">{destination.name}</CardTitle>
            </div>
            <div className="flex gap-x-2">
              {destination.seasons.map((season, index) => (
                <div key={index}>
                  <p className="text-slate-950 font-semibold">#{season}</p>
                </div>
              ))}
            </div>
          </div>
          <CardDescription>
            {destination.description} <br />
            <span className="text-slate-700 underline my-6 text-xl dark:text-gray-200">
              Average visitors per year : {destination?.numberOfVisitersByYear}
            </span>
            <Image
              src={destination.imageUrl}
              alt={destination.name}
              width="600"
              height="400"
              priority
              quality={99}
              className="rounded-sm mt-5"
            />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-800 font-semibold dark:text-gray-200">
            What can you do ?
          </p>
          <ul>
            {destination.whatCanYouDo.map((dest, index) => (
              <div key={index} className="flex items-center gap-x-2">
                <Dot />
                <li className="text-sm text-muted-foreground ">{dest}</li>
              </div>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex gap-x-2 place-content-end">
          <p className="text-gray-800 font-semibold dark:text-gray-200">
            Rating : <span className="text-xl">{destination.Rating}</span>
          </p>
          <Star />
        </CardFooter>
        <div className="flex items-center justify-center">
          <Button className="mb-3 w-[300px] sm:w-[570px] font-semibold">
            Book now
          </Button>
        </div>
      </Card>
    </div>
  );
}
