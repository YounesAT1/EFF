"use client";
import { paymentOptions } from "@/lib/paymentOptions";
import Image from "next/image";
import React, { useState } from "react";

export default function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>();
  return (
    <div className="grid grid-cols-3 mt-2 justify-items-center">
      {paymentOptions.map((payment, index) => (
        <div
          key={index}
          className={`border rounded-md w-20 flex items-center justify-center hover:border-violet-400 cursor-pointer ${
            index === selectedPaymentMethod
              ? "border-violet-400 border-[2px]"
              : ""
          }`}
          onClick={() => setSelectedPaymentMethod(index)}
        >
          <Image
            src={payment.image}
            alt={payment.name}
            width={50}
            height={70}
          />
        </div>
      ))}
    </div>
  );
}
