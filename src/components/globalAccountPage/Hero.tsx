"use client";
import {
  fadeUp1,
  fadeUp2,
  fadeUp3,
  hiddenMask,
  visibleMask,
} from "@/utils/framerMotionVariants";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "../icons";
import Image from "next/image";

interface IReusableHero{
  bgText:string;
  smText:string;
  img:string;
}

export default function ReusableHero({bgText,img,smText}:IReusableHero) {
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollRef = useRef(null);
  return (
    <div className="flex justify-between w-full items-center md:flex-row flex-col  mt-14 md:px-[7.8vw] px-12 pb-24 lg:pb-44">
      <div className="lg:w-[53%] ">
        <motion.h2
          variants={fadeUp1}
          viewport={{ once: true }}
          initial="hide"
          whileInView="show"
          ref={scrollRef}
          className="md:text-[4.5rem] leading-tight lg:leading-normal  text-6xl   font-extrabold"
        >
          {bgText}
        </motion.h2>

        <motion.p
          variants={fadeUp2}
          viewport={{ once: true }}
          initial="hide"
          whileInView="show"
          ref={scrollRef}
          className="text-4xl lg:w-[32rem]"
        >
          {smText}
          <span className="font-extrabold">SWIFT ABOKI</span>
        </motion.p>
{/* store buttons */}
        <motion.div
          variants={fadeUp3}
          viewport={{ once: true }}
          initial="hide"
          whileInView="show"
          ref={scrollRef}
          className="flex  mt-8 justify-center md:justify-start items-center gap-8"
        >
          <button className="w-40 h-12 bg-black rounded-primary hover:scale-105 transition-all">
            <Icons.playstore />
          </button>
          <button className="w-40 h-12 bg-black rounded-primary hover:scale-105 transition-all">
            <Icons.appstore className="h-full w-full " />
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={
          isLoaded
            ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
            : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
        }
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        className="!w-[43%] h-[27.25rem] relative hidden md:block"
      >
        <Image
          src={img}
          onLoad={() => setIsLoaded(true)}
          className=" hidden lg:block w-full h-full"
          alt=""
        />
      </motion.div>
    </div>
  );
}
