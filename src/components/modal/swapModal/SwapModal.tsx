"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import ModalFlex from "../ModalFlex";
import ModalHeaderText from "../../typography/ModalHeaderText";
import { Icons } from "../../icons";
import TextSm from "../../typography/TextSm";
import { useSelector } from "react-redux";
import { IAccount } from "@/interfaces";
import Image from "next/image";
import Button from "../../button/Button";
import OtpInput from "../../otp/Otp";
import { ngflag, usflag } from "../../../../public";
import TextMd from "../../typography/TextMd";
import P2P from "./P2P";
import Swapoption from "./Swapoption";
import CurrencySelect from "./CurrencySelect";
import InstantExchange from "./InstantExchange";
import TransactionPin from "./TransactionPin";

interface ISwapModal {
  openP2PModal(type: string): void;
}

export default function SwapModal({ openP2PModal }: ISwapModal) {
  const [activeTab, setActiveTab] = useState(0);

  const [swapOption, setSwapOption] = useState<string | null>(null);

  function handleInstantExchange() {
    setSwapOption("exchange");
    setActiveTab(activeTab + 1);
  }

  function handleP2P() {
    setSwapOption("P2P");
    openP2PModal("P2P");
  }

  const accounts: IAccount[] = useSelector(
    (state: any) => state.account.accounts
  );

  const selectedAcct: IAccount = useSelector(
    (state: any) => state.account.selectedAccount
  );

  const notSelectedAccount: IAccount | undefined = accounts.find(
    (account) => account.type !== selectedAcct.type
  );

  const [swapFromValue, setSwapFromValue] = useState<IAccount>(selectedAcct);
  const [swapToValue, setSwapToValue] = useState<IAccount | undefined>(
    notSelectedAccount
  );

  const [showCurrencyOptionModal, setShowCurrencyOptionModal] = useState(false);

  const [clickedDropDown, setClickedDropDown] = useState("");

  function handleCurrencySelect(currency: IAccount) {
    if (swapFromValue === currency) {
      return;
    } else if (clickedDropDown === "fromCurrency") {
      setSwapFromValue(currency);
      setShowCurrencyOptionModal(false);
    } else {
      setSwapToValue(currency);
      setShowCurrencyOptionModal(false);
    }
  }

  const [swapped, setSwapped] = useState<boolean>(false);

  function handleSwap() {
    setSwapped(!swapped);
  }

  const [swapAmount, setSwapAmount] = useState({
    fromAmount: "",
    toAmount: "",
  });

  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`lg:w-[29vw] w-4/5 md:w-3/5 pt-32 py-12 pb-36 relative z-[999] h-screen bg-white overflow-y-scroll`}>
      {swapOption === null && (
        <Swapoption
          handleInstantExchange={handleInstantExchange}
          handleP2P={handleP2P}
        />
      )}

      {swapOption === "exchange" && activeTab === 1 && (
        <div className="w-full">
          <InstantExchange
            activeTab={activeTab}
            handleSwap={handleSwap}
            setActiveTab={setActiveTab}
            setClickedDropDown={setClickedDropDown}
            setShowCurrencyOptionModal={setShowCurrencyOptionModal}
            setSwapAmount={setSwapAmount}
            setSwapOption={setSwapOption}
            showCurrencyOptionModal={showCurrencyOptionModal}
            swapAmount={swapAmount}
            swapFromValue={swapFromValue}
            swapToValue={swapToValue}
            swapped={swapped}>
            <div
              className="modal-backdrop w-full h-screen fixed flex justify-end left-0 top-[16.3%] bg-[#00000042]"
              onClick={close}>
              <CurrencySelect
                accounts={accounts}
                handleCurrencySelect={handleCurrencySelect}
              />
            </div>
          </InstantExchange>
        </div>
      )}

      {swapOption === "exchange" && activeTab === 2 && (
        <TransactionPin
          setActiveTab={setActiveTab}
          swapFromValue={swapFromValue}
          setSwapOption={setSwapOption}
          swapToValue={swapToValue}
        />
      )}
    </motion.div>
  );
}
