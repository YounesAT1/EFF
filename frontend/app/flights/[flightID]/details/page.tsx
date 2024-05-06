import Header from "@/components/Header";
import React from "react";
import FlightDetails from "./flightDetails";

export default function page() {
  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto mt-4 p-6">
        <h1 className="font-bold text-2xl text-slate-600 dark:text-slate-200 sm:text-3xl">
          Your{" "}
          <span className="bg-violet-400 py-1 px-5 rounded-sm text-white ">
            flight
          </span>{" "}
          details :
        </h1>
        <FlightDetails />
      </section>
    </>
  );
}
