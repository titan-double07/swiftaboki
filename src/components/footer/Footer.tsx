"use client";
import React, { useRef } from "react";
import TextSm from "../typography/TextSm";
import Image from "next/image";
import { logod } from "../../../public";
import TextMd from "../typography/TextMd";
import { Icons } from "../icons";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Footer() {
  const pathName = usePathname();
  const fade = {
    hide: {
      y: "20%",
      opacity: 0,
    },
    show: {
      y: "0%",
      opacity: 1,
      transition: { delay: 1.5, duration: 1, type: "spring", stiffness: 120 },
    },
  };
  const scrollRef = useRef(null);
  return (
    <div
      className={`${
        // i'm dynamically hidding the footer on the login and register page.
        pathName.startsWith("/auth") || pathName.startsWith("/dashboard")
          ? "hidden"
          : "block"
      } w-full py-12 lg:pt-20 lg:pb-6 bg-purple-100`}>
      <div className="w-full xl:px-[7.5vw] px-4 lg:px-8">
        <div className=" border-b  flex flex-col lg:flex-row justify-center gap-4 items-start">
          <div className="w-full lg:w-[55%] xl:w-[70%]">
            <TextSm
              content="Sign up for our newsletter to stay updated with Swift Aboki"
              className="!text-lg lg:w-[50%] xl:!text-lg -mt-2 text-center lg:text-start font-medium text-white"
            />
            <motion.div
              variants={fade}
              viewport={{ once: true }}
              initial="hide"
              whileInView="show"
              ref={scrollRef}
              className="h-9 lg:h-12 mt-8 lg:mt-6 flex justify-center lg:justify-start  items-center">
              <input
                type="text"
                className="w-72 pl-5 h-full focus:outline-none rounded-tl-md rounded-bl-md"
                name=""
                id=""
              />
              <button className="w-28 h-full text-md lg:text-lg text-white font-semibold bg-grey-100 rounded-tr-md rounded-br-md">
                Sign up
              </button>
            </motion.div>
          </div>

          <div className="w-full !mt-16 lg:!mt-0 lg:w-[45%] py-12">
            <TextSm
              content="Contact: 9250 Pear Dr SW T6X 2X5 
            Edmonton, Alberta. | Tel: (+1) 443 877 5182"
              className="text-white -mt-14 text-center lg:!text-right xl:!text-lg"
            />
            <motion.hr
              variants={fade}
              viewport={{ once: true }}
              initial="hide"
              whileInView="show"
              ref={scrollRef}
              className="mt-3"
            />
            <motion.div
              variants={fade}
              viewport={{ once: true }}
              initial="hide"
              whileInView="show"
              ref={scrollRef}
              className="pb-4 mt-3 w-full flex justify-center lg:justify-end  gap-6 lg:items-start">
              <Icons.facebook className="lg:w-9 w-6 h-6 lg:h-9" />
              <Icons.instagram className="lg:w-9 w-6 h-6 lg:h-9" />
              <Icons.twitter className="lg:w-9 w-6 h-6 lg:h-9" />
              <Icons.youtube className="lg:w-9 w-6 h-6 lg:h-9" />
              <Icons.pinterest className="lg:w-9 w-6 h-6 lg:h-9" />
            </motion.div>
          </div>
        </div>

        <div className="w-full py-7 flex flex-col md:flex-row justify-between items-start">
          <div className="w-[60%] flex gap-10 justify-start items-start py-4">
            <ul className="">
              <li className="text-lg font-bold text-white">Products</li>
              <li className="text-white my-4 font-bold text-sm opacity-50">
                Global Account
              </li>
              <li className="text-white font-bold text-sm opacity-50">
                Swap/P2P
              </li>
              <li className="text-white my-4 font-bold text-sm opacity-50">
                Savings
              </li>
              <li className="text-white font-bold text-sm opacity-50">Cards</li>
            </ul>

            <ul>
              <li className="text-lg font-bold text-white">Company</li>
              <li className="text-white my-4 font-bold text-sm opacity-50">
                About us
              </li>
              <li className="text-white font-bold text-sm opacity-50">
                Careers
              </li>
            </ul>

            <ul>
              <li className="text-lg font-bold text-white">Community</li>
              <li className="text-white my-4 font-bold text-sm opacity-50">
                Referrals
              </li>
              <li className="text-white font-bold text-sm opacity-50">
                Swift Aboki Support
              </li>
            </ul>
          </div>

          <div className="md:w-[38%] w-full py-4">
            <motion.div
              variants={fade}
              viewport={{ once: true }}
              initial="hide"
              whileInView="show"
              ref={scrollRef}
              className="flex gap-2 w-full md:justify-end items-center">
              <Icons.logo />
            </motion.div>
            <TextMd
              content="Swiftaboki is a product of Deepmynd Technologies Ltd ( Licensed with Fintrac as an MSB )
        License Number - M23948571"
              className="md:text-right mt-6 !opacity-50 text-white !text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
