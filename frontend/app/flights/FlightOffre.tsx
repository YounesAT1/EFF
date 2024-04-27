import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type FlightOfferProps = {
  flight: any;
  dictionaries: any;
};

export default function FlightOffer({
  flight,
  dictionaries,
}: FlightOfferProps) {
  const numberOfSeats = flight.numberOfBookableSeats;
  const departureSegment = flight.itineraries[0].segments[0];
  const airlineCode = departureSegment.carrierCode;
  const airlineName = dictionaries.carriers[airlineCode];
  const departureDate = new Date(departureSegment.departure.at);
  const hours = departureDate.getHours().toString().padStart(2, "0");
  const minutes = departureDate.getMinutes().toString().padStart(2, "0");
  const departureTime = `${hours}:${minutes}`;

  const departureAirport = departureSegment.departure.iataCode;
  // const departDuration = departureSegment.duration.substring(2);

  const departureSegments = flight.itineraries[0].segments;
  const departureDurationMinutes = departureSegments.reduce(
    (totalDuration: number, segment: { duration: string }) => {
      const segmentDuration = segment.duration.substring(2); // Remove 'PT' from duration format
      const [hours, minutes] = segmentDuration.split("H");
      return totalDuration + parseInt(hours) * 60 + parseInt(minutes); // Convert hours to minutes and sum with minutes
    },
    0
  );

  const departureDurationHours = Math.floor(departureDurationMinutes / 60);
  const remainingDepartureMinutes = departureDurationMinutes % 60;

  const arrivalDate = new Date(departureSegment.arrival.at);

  const arrivalTime = `${arrivalDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${arrivalDate.getMinutes().toString().padStart(2, "0")}`;

  const arrivalAirport =
    flight.itineraries[0].segments.slice(-1)[0].arrival.iataCode; // Accessing the last segment's arrival airport

  const numberOfStops = flight.itineraries[0].segments.length - 1;
  const stopOverAirports = flight.itineraries[0].segments
    .slice(0, -1)
    .map((segment: { arrival: { iataCode: any } }) => segment.arrival.iataCode);
  const overlayDuration =
    numberOfStops > 0
      ? flight.itineraries[0].segments
          .slice(1)
          .reduce(
            (acc: any, segment: { duration: any }) => acc + segment.duration,
            0
          )
          .substring(3)
      : "N/A"; // Calculate overlay duration only if there are stops

  // Return flight information
  const returnSegment = flight.itineraries[1].segments[0];
  const departureDateReturn = new Date(returnSegment.departure.at);
  const departureTimeReturn = `${departureDateReturn
    .getHours()
    .toString()
    .padStart(2, "0")}:${departureDateReturn
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  const departureAirportReturn = returnSegment.departure.iataCode;

  const returnSegments = flight.itineraries[1].segments;
  const returnDurationMinutes = returnSegments.reduce(
    (totalDuration: number, segment: { duration: string }) => {
      const segmentDuration = segment.duration.substring(2); // Remove 'PT' from duration format
      const [hours, minutes] = segmentDuration.split("H");
      return totalDuration + parseInt(hours) * 60 + parseInt(minutes); // Convert hours to minutes and sum with minutes
    },
    0
  );

  const returnDurationHours = Math.floor(returnDurationMinutes / 60);
  const remainingReturnMinutes = returnDurationMinutes % 60;

  const arrivalDateReturn = new Date(returnSegment.arrival.at);
  const arrivalTimeReturn = `${arrivalDateReturn
    .getHours()
    .toString()
    .padStart(2, "0")}:${arrivalDateReturn
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  const arrivalAirportReturn =
    flight.itineraries[1].segments.slice(-1)[0].arrival.iataCode;
  const numberOfStopsReturn = flight.itineraries[1].segments.length - 1;
  const stopOverAirportsReturn = flight.itineraries[1].segments
    .slice(0, -1)
    .map((segment: { arrival: { iataCode: any } }) => segment.arrival.iataCode);

  const overlayDurationReturn =
    numberOfStopsReturn > 0
      ? flight.itineraries[1].segments
          .slice(1)
          .reduce(
            (acc: any, segment: { duration: any }) => acc + segment.duration,
            0
          )
          .substring(3)
      : "N/A"; // Calculate overlay duration only if there are stops

  return (
    <Card className="border border-indigo-200 shadow-none mb-4 p-2 flex items-center justify-between">
      <CardContent className="flex flex-col   mt-10 ">
        <Card className="border-none flex items-center justify-between shadow-none">
          <CardContent className="flex items-center justify-between gap-x-6 w-full">
            <div className="w-[350px]">
              <p className="text-sm font-semibold text-slate-700">
                {airlineName}
              </p>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-center justify-center">
                <p className="text-slate-600 text-lg">{departureTime}</p>
                <p className="text-slate-900 font-semibold">
                  {departureAirport}
                </p>
              </div>
              <div className="flex flex-col items-center w-96">
                <p>{`${departureDurationHours}H${remainingDepartureMinutes}M`}</p>
                <Separator className=" bg-slate-600 rounded my-1" />
                {numberOfStops ? (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[14px] ">
                      <span className="text-red-500">{numberOfStops} Stop</span>{" "}
                      {stopOverAirports.join(",")}
                    </p>
                    <span>{overlayDuration}</span>
                  </div>
                ) : (
                  <p>No stops</p>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-slate-600 text-lg">{arrivalTime}</p>
                <p className="text-slate-900 font-semibold">{arrivalAirport}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none flex items-center justify-between shadow-none">
          <CardContent className="flex items-center justify-between gap-x-6 w-full">
            <div className="w-[350px]">
              <p className="text-sm font-semibold text-slate-700">
                {airlineName}
              </p>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-center justify-center">
                <p className="text-slate-600 text-lg">{departureTimeReturn}</p>
                <p className="text-slate-900 font-semibold">
                  {departureAirportReturn}
                </p>
              </div>
              <div className="flex flex-col items-center w-96">
                <p>{`${returnDurationHours}H${remainingReturnMinutes}M`}</p>
                <Separator className=" bg-slate-600 rounded my-1" />
                {numberOfStopsReturn ? (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[14px] ">
                      <span className="text-red-500">
                        {numberOfStopsReturn} Stop
                      </span>{" "}
                      {stopOverAirportsReturn.join(",")}
                    </p>
                    <span>{overlayDurationReturn}</span>
                  </div>
                ) : (
                  <p>No stops</p>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-slate-600 text-lg">{arrivalTimeReturn}</p>
                <p className="text-slate-900 font-semibold">
                  {arrivalAirportReturn}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-y-4">
          <p className="text-lg font-semibold text-black-700">
            Available seats :{numberOfSeats}
          </p>
          <Button>Show details</Button>
        </div>
      </CardContent>
    </Card>
  );
}
