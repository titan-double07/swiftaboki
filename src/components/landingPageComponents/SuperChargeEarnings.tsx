"use client";
import React, { useRef } from "react";
import TextBg from "../typography/TextBg";
import TextSm from "../typography/TextSm";
import { motion } from "framer-motion";
import { fadeUp1 } from "@/utils/framerMotionVariants";
import { objects } from "../../../public";
import Image from "next/image";
import AccordionSection from "./AccordionSection";
export default function SuperChargeEarnings() {
  const scrollRef = useRef(null);

  return (
    <div className="w-full px-4 md:px-[7.8vw] bg-grey-400 pb-4 lg:py-28">
      <div className="w-full flex justify-between items-center mx-auto lg:w-full rounded-[1.125rem] bg-[#1E1E1E] -mt-72 lg:!-mt-96 pt-14 pb-16 lg:!pl-[3.3rem] pl-[1.6rem] pr-[1.6rem]">
        <div>
          <TextBg
            content="Supercharge Your Earnings: Refer and Earn Big"
            className="text-xl lg:text-start text-center lg:text-5xl font-extrabold text-white w-[90%] mx-auto lg:mx-0 lg:w-170"
          />
          <TextSm
            content="How it works: Invite someone to join our platform, and when they make their first deposit, you'll both unlock your prosperity. 
        It's a win-win opportunity."
            className="text-white lg:w-158 text-md text-center lg:text-start lg:!text-3xl font-light mt-2"
          />

          <motion.button
            variants={fadeUp1}
            viewport={{ once: true }}
            initial="hide"
            whileInView="show"
            ref={scrollRef}
            className="w-full lg:w-80 mx-auto lg:px-12 py-2 lg:py-5 mt-36 lg:mt-16 rounded-[1.25rem] border text-md lg:text-3xl font-bold text-white border-white hover:scale-105 transition-all"
          >
            Refer and Earn
          </motion.button>
        </div>

        <div className="w-[28vw] h-[20.4rem]">
          <Image src={objects} alt="" />
        </div>
      </div>

      <AccordionSection/>
    </div>
  );
}
