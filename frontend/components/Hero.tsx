"use client";

import FlightSearch from "./FlightSearch";
import PopularDestinations from "./PopularDestinations";
import Slider from "./Slider";

const Hero = () => {
  return (
    <main>
      <section className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-2xl text-slate-600 dark:text-slate-200 sm:text-5xl">
          Start making endless memories with{" "}
          <span className="text-purple-600 dark:text-purple-500">Travely.</span>
        </h2>
        <h3 className="text-slate-500 py-5 text-xl dark:text-slate-100">
          Millions of cheap flights and hotels. One simple search.
        </h3>
      </section>
      <section className=" flex items-center flex-col gap-y-4 justify-center w-full mt-0 -mb-14">
        <FlightSearch />
        <Slider />
      </section>
      <section className="max-w-7xl mx-auto p-6 mt-12">
        <PopularDestinations />
      </section>
    </main>
  );
};

export default Hero;
