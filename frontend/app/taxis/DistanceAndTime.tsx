import { DirectionContext } from "@/context/directionContext";
import { Route, Timer } from "lucide-react";
import { useContext } from "react";

export default function DistanceAndTime() {
  const { direction } = useContext(DirectionContext);
  const formatDuration = (durationInSeconds: any) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <>
      <div className="flex items-center justify-between ">
        <p className="font-medium text-l flex flex-col items-center gap-y-1 p-2 border border-violet-500 dark:border-violet-900 rounded-lg">
          <Route />
          <span className="text-sm font-normal">
            {direction?.data?.routes[0].distance
              ? (direction?.data?.routes[0].distance / 1000).toFixed(2) + " KM"
              : 0 + " KM"}
          </span>
        </p>
        <p className=" text-l font-medium text-l flex flex-col items-center gap-y-1 p-2 border border-violet-500 dark:border-violet-900 rounded-lg">
          <Timer />
          <span className="text-sm font-normal">
            {direction?.data?.routes[0].duration
              ? formatDuration(direction?.data?.routes[0].duration)
              : "00:00:00"}
          </span>
        </p>
      </div>
    </>
  );
}
