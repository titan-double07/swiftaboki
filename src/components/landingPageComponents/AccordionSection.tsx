"use client";
import React, { useRef, useState } from "react";
import TextBg from "../typography/TextBg";
import { motion } from "framer-motion";
import { fadeUp2, fadeUp3 } from "@/utils/framerMotionVariants";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import TextSm from "../typography/TextSm";
import { Icons } from "../icons";

export default function AccordionSection() {
  const scrollRef = useRef(null);

  const accordionArr = [
    {
      bgText: "Is Swift Aboki available on Mobile?",
      smText: "Yes, it is available on android and ios ",
    },
    {
      bgText: "Can I save on the Platform?",
      smText: "Yes, you can use of our platform to save in foreign currencies",
    },
    {
      bgText: "Would I get a dollar account to receive money internationally?",
      smText:
        "Yes, with our platform you can receive money from anywhere in the world",
    },
  ];

  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  function handleActiveState(index: number) {
    index === activeAccordion
      ? setActiveAccordion(null)
      : setActiveAccordion(index);
  }
  return (
    <div>
      <TextBg
        content="Your Questions, Our Answers: FAQs"
        className="!text-lg md:!text-4xl font-bold text-black my-8 lg:my-16 text-center"
      />

      {accordionArr.map((accordion, index) => (
        <motion.div
          variants={fadeUp2}
          viewport={{ once: true }}
          initial="hide"
          whileInView="show"
          ref={scrollRef}
          className="md:px-[8.5vw] mb-6"
          key={index}>
          <div className={`transition-all py-2 mx-auto  overflow-hidden`}>
            <div
              className="w-full px-2 md:px-8 border-b border-black flex justify-between items-center cursor-pointer"
              onClick={() => handleActiveState(index)}>
              <h2 className="text-md w-[80%] lg:w-full md:text-xl font-medium">
                {accordion.bgText}
              </h2>
              {activeAccordion === index ? <ArrowUp2 /> : <ArrowDown2 />}
            </div>
            {activeAccordion === index && (
              <div className="w-full px-2 md:px-8 rounded-bl-[10px] rounded-br-[10px]  border border-black bg-white py-2">
                <TextSm
                  content={accordion.smText}
                  className="text-grey-100 font-medium text-md md:!text-lg"
                />
              </div>
            )}
          </div>
        </motion.div>
      ))}

      <motion.div
        variants={fadeUp3}
        viewport={{ once: true }}
        initial="hide"
        whileInView="show"
        ref={scrollRef}
        className="w-full lg:mt-28 mt-12 ">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 ">
          <button className="w-40 h-12 bg-black rounded-primary hover:scale-105 transition-all">
            <Icons.playstore />
          </button>
          <button className="w-40 h-12 bg-black rounded-primary hover:scale-105 transition-all">
            <Icons.appstore className="h-full w-full " />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
