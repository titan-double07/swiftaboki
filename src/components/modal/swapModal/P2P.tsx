"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import { Icons } from "@/components/icons";
import ModalHeaderText from "@/components/typography/ModalHeaderText";
import { ArrowRight2 } from "iconsax-react";
import TextSm from "@/components/typography/TextSm";
import { useSelector } from "react-redux";
import { IAccount } from "@/interfaces";
import Image from "next/image";
import TextMd from "@/components/typography/TextMd";
import SelectCurrencyModal from "./SelectCurrencyModal";
import BuyP2PModal from "./BuyP2PModal";

interface IP2P {
  closeModal(): void;
}

export default function P2P({ closeModal }: IP2P) {
  const selectedAccount: IAccount = useSelector(
    (state: any) => state.account.selectedAccount
  );

  const [selectedTab, setSelectedTab] = useState("Buy");
  const [baseCurrency, setBaseCurrency] = useState<IAccount>(selectedAccount);

  function toggleTab(tab: string) {
    setSelectedTab(tab);
  }

  const [showSelectCurrencyDropdown, setShowSelectCurrencyDropdown] =
    useState(false);

  function closeShowDropDOwnMoadal() {
    setShowSelectCurrencyDropdown(false);
  }

  const [showBuyP2PModal, setShowBuyP2PModal] = useState(false);

  function handleShowBuyP2PModal() {
    setShowBuyP2PModal(true);
  }

  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${
        showSelectCurrencyDropdown || showBuyP2PModal
          ? "w-[32vw]"
          : " lg:w-[54.44vw] "
      } transition-all relative pt-32 py-12 pb-16 z-[99999] h-screen w-screen md:w-auto bg-white overflow-y-scroll`}>
      <div className="flex md:justify-start md:gap-[18rem] gap-28 items-center px-12">
        <Icons.back
          onClick={() => {
            closeModal();
          }}
          className="cursor-pointer"
        />
        <ModalHeaderText content="P2P" />
      </div>

      <div
        className="md:w-[25%] w-2/5 flex justify-between items-center px-5 mt-8 mx-auto rounded-secondary cursor-pointer py-3 bg-grey-400"
        onClick={() => {
          setShowSelectCurrencyDropdown(true);
        }}>
        <div className=" size-10 rounded-full shrink-0 space-x-5">
          <Image
            src={baseCurrency.img}
            className="w-full h-full rounded-full "
            alt=""
          />
        </div>
        <TextSm
          content={baseCurrency.type.split(" ")[1]}
          className="font-bold"
        />
        <ArrowRight2 className="cursor-pointer text-[#292D32]" />
      </div>

      <div className="w-[43%] relative h-10 rounded-primary bg-grey-400 mx-auto mt-8 flex justify-center items-center">
        <div
          className="w-1/2 h-full text-md cursor-pointer font-medium text-grey-100 flex justify-center items-center"
          onClick={() => toggleTab("Buy")}>
          Buy
        </div>
        <div
          className="w-1/2 h-full text-md cursor-pointer font-medium text-grey-100 flex justify-center items-center rounded-tr-primary rounded-br-primary"
          onClick={() => toggleTab("Sell")}>
          Sell
        </div>

        <div
          className={` ${
            selectedTab === "Buy"
              ? "left-0  bg-purple-200"
              : "left-1/2  bg-black"
          } absolute rounded-primary cursor-pointer transition-all top-0 h-full w-1/2 text-md font-medium text-white flex justify-center items-center`}>
          {selectedTab}
        </div>
      </div>

      <div className="w-full flex md:flex-row flex-col justify-between flex-wrap  mt-12 px-12">
        {[1, 2, 3, 4, 5, 6].map((card, index) => (
          <div
            className="md:w-[48%] mb-8 rounded-primary bg-grey-400 p-4"
            key={index}>
            <div className="flex justify-between items-center ">
              <TextSm
                content="Merchant Name"
                className="text-black font-medium"
              />

              <TextSm
                content="30 Trades | 90%"
                className="text-grey-100 font-medium"
              />
            </div>

            <div>
              <TextSm content="Rate" className="mt-4 text-grey-100" />
              <TextMd
                content={`${baseCurrency.currency}1 = ₦800.00`}
                className="!text-black !text-xl "
              />
            </div>

            <div className="flex mt-4 justify-between items-center">
              <div>
                <p className="text-sm text-grey-100 font-medium">
                  Amount Available <span className="text-black">= $5,000</span>{" "}
                </p>
                <p className="text-sm text-grey-100 font-medium">
                  Amount Available <span className="text-black">= $5,000</span>{" "}
                </p>
              </div>

              <button
                className="text-white hover:scale-105 transition-all text-md bg-grey-100 w-14 h-10 rounded-primary"
                onClick={handleShowBuyP2PModal}>
                {selectedTab}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showBuyP2PModal && (
        <div className="w-[100%] pt-28 md:pt-44 px-12 !fixed bg-white top-0 left-0 h-[100vh]">
          <BuyP2PModal
            setShowBuyP2PModal={setShowBuyP2PModal}
            closeModal={closeModal}
            baseCurrency={baseCurrency}
            selectedTab={selectedTab}
          />
        </div>
      )}

      {showSelectCurrencyDropdown && (
        <div className="w-[100%] pt-44 px-12 !fixed bg-white top-0 left-0 h-[250vh]">
          <SelectCurrencyModal
            baseCurrency={baseCurrency}
            setBaseCurrency={setBaseCurrency}
            closeShowDropDOwnMoadal={closeShowDropDOwnMoadal}
          />
        </div>
      )}
    </motion.div>
  );
}
