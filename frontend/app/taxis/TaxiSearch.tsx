import React from "react";
import TaxiBookingForm from "./TaxiBookingForm";

export default function TaxiSearch() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div>
          <TaxiBookingForm />
        </div>
        <div className="col-span-2 md:pl-16">map</div>
      </div>
    </div>
  );
}
