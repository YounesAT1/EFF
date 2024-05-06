import { formatDuration, formatTime } from "@/lib/helpers";

type Segment = {
  departure: {
    iataCode: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    at: string;
  };
  carrierCode: string;
  duration: string;
};

export type Flight = {
  id?: string;
  airlines: string[];
  departureAirport: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalTime: string;
  overlays?: { airport: string; duration: string }[];
  IATA: string[];
};

export const formatedFlight = (
  segments: Segment[],
  dictionaries: any
): Flight => {
  const flightInfos: Flight = {
    departureAirport: segments[0].departure.iataCode,
    departureTime: formatTime(segments[0].departure.at),
    arrivalAirport: segments[segments.length - 1].arrival.iataCode,
    arrivalTime: formatTime(segments[segments.length - 1].arrival.at),
    airlines: [],
    IATA: [],
    id: "",
  };

  const uniqueAirlines = new Set<string>();

  for (const segment of segments) {
    const airlineName = dictionaries.carriers[segment.carrierCode];
    flightInfos.IATA.push(segment.carrierCode);
    uniqueAirlines.add(airlineName);
  }

  if (segments.length > 1) {
    const overlays = [];
    for (let i = 1; i < segments.length; i++) {
      const previousSegment = segments[i - 1];
      const currentSegment = segments[i];

      const overlayDurationMs =
        new Date(currentSegment.departure.at).getTime() -
        new Date(previousSegment.arrival.at).getTime();

      overlays.push({
        airport: currentSegment.departure.iataCode,
        duration: formatDuration(overlayDurationMs),
        airlines: [
          dictionaries.carriers[previousSegment.carrierCode],
          dictionaries.carriers[currentSegment.carrierCode],
        ],
      });
    }
    flightInfos.overlays = overlays;
  }
  flightInfos.airlines = Array.from(uniqueAirlines);
  const departureDate = new Date(segments[0].departure.at);
  const arrivalDate = new Date(segments[segments.length - 1].arrival.at);

  const differenceInDays = Math.ceil(
    (arrivalDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const superscriptDigits = [" ", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
  if (differenceInDays > 0 && differenceInDays <= 3) {
    flightInfos.arrivalTime += "⁺" + superscriptDigits[differenceInDays];
  }

  return flightInfos;
};
