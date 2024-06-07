"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import { Icons } from "@/components/icons";
import Transfer from "./Transfer";
import Cards from "./Cards";
import Bills from "./Bills";

interface ILimitsModal {
  closeModal(): void;
}

export default function LimitsModal({ closeModal }: ILimitsModal) {
  const [activeTab, setActiveTab] = useState("Transfer");
  function switchTab(tab: string) {
    setActiveTab(tab);
  }
  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`w-[34vw] pt-32  py-12 pb-36 relative z-[999] h-screen bg-white overflow-y-scroll`}
    >
      <div className="flex px-12 w-full justify-start gap-36 items-center">
        <Icons.back
            onClick={closeModal}
          className="cursor-pointer"
        />
        <p className="text-xl font-bold">Limits</p>
      </div>
      <div className="px-12 mt-8">
        <div className="w-full relative rounded-primary bg-grey-400 h-10 flex justify-between items-center">
          <div
            className="w-[33.3%] h-full flex cursor-pointer justify-center items-center rounded-tl-primary rounded-bl-primary"
            onClick={() => switchTab("Transfer")}
          >
            Transfer
          </div>
          <div
            className="w-[33.3%] h-full flex cursor-pointer justify-center items-center "
            onClick={() => switchTab("Cards")}
          >
            Cards
          </div>
          <div
            className="w-[33.3%] h-full cursor-pointer flex justify-center items-center  rounded-tr-primary rounded-br-primary "
            onClick={() => switchTab("Bills")}
          >
            Bills
          </div>

          <div
            className={`${
              activeTab === "Transfer"
                ? "left-0"
                : activeTab === "Cards"
                ? "left-[31.33%]"
                : "left-[68%]"
            } transition-all w-[33.1%] rounded-primary cursor-pointer flex justify-center items-center absolute left- top-0 h-full bg-purple-200 text-white`}
          >
            {activeTab}
          </div>
        </div>
          <div className="mt-6 w-full">
            {activeTab === "Transfer" && <Transfer />}

            {activeTab === "Cards" && <Cards />}

            {activeTab === "Bills" && <Bills />}
          </div>
      </div>
    </motion.div>
  );
}
