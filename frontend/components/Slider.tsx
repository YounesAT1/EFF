import { useState, useEffect } from "react";
import { sliderImages } from "@/lib/sliderData";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sliderImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === sliderImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <section className="max-w-7xl h-[550px] w-full mx-auto py-8 px-4 relative group">
      <div
        style={{
          backgroundImage: `url(${sliderImages[currentIndex]?.url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
        className="w-full h-full rounded-2xl duration-500"
      ></div>
      <div className="transition hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] left-5 text-2xl rounded-full bg-black/30 text-white cursor-pointer p-2">
        <ArrowLeftCircle onClick={prevSlide} size={30} />
      </div>
      <div className="transition hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] right-5 text-2xl rounded-full bg-black/30 text-white cursor-pointer p-2">
        <ArrowRightCircle onClick={nextSlide} size={30} />
      </div>
    </section>
  );
}
