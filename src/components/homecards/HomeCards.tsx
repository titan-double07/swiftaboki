"use client";
import { motion, useAnimation } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

interface IHomeCard {
  color: string;
  bgText: string;
  smText: string;
  img?: string ;
  hoverColor: string;
  fixedImg: string | StaticImageData;
  airtime?: boolean;
}

export default function HomeCards({
  bgText,
  hoverColor,
  color,
  smText,
  img,
  fixedImg,
  airtime,
}: IHomeCard) {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  const controls = useAnimation();

  useEffect(() => {
    if (showAnimation) {
      controls.start({ scale: 1, opacity: 1, transition: { duration: 0.5 } });
    } else {
      controls.start({ scale: 0, opacity: 0, transition: { duration: 0.5 } });
    }
  }, [showAnimation, controls]);

  const fadeUp1 = {
    hide: {
      y: "20%",
      opacity: 0,
    },
    show: {
      y: "0%",
      opacity: 1,
      transition: { delay: 1, duration: 1, type: "spring", stiffness: 120 },
    },
  };

  const scrollRef = useRef(null);
  return (
    <motion.div
      variants={fadeUp1}
      viewport={{ once: true }}
      initial="hide"
      whileInView="show"
      ref={scrollRef}
      style={{ backgroundColor: `${showAnimation ? hoverColor : "white"}` }}
      className={`${
        showAnimation ? `bg-${hoverColor}` : "bg-white"
      } transition-all lg:h-[33rem] h-84 relative overflow-hidden rounded-[1.25rem] pt-10 px-[1.875rem] w-full lg:w-[38vw] mb-[64px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]`}
      onMouseOver={() => setShowAnimation(true)}
      onMouseOut={() => setShowAnimation(false)}
    >
      <h2
        style={{
          color: `${showAnimation ? "white" : color}`,
        }}
        className={`!text-xl lg:!text-4xl lg:w-108 !font-700`}
      >
        {bgText}
      </h2>
      <p
        className={`${
          showAnimation ? "text-white" : "text-black"
        } transition-all text-md lg:!text-2xl font-light `}
      >
        {smText}
      </p>
        <div className="w-44 lg:w-80 h-44 lg:h-[18rem] absolute right-5 -bottom-0">
          <Image
            src={fixedImg}
            className="w-full h-full object-contain"
            alt=""
          />
        </div>
    </motion.div>
  );
}
