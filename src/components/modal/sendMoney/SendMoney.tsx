"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ModalHeaderText from "@/components/typography/ModalHeaderText";
import { slideIn } from "@/utils/framerMotionVariants";
import ModalFlex from "../ModalFlex";
import { Icons } from "@/components/icons";
import InternationalTransfer from "./internationalTransfer/InternationalTransfer";
import { useSelector } from "react-redux";
import { IAccount } from "@/interfaces";
import ModalHeaderFlex from "../ModalHeaderFlex";
interface ISendMoney {
  closeModal(): void;
}
export default function SendMoney({ closeModal }: ISendMoney) {
  /* 
  this state decides what part of the modal to be navigated to
  in our case either INTERNATIONAL TRANSFER OR SWIFT ABOKI TAG.
  on first render, it is null until the user selectsan option.
  */
  const [modalOption, setModalOption] = useState<string | null>(null);

  function selectModalOption(option: string | null) {
    setModalOption(option);
  }

  const selectedAccount: IAccount = useSelector(
    (state: any) => state.account.selectedAccount
  );
  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="lg:w-[29vw] w-full md:w-3/5 md:pt-36 pt-28 py-12 relative z-[999] overflow-y-scroll h-screen bg-white">
      {!modalOption && (
        <div className="md:pl-12 px-10">
          <ModalHeaderFlex
            handleBack={closeModal}
            Text="Send Money"
            className="!text-purple-200 "
          />
          <div className="mb-8"></div>
          {/* <ModalHeaderText
            content="Send Money"
            className="text-left !text-purple-200 mb-8"
          /> */}
          <ModalFlex
            icon={<Icons.international />}
            headerText="International transfer"
            childText="Bank accounts & mobile money wallets"
            handleClick={() => selectModalOption("International transfer")}
          />
          <ModalFlex
            icon={<Icons.swift />}
            headerText="Swiftaboki tag"
            childText="Send money to another user"
            handleClick={() => selectModalOption("International transfer")}
          />
        </div>
      )}

      {modalOption === "International transfer" && (
        <InternationalTransfer
          closeModal={closeModal}
          selectedAccount={selectedAccount}
          selectModalOption={selectModalOption}
        />
      )}
    </motion.div>
  );
}
