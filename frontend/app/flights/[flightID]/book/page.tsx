import Header from "@/components/Header";
import React from "react";
import ReservationForm from "./ReservationForm";
import FlightSamary from "./FlightSamary";
import { Footer } from "@/components/Footer";

export default function page() {
  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto p-6">
        <main className="grid grid-cols-1 md:grid-cols-3 h-screen">
          <div className="col-span-2  p-5">
            <ReservationForm />
          </div>
          <div className="col-span-1   p-5">
            <FlightSamary />
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
}
