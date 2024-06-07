"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import ModalHeaderText from "../typography/ModalHeaderText";
import { Icons } from "../icons";
import { useDispatch, useSelector } from "react-redux";
import { IAccount } from "@/interfaces";
import { selectAccount } from "@/redux/slices/accountSlice";
import Image from "next/image";

interface IAccountModal {
  closeModal(): void;
}

export default function AccountModal({ closeModal }: IAccountModal) {
  const accounts: IAccount[] = useSelector(
    (state: any) => state.account.accounts
  );
  const selected: IAccount = useSelector(
    (state: any) => state.account.selectedAccount
  );

  const dispatch = useDispatch();

  function handleSelectAccount(account: IAccount) {
    dispatch(selectAccount(account.type));

    closeModal();
  }

  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="lg:w-[29vw] w-4/5 md:w-3/5   pt-36 py-12 relative z-[999] h-screen bg-white">
      <ModalHeaderText content="Accounts" className="text-center" />
      <div className="w-full mt-8 px-6">
        {accounts.map((account, index) => (
          <div
            className="flex justify-between mb-8 items-center cursor-pointer"
            key={index}
            onClick={() => handleSelectAccount(account)}>
            <div className="flex justify-start gap-2 items-center">
              <div className="w-10 h-10 rounded-full">
                <Image
                  src={account.img}
                  className="w-full h-full rounded-full"
                  alt=""
                />
              </div>
              <div>
                <p className="text-md font-semibold">{account.type}</p>
                <p className="text-sm text-grey-100 ">
                  {account.balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
            {account.type === selected.type && <Icons.tickCircle />}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
