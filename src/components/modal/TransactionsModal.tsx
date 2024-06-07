import React from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import { Icons } from "../icons";
import ModalHeaderText from "../typography/ModalHeaderText";

interface ITransactionModal {
  closeModal(): void;
  fromNav?: boolean;
}
export default function TransactionsModal({
  closeModal,
  fromNav,
}: ITransactionModal) {
  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${
        !fromNav && "pt-36"
      } lg:w-[29vw] w-4/5 md:w-3/5  lg:py-12 pb-36 relative z-[999] h-screen bg-white overflow-y-scroll`}>
      <div className="flex justify-between items-center px-12">
        <Icons.back onClick={closeModal} className="cursor-pointer" />
        <ModalHeaderText content="Transactions" />
        <Icons.download className="cursor-pointer" />
      </div>

      <div className="w-full px-12 mt-8">
        <div className="w-full p-4 rounded-primary bg-grey-400">
          <p className="text-sm text-grey-100">May 3rd, 2023</p>
          <div className="flex justify-between items-center">
            <div className="flex justify-start gap-2 items-center">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex justify-center items-center border-black">
                <Icons.flash />
              </div>
              <div>
                <p className="text-md font-medium">Electric Bill</p>
                <p className="text-sm text-grey-100">Monday at 12:12pm</p>
              </div>
            </div>

            <p className="text-red-100 text-sm font-medium">-₦4000</p>
          </div>

          <div className="flex mt-4 justify-between items-center">
            <div className="flex justify-start gap-2 items-center">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex justify-center items-center border-black">
                <Icons.flash />
              </div>
              <div>
                <p className="text-md font-medium">Electric Bill</p>
                <p className="text-sm text-grey-100">Monday at 12:12pm</p>
              </div>
            </div>

            <p className="text-red-100 text-sm font-medium">-₦4000</p>
          </div>
        </div>

        <div className="w-full mt-4 p-4 rounded-primary bg-grey-400">
          <p className="text-sm text-grey-100">May 3rd, 2023</p>
          <div className="flex justify-between items-center">
            <div className="flex justify-start gap-2 items-center">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex justify-center items-center border-black">
                <Icons.flash />
              </div>
              <div>
                <p className="text-md font-medium">Electric Bill</p>
                <p className="text-sm text-grey-100">Monday at 12:12pm</p>
              </div>
            </div>

            <p className="text-red-100 text-sm font-medium">-₦4000</p>
          </div>
        </div>

        <div className="w-full p-4 mt-4 rounded-primary bg-grey-400">
          <p className="text-sm text-grey-100">May 3rd, 2023</p>
          <div className="flex justify-between items-center">
            <div className="flex justify-start gap-2 items-center">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex justify-center items-center border-black">
                <Icons.flash />
              </div>
              <div>
                <p className="text-md font-medium">Electric Bill</p>
                <p className="text-sm text-grey-100">Monday at 12:12pm</p>
              </div>
            </div>

            <p className="text-red-100 text-sm font-medium">-₦4000</p>
          </div>

          <div className="flex mt-4 justify-between items-center">
            <div className="flex justify-start gap-2 items-center">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex justify-center items-center border-black">
                <Icons.flash />
              </div>
              <div>
                <p className="text-md font-medium">Electric Bill</p>
                <p className="text-sm text-grey-100">Monday at 12:12pm</p>
              </div>
            </div>

            <p className="text-red-100 text-sm font-medium">-₦4000</p>
          </div>

          <div className="flex mt-4 justify-between items-center">
            <div className="flex justify-start gap-2 items-center">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex justify-center items-center border-black">
                <Icons.flash />
              </div>
              <div>
                <p className="text-md font-medium">Electric Bill</p>
                <p className="text-sm text-grey-100">Monday at 12:12pm</p>
              </div>
            </div>

            <p className="text-red-100 text-sm font-medium">-₦4000</p>
          </div>
        </div>

        <div className="w-full p-4 mt-4 rounded-primary bg-grey-400">
          <p className="text-sm text-grey-100">May 3rd, 2023</p>
          <div className="flex justify-between items-center">
            <div className="flex justify-start gap-2 items-center">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex justify-center items-center border-black">
                <Icons.flash />
              </div>
              <div>
                <p className="text-md font-medium">Electric Bill</p>
                <p className="text-sm text-grey-100">Monday at 12:12pm</p>
              </div>
            </div>

            <p className="text-red-100 text-sm font-medium">-₦4000</p>
          </div>

          <div className="flex mt-4 justify-between items-center">
            <div className="flex justify-start gap-2 items-center">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex justify-center items-center border-black">
                <Icons.flash />
              </div>
              <div>
                <p className="text-md font-medium">Electric Bill</p>
                <p className="text-sm text-grey-100">Monday at 12:12pm</p>
              </div>
            </div>

            <p className="text-red-100 text-sm font-medium">-₦4000</p>
          </div>

          <div className="flex mt-4 justify-between items-center">
            <div className="flex justify-start gap-2 items-center">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex justify-center items-center border-black">
                <Icons.flash />
              </div>
              <div>
                <p className="text-md font-medium">Electric Bill</p>
                <p className="text-sm text-grey-100">Monday at 12:12pm</p>
              </div>
            </div>

            <p className="text-red-100 text-sm font-medium">-₦4000</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
