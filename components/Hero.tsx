import Container from "./ui/Container";
import Image from "next/image";

const Hero = () => {
  return (
    <Container>
      <main className="py-3 px-4">
        <div className="flex flex-col justify-between p-6 text-center">
          <h1 className="text-4xl font-bold text-gray-600 dark:text-white">
            Start making endless memories with <br />
          </h1>
          <h1 className="text-purple-500 text-5xl font-bold mt-6">
            <span className="underlined relative">TRAVELY</span>
          </h1>
        </div>

        <div className="w-full md:px-16 sm:px-6 lg:px-16 aspect-w-16 h-96">
          <div
            className="w-full h-full rounded-lg  relative md:aspect-[2.4/1] overflow-hidden bg-cover "
            style={{ backgroundImage: `url(/Rectangle1.jpg)` }}
          >
            <h1 className="ml-7 font-bold text-gray-100 text-xl mt-4 lg:text-2xl dark:text-gray-900">
              Millions of cheap flights. One simple search.
            </h1>
            <div className="flex justify-center items-center gap-2"></div>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Hero;
