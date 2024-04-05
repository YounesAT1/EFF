"use client";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import HotelSearch from "./HotelSearch";
import { TrendingDistinations } from "./TrendingDistinations";

const HotelsPage = () => {
  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-2xl text-slate-600 dark:text-slate-200 sm:text-5xl">
          Find your perfect stay with{" "}
          <span className="text-purple-600 dark:text-purple-500">
            Travely Hotels
          </span>
        </h2>
        <h3 className="text-slate-500 py-5 text-xl dark:text-slate-100">
          Discover thousands of hotels worldwide. Book your ideal accommodation
          hassle-free.
        </h3>
        <HotelSearch />
      </section>
      <section className="max-w-7xl mx-auto p-6 mt-8">
        <TrendingDistinations />
      </section>
      <Footer />
    </>
  );
};

export default HotelsPage;
