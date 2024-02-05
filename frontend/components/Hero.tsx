"use client";

import FlightSearch from "./FlightSearch";

const Hero = () => {
  return (
    <main>
      <section className="max-w-7xl mx-auto p-6 ">
        <h2 className="font-bold text-5xl text-slate-600 dark:text-slate-200">
          Start making endless memories with{" "}
          <span className="text-purple-600 dark:text-purple-500">Travely.</span>
        </h2>
        <h3 className="text-slate-500 py-5 text-xl dark:text-slate-100">
          Millions of cheap flights and hotels. One simple search.
        </h3>
      </section>
      <section className=" rounded-lg  mt-0 -mb-14 lg:px-4">
        <FlightSearch />
      </section>

      <section
        className="mx-auto max-w-7xl mt-10 p-6 bg-gray-50 rounded-lg bg-cover overflow-hidden h-[376px]"
        style={{ backgroundImage: `url(/Rectangle1.jpg)` }}
      >
        <div className="pt-8 ">
          <h3 className="text-xl font-bold">Trending distinations</h3>
          <p className="font-light">
            Most popular choises for travellers from around the world
          </p>
        </div>
      </section>
    </main>
  );
};

export default Hero;
