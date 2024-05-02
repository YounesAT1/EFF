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
};

type OutboundFlightInfo = {
  departureAirport: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalTime: string;
  airlines: string[];
  overlays?: { airport: string; duration: string }[];
  totalDuration: string;
};

export const formatOutboundFlightInfo = (
  segments: Segment[],
  dictionaries: any
): OutboundFlightInfo => {
  const outboundFlightInfo: OutboundFlightInfo = {
    departureAirport: segments[0].departure.iataCode,
    departureTime: formatTime(segments[0].departure.at),
    arrivalAirport: segments[segments.length - 1].arrival.iataCode,
    arrivalTime: formatTime(segments[segments.length - 1].arrival.at),
    airlines: [],
    totalDuration: "",
  };

  const uniqueAirlines = new Set<string>();
  let totalDurationMs = 0;

  for (const segment of segments) {
    const airlineName = dictionaries.carriers[segment.carrierCode];
    uniqueAirlines.add(airlineName);
    totalDurationMs +=
      new Date(segment.arrival.at).getTime() -
      new Date(segment.departure.at).getTime();
  }

  if (segments.length > 1) {
    const overlays = [];
    for (let i = 1; i < segments.length; i++) {
      const currentSegment = segments[i];
      const previousSegment = segments[i - 1];
      const overlayDurationMs =
        new Date(currentSegment.departure.at).getTime() -
        new Date(previousSegment.arrival.at).getTime();

      totalDurationMs += overlayDurationMs;

      const overlayDurationString = formatDuration(overlayDurationMs);

      overlays.push({
        airport: currentSegment.departure.iataCode,
        duration: overlayDurationString,
        airlines: [
          dictionaries.carriers[previousSegment.carrierCode],
          dictionaries.carriers[currentSegment.carrierCode],
        ],
      });
    }
    outboundFlightInfo.overlays = overlays;
  }

  outboundFlightInfo.airlines = Array.from(uniqueAirlines);
  outboundFlightInfo.totalDuration = formatDuration(totalDurationMs);

  // Check if arrival date is different from departure date
  const departureDate = new Date(segments[0].departure.at);
  const arrivalDate = new Date(segments[segments.length - 1].arrival.at);
  if (departureDate.toDateString() !== arrivalDate.toDateString()) {
    outboundFlightInfo.arrivalTime += "⁺¹";
  }

  return outboundFlightInfo;
};
