"use client";
import { Icons } from "@/components/icons";
import React from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import TextSm from "@/components/typography/TextSm";
import FlexBox from "@/components/FlexBox/FlexBox";

interface IRatesAndFees {
  closeModal(): void;
}
export default function RateAndFees({ closeModal }: IRatesAndFees) {
  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`w-[34vw] pt-32 px-12  py-12 pb-36 relative z-[999] h-screen bg-white overflow-y-scroll`}
    >
      <div className="flex w-full justify-start gap-20 items-center">
        <Icons.back className="cursor-pointer" onClick={closeModal} />
        <p className="text-xl font-bold">Rates and Fees</p>
      </div>
      <TextSm
        content="Learn about the current exchange rates
and transfer fees"
        className="text-grey-100 w-[75%] mx-auto text-center mt-8"
      />

      <div className="w-full rounded-secondary py-4 px-[1.69rem] mt-6 bg-grey-400">
        <p className="text-xs text-grey-100 font-medium">Transfer fees</p>
        <FlexBox className="mt-4">
          <p className="text-sm font-medium">Send</p>
          <p className="text-sm font-medium">
            0.5% <span className="text-grey-100"> Capped</span> at $5
          </p>
        </FlexBox>

        <FlexBox className="mt-4">
          <p className="text-sm font-medium">Swap</p>
          <p className="text-sm font-medium">
            0.5% <span className="text-grey-100"> Capped</span> at $5
          </p>
        </FlexBox>

        <TextSm
          content="We charge 0.5% of the source currency capped at $5. No matter how much you send/swap, you’ll never pay more than the equivalent of $5 in fees."
          className="!text-xs mt-4 text-grey-100"
        />
      </div>

      <div className="w-full rounded-secondary py-4 px-[1.69rem] mt-6 bg-grey-400">
        <p className="text-xs text-grey-100 font-medium">Exchange Rates</p>
        <FlexBox className="mt-4">
          <p className="text-sm font-medium">USD - NGN</p>
          <p className="text-sm font-medium">$1 = ₦800</p>
        </FlexBox>

        <FlexBox className="mt-4">
          <p className="text-sm font-medium">NGN - USD</p>
          <p className="text-sm font-medium">₦1 = $0.000961538</p>
        </FlexBox>
      </div>
    </motion.div>
  );
}
