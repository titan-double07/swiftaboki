import { IAccount } from "@/interfaces";
import Image from "next/image";
import React from "react";
import {motion} from 'framer-motion'
import { slideIn } from "@/utils/framerMotionVariants";
interface ICurrencySelect{
    accounts: IAccount[]
    handleCurrencySelect(currency: IAccount): void
}

export default function CurrencySelect({accounts,handleCurrencySelect}:ICurrencySelect) {
  return (
      <motion.div
        variants={slideIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`w-[32vw] px-10 py-12 relative z-[999] h-screen bg-white overflow-y-scroll`}
      >
        {accounts.map((account, index) => (
          <div
            key={index}
            className="flex justify-start mb-8 items-center cursor-pointer gap-2"
            onClick={() => handleCurrencySelect(account)}
          >
            <div className="w-10 h-10 rounded-full">
              <Image
                src={account.img}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <div>
              <p className="text-md text-black font-semibold">
                {account.label}
              </p>
              <p className="text-sm text-grey-100">{account.balance}</p>
            </div>
          </div>
        ))}
      </motion.div>
  );
}
