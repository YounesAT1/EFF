import Header from "@/components/Header";
import React from "react";
import FlightDetails from "./flightDetails";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function page() {
  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto mt-4 p-6">
        <Card className="shadow-none border-violet-400">
          <CardContent className="p-6">
            <CardHeader>
              <h1 className="font-bold text-2xl text-slate-600 dark:text-slate-200 sm:text-3xl">
                Your{" "}
                <span className="bg-violet-400 py-1 px-5 rounded-sm text-white ">
                  flight
                </span>{" "}
                details :
              </h1>
            </CardHeader>
            <FlightDetails />
          </CardContent>
        </Card>
      </section>
      <Footer />
    </>
  );
}
