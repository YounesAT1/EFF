"use client";

import FlightSearch from "./FlightSearch";
import PopularDestinations from "./PopularDestinations";
import Slider from "./Slider";
import AboutUs from "./AboutUs";
import Services from "./Services";
import { useEffect, useState } from "react";
import useAuthContext from "@/context/AuthContext";

const Hero = () => {
  const { user, getUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        await getUser();
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <section className="max-w-7xl mx-auto p-6">
        {user ? (
          <div>
            <h2 className="font-bold text-2xl text-slate-600 dark:text-slate-200 sm:text-5xl">
              Welcom back{" "}
              <span className="text-purple-600 dark:text-purple-500">
                {user?.firstName}.
              </span>
            </h2>
            <h3 className="text-slate-500 py-5 text-xl dark:text-slate-100">
              Book your next adventure now with{" "}
              <span className="text-purple-600 dark:text-purple-500">
                Trevely.
              </span>{" "}
            </h3>
          </div>
        ) : (
          <div>
            <h2 className="font-bold text-2xl text-slate-600 dark:text-slate-200 sm:text-5xl">
              Start making endless memories with{" "}
              <span className="text-purple-600 dark:text-purple-500">
                Travely.
              </span>
            </h2>
            <h3 className="text-slate-500 py-5 text-xl dark:text-slate-100">
              Millions of cheap flights and hotels. One simple search.
            </h3>
          </div>
        )}
      </section>
      <section className=" flex items-center flex-col gap-y-4 justify-center w-full mt-0 -mb-14">
        <FlightSearch />
        <Slider />
      </section>
      <section className="max-w-7xl mx-auto p-6 mt-12">
        <PopularDestinations />
      </section>
      <section className="max-w-7xl mx-auto p-6 ">
        <Services />
      </section>
      <section className="max-w-7xl mx-auto p-6 ">
        <AboutUs />
      </section>
    </main>
  );
};

export default Hero;
