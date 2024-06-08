"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";

const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState("flights");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const renderTable = () => {
    if (selectedTab === "flights") {
      return (
        <table className="table-auto border border-gray-500">
          {/* Flight table content */}
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Departure</th>
              <th>Destination</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>{/* Render flight reservation data rows */}</tbody>
        </table>
      );
    } else if (selectedTab === "hotels") {
      return (
        <table className="table-auto border border-gray-500">
          {/* Hotel table content */}
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>Location</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>{/* Render hotel reservation data rows */}</tbody>
        </table>
      );
    } else if (selectedTab === "taxis") {
      return (
        <table className="table-auto border border-gray-500">
          {/* Taxi table content */}
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>Location</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>{/* Render taxi reservation data rows */}</tbody>
        </table>
      );
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto mt-10 p-6">
        <h1 className="text-3xl font-bold mb-4 text-slate-700">
          Welcome to Your{" "}
          <span className="bg-violet-400 px-3 py-2 text-white rounded-md">
            Dashboard
          </span>
        </h1>
        <div className="flex mt-12 gap-x-4">
          <Button
            size="lg"
            variant="secondary"
            className={` ${
              selectedTab === "flights"
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : ""
            } font-semibold`}
            onClick={() => handleTabClick("flights")}
          >
            Flights
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className={` ${
              selectedTab === "hotels"
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : ""
            } font-semibold`}
            onClick={() => handleTabClick("hotels")}
          >
            Hotels
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className={` ${
              selectedTab === "taxis"
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : ""
            } font-semibold`}
            onClick={() => handleTabClick("taxis")}
          >
            Taxis
          </Button>
        </div>
        <div className="mt-8">{renderTable()}</div>
      </div>
    </>
  );
};

export default DashboardPage;
