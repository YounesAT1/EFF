import Header from "@/components/Header";
import React from "react";
import FlightSamary from "./FlightSamary";
import { Footer } from "@/components/Footer";
import BookingForm from "./BookingForm";

export default function page() {
  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto p-6">
        <main className="grid grid-cols-1 md:grid-cols-3 h-screen">
          <div className="col-span-2  p-5">
            <BookingForm />
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
