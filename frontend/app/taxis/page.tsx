import Header from "@/components/Header";
import TaxiSearch from "./TaxiSearch";
import { Footer } from "@/components/Footer";

const TaxisPages = () => {
  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-2xl text-slate-600 dark:text-slate-200 sm:text-5xl">
          Find your perfect ride with{" "}
          <span className="text-purple-600 dark:text-purple-500">
            Travely Transfers
          </span>
        </h2>
        <h3 className="text-slate-500 py-5 text-xl dark:text-slate-100">
          Enjoy seamless transfers to and from airports, hotels, and more. Book
          your hassle-free transportation today.
        </h3>
        <TaxiSearch />
      </section>

      <Footer />
    </>
  );
};

export default TaxisPages;
