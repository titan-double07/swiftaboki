"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import ModalHeaderFlex from "../ModalHeaderFlex";
import { Icons } from "@/components/icons";
import TextSm from "@/components/typography/TextSm";
import { airtel, etisalat, glo, mtn } from "../../../../public";
import Image from "next/image";
import Button from "@/components/button/Button";
import { clearTimeout } from "timers";
import TextMd from "@/components/typography/TextMd";

interface IAirtimeToCash {
  closeModal: () => void;
}
export default function AirtimeToCash({ closeModal }: IAirtimeToCash) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  function handleNext() {
    setActiveTab(activeTab + 1);
  }

  const [selectedNetwork, setSelectedNetwork] = useState("");

  const networkProvidersArr = [
    {
      Label: "MTN",
      img: mtn,
    },
    {
      Label: "AIRTEL",
      img: airtel,
    },
    {
      Label: "GLO",
      img: glo,
    },
    {
      Label: "9mobile",
      img: etisalat,
    },
  ];

  function selectNetworkProvider(network: string) {
    setSelectedNetwork(network);
  }

  const textToCopy = mobileNumber;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCopyClick = async (type: string) => {
    try {
      if (type === "ref1") {
        if (inputRef.current) {
          await navigator.clipboard.writeText(textToCopy);
          alert("Text successfully copied to clipboard");
        }
        return;
      }
    } catch (err) {
      alert("Unable to copy text to clipboard");
    }
  };

  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  function sendConfirmation() {
    setTimeout(() => {
      setLoading(true);
      setConfirmation(true);
      setLoading(false);
    }, 3000);
  }

  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={` lg:w-[29vw] w-4/5 md:w-3/5 pt-32  py-12 pb-36 relative z-[999] h-screen bg-white overflow-y-scroll`}>
      <div className="pl-12 w-full">
        <ModalHeaderFlex
          handleBack={closeModal}
          Text="Airtime to Cash"
          className="!text-black"
        />
      </div>

      {activeTab === 0 ? (
        <div className="px-12 mt-8">
          <div className="w-full relative">
            <input
              type="number"
              pattern="[0-9]*"
              className="w-full pl-3 focus:outline-none rounded-primary py-3 border border-grey-100 placeholder:text-md placeholder:text-grey-100 placeholder:font-medium"
              name=""
              id=""
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <Icons.phonebook className="absolute top-3 right-4 w-6 h-6" />
          </div>

          <TextSm content="Select Provider" className="text-black mt-3" />

          <div className="w-full flex justify-between items-center mt-2">
            {networkProvidersArr.map((network, index) => (
              <div
                className={`${
                  selectedNetwork === network.Label
                    ? "border-2 border-green-100"
                    : "border border-grey-100"
                } w-[23.4%] cursor-pointer hover:scale-105 transition-all  rounded-primary bg-white flex justify-center items-center h-16`}
                key={index}
                onClick={() => selectNetworkProvider(network.Label)}>
                <Image src={network.img} alt="" />
              </div>
            ))}
          </div>

          <div className="w-full mt-6">
            <input
              type="number"
              pattern="[0-9]*"
              className="w-full pl-3 focus:outline-none rounded-primary py-3 border border-grey-100 placeholder:text-md placeholder:text-grey-100 placeholder:font-medium"
              name=""
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              id=""
            />
          </div>

          <div className="pl-8 mt-2 flex items-center justify-start gap-2">
            <TextSm content="Fee = ₦0" className="text-grey-100" />
            <Icons.warnGrey />
          </div>
          <TextSm
            content="Recipient gets = ₦0"
            className="ml-8 text-grey-100"
          />

          <Button
            content="Continue"
            className="w-full mt-24"
            disabled={mobileNumber.length !== 11 || !amount || !selectedNetwork}
            onClick={handleNext}
          />
        </div>
      ) : (
        <div className="w-full px-12 mt-8">
          <TextSm
            content="Minimize the screen and send the airtime to the number below. Click the button below when done"
            className="!text-xs text-grey-100 text-center"
          />

          <div className="w-full mt-8">
            <div className="!bg-grey-400 px-[1.69rem] rounded-secondary py-6">
              <p className="text-md font-semibold">Mobile Number</p>
              <div className="w-full mt-2 px-4 h-8 !bg-[rgba(0,0,0,0.10)] rounded-primary flex justify-between items-center">
                <p ref={inputRef} className="text-grey-100 text-xs">
                  {textToCopy}
                </p>

                <Icons.copy
                  className="cursor-pointer"
                  onClick={() => handleCopyClick("ref1")}
                />
              </div>

              <p className="text-md font-semibold mt-4">Network</p>
              <div className="w-full mt-2 px-4 h-8 !bg-[rgba(0,0,0,0.10)] rounded-primary flex justify-between items-center">
                <p className="">{selectedNetwork}</p>
              </div>

              <p className="text-md font-semibold mt-4">
                Amount <span className="text-grey-100">(fee inclusive)</span>
              </p>
              <div className="w-full mt-2 px-4 h-8 !bg-[rgba(0,0,0,0.10)] rounded-primary flex justify-between items-center">
                <p className="text-grey-100 text-xs">{amount}</p>
              </div>
            </div>
          </div>

          <div className="mt-[17rem]">
            {loading ? (
              <TextMd content="Awaiting Confirmation" className="text-center" />
            ) : (
              <>
                {confirmation ? (
                  <TextMd
                    content="Airtime Converted Successfully"
                    className="text-center"
                  />
                ) : (
                  <Button
                    content={
                      loading
                        ? "Awaiting Confirmation"
                        : "I have sent the airtime"
                    }
                    className="w-full"
                    onClick={sendConfirmation}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
