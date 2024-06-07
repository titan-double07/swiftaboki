"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import { useSelector } from "react-redux";
import { IAccount } from "@/interfaces";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import ModalHeaderText from "@/components/typography/ModalHeaderText";
import ModalFlex from "../ModalFlex";
import { Icons } from "@/components/icons";
import TextMd from "@/components/typography/TextMd";
import TextSm from "@/components/typography/TextSm";
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";

interface ITopUpModal {
  closeModal(): void;
}
export default function TopUp({ closeModal }: ITopUpModal) {
  const [activeTab, setActiveTab] = useState(0);

  function handleClick(option: string) {
    setSelectedOption(option);
  }

  const account: IAccount = useSelector(
    (state: any) => state.account.selectedAccount
  );

  const textToCopy = account.accountName;
  const textToCopy2 = account.accountNumber;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);

  const handleCopyClick = async (type: string) => {
    try {
      if (type === "ref1") {
        if (inputRef.current) {
          await navigator.clipboard.writeText(textToCopy);
          enqueueSnackbar(`Text successfully copied to clipboard`, {
            variant: "success",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          });
        }
        return;
      }
      if (inputRef2.current) {
        await navigator.clipboard.writeText(textToCopy2);
        enqueueSnackbar(`Text successfully copied to clipboard`, {
          variant: "success",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
      }
    } catch (err) {
      alert("Unable to copy text to clipboard");
    }
  };

  const [selectedOPtion, setSelectedOption] = useState("");

  const [amountToTopUp, setAmountToTopUp] = useState("");
  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={` w-[29vw] pt-32  py-12 pb-36 relative z-[999] h-screen bg-white overflow-y-scroll`}
    >
      {!selectedOPtion && (
        <>
          {" "}
          <ModalHeaderText content="Top up" className="pl-8 mb-8" />
          <div className="w-full px-8">
            <ModalFlex
              headerText="From Wallet"
              childText="Top up from your naira wallet"
              icon={<Icons.wallet />}
              handleClick={() => handleClick("wallet")}
            />

            <ModalFlex
              headerText="Fund with Bank Transfer"
              childText="Top up through direct bank transfer"
              icon={<Icons.bank />}
              handleClick={() => handleClick("bank")}
            />
          </div>
        </>
      )}

      {selectedOPtion === "wallet" && (
        <div className="w-full">
          <div className="flex justify-start gap-8 items-center px-6">
            <Icons.back
              onClick={() => setSelectedOption("")}
              className="cursor-pointer"
            />
            <ModalHeaderText content={"Top up from Wallet"} />
          </div>

          <div className="w-full mt-8 px-12">
            <Input
              value={amountToTopUp}
              onChange={(e) => setAmountToTopUp(e.target.value)}
              placeholder="₦ Amount to top up"
              className="!w-full"
            />

            <Button
              content="Continue"
              disabled={!amountToTopUp}
              className="w-full mt-9"
              onClick={() => setSelectedOption("")}
            />
          </div>
        </div>
      )}

      {selectedOPtion === "bank" && (
        <div className="w-full">
          <div className="flex justify-start gap-[4.5rem] items-center px-12">
            <Icons.back
              onClick={() => setSelectedOption("")}
              className="cursor-pointer"
            />
            <ModalHeaderText content={"Top up"} />
          </div>

          <div className="w-full mt-8 px-8">
            <div className="!bg-grey-400 px-[1.69rem] rounded-secondary py-6">
              <p className="text-md font-semibold">Account Name</p>
              <div ref={inputRef} className="w-full mt-2 px-4 h-8 !bg-[rgba(0,0,0,0.1)] rounded-primary flex justify-between items-center">
                <p  className="text-grey-100 text-xs">
                  {textToCopy}
                </p>

                <Icons.copy
                  className="cursor-pointer"
                  onClick={() => handleCopyClick("ref1")}
                />
              </div>

              <p className="text-md font-semibold mt-4">Bank</p>
              <div className="w-full mt-2 px-4 h-8 !bg-[rgba(0,0,0,0.1)] rounded-primary flex justify-between items-center">
                <p className="text-grey-100 text-xs">Western Union</p>
              </div>

              <p className="text-md font-semibold mt-4">Account Number</p>
              <div ref={inputRef2} className="w-full mt-2 px-4 h-8 !bg-[rgba(0,0,0,0.1)] rounded-primary flex justify-between items-center">
                <p  className="text-grey-100 text-xs">
                  {textToCopy2}
                </p>

                <Icons.copy
                  className="cursor-pointer"
                  onClick={() => handleCopyClick("ref2")}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
