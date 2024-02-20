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
              <CardTitle className="text-3xl">{destination.name}</CardTitle>
            </div>
            <div className="flex gap-x-2">
              {destination.seasons.map((season, index) => (
                <div key={index}>
                  <p className="text-slate-950 font-semibold dark:text-gray-100">
                    #{season}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <CardDescription>
            {destination.description} <br />
            <span className="text-slate-700 underline text-xl dark:text-gray-200 mt-4">
              Average visitors per year : {destination?.numberOfVisitersByYear}
            </span>
            <div className="relative w-full h-[350px] mt-4">
              <Image
                src={destination.imageUrl}
                alt={destination.name}
                layout="fill"
                objectFit="cover"
                className="rounded-sm"
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-800 font-semibold dark:text-gray-200 mt-4">
            What can you do?
          </p>
          <ul className="ml-4">
            {destination.whatCanYouDo.map((dest, index) => (
              <div key={index} className="flex items-center gap-x-2">
                <Dot className="text-sm text-muted-foreground" />
                <li className="text-sm text-muted-foreground">{dest}</li>
              </div>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex items-center justify-between mt-4">
          <p className="text-gray-800 font-semibold dark:text-gray-200">
            Rating: <span className="text-xl">{destination.Rating}</span>
          </p>
          <Star className="text-yellow-500" />
        </CardFooter>
        <div className="flex items-center justify-center mt-4">
          <Button className="mb-3 w-[300px] sm:w-[570px] font-semibold">
            Book now
          </Button>
        </div>
      </Card>
    </div>
  );
}
