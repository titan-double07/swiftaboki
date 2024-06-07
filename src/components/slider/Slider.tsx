"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { aboki1 } from "../../../public";
import { carouselArr } from "@/utils";

export default function Slider() {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const autoPlay = () => {
    const timeOut = setTimeout(() => {
      setActiveSlide((prevActive) =>
        prevActive === carouselArr.length - 1 ? 0 : prevActive + 1
      );
    }, 5000);

    return () => clearTimeout(timeOut);
  };

  useEffect(() => {
    const clearAutoPlay = autoPlay();

    return () => {
      // Cleanup on component unmount
      clearAutoPlay();
    };
  }, [activeSlide]);
  return (
    <div className="w-full h-full">
      {carouselArr.map((carousel, index) => (
        <div
          className={`${
            activeSlide === index ? "block" : "hidden"
          } w-full h-full animate-fade flex flex-col justify-center gap-6 items-center`}
          key={index}
        >
          <div className="w-[50vh] h-[50vh] mx-auto ">
            <Image src={carousel.img} className="w-full h-full object-contain" alt="" />
          </div>
          <div className="p-8">
            <h2 className="text-center text-white opacity-60 text-5xl font-bold">
              {carousel.title}
            </h2>
            <p className="text-white text-2xl text-center">{carousel.desc}</p>
          </div>

          <div className="w-[33rem] flex justify-center !pb-2 items-center gap-7">
            {carouselArr.map((_carousel, index) => (
              <div
                className={`${
                  activeSlide === index ? "bg-red-100" : "bg-blue-200"
                } w-4 h-4 rounded-full cursor-pointer`}
                onClick={() => setActiveSlide(index)}
                key={index}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
