import React, { useState } from "react";
import { Button } from "./ui/Button";
import Destination from "./Destination";
import { destinations } from "@/lib/destinations";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

type FilterType = "summer" | "spring" | "autumn" | "winter";

export default function PopularDestinations() {
  const [filter, setFilter] = useState<FilterType>("summer");
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  const filteredDestinations = destinations.filter((destination) =>
    destination.seasons.includes(filter)
  );

  const renderButton = (filterType: FilterType, label: string) => (
    <Button
      size="lg"
      variant="secondary"
      className={`${
        filter === filterType
          ? "bg-purple-600 hover:bg-purple-700 text-white"
          : ""
      } font-semibold`}
      onClick={() => setFilter(filterType)}
    >
      {label}
    </Button>
  );

  const renderShowMoreButton = () => (
    <Button
      size="lg"
      variant="secondary"
      className="hover:bg-gray-200 mt-3"
      onClick={() => setShowAllDestinations(true)}
    >
      <ArrowDownCircle />
    </Button>
  );

  const renderShowLessButton = () => (
    <Button
      size="lg"
      variant="secondary"
      className="hover:bg-gray-200 mt-3"
      onClick={() => setShowAllDestinations(false)}
    >
      <ArrowUpCircle />
    </Button>
  );

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-50">
        Popular Destinations
      </h1>
      <div className="flex items-center sm:justify-start  justify-center mb-4">
        <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-3 mr-3">
          {renderButton("summer", "Summer")}
          {renderButton("spring", "Spring")}
        </div>
        <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-3 mr-3">
          {renderButton("autumn", "Autumn")}
          {renderButton("winter", "Winter")}
        </div>
      </div>
      <div className="w-full">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 ">
          {filteredDestinations
            .slice(0, showAllDestinations ? undefined : 2)
            .map((destination, index) => (
              <div key={index}>
                <Destination destination={destination} />
              </div>
            ))}
        </div>
        {filteredDestinations.length > 2 &&
          (showAllDestinations
            ? renderShowLessButton()
            : renderShowMoreButton())}
      </div>
    </div>
  );
}
