import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type flightOfferProps = {
  flight: any;
};

export default function FlightOffre({ flight }: flightOfferProps) {
  return (
    <Card className="border border-indigo-200 shadow-none mb-4">
      <CardHeader>{flight.id}</CardHeader>
    </Card>
  );
}
