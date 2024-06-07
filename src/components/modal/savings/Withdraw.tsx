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
import WithdrawalForm, { IWithdrawalDetails } from "../more/WithdrawalForm";
import ReviewWithdrawalDetails from "../more/ReviewWithdrawalDetails";
import TransactionPin from "../more/TransactionPin";

interface ITopUpModal {
  closeModal(): void;
}
export default function Withdraw({ closeModal }: ITopUpModal) {
  const [activeTab, setActiveTab] = useState(0);

  function handleClick(option: string) {
    setSelectedOption(option);
  }

  const account: IAccount = useSelector(
    (state: any) => state.account.selectedAccount
  );

  const [withdrawalDetails, setWithdrawalDetails] =
    useState<IWithdrawalDetails>({
      bank: "",
      accountNumber: "",
      accountName: "",
      amount: "",
      reason: "",
    });

  const [selectedOPtion, setSelectedOption] = useState("");

  const [amountToTopUp, setAmountToTopUp] = useState("");

  function handleNext() {
    setActiveTab(activeTab + 1);
  }

  function handlePrevious() {
    setActiveTab(activeTab - 1);
  }

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
          <ModalHeaderText content="Withdraw" className="pl-8 mb-8" />
          <div className="w-full px-8">
            <ModalFlex
              headerText="To Wallet"
              childText="Top up from your naira wallet"
              icon={<Icons.wallet />}
              handleClick={() => handleClick("wallet")}
            />

            <ModalFlex
              headerText="Bank Account"
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
            <ModalHeaderText content={"Withdraw to Wallet"} />
          </div>

          <div className="w-full mt-8 px-12">
            <Input
              value={amountToTopUp}
              onChange={(e) => setAmountToTopUp(e.target.value)}
              placeholder="₦ Amount to withdraw"
              className="w-full"
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
        <div className="w-full px-12">
          {activeTab === 0 ? (
            <>
              <WithdrawalForm
                handlePrevious={handlePrevious}
                withdrawalDetails={withdrawalDetails}
                setWithdrawalDetails={setWithdrawalDetails}
                handleNext={handleNext}
              />
            </>
          ) : activeTab === 1 ? (
            <div className="w-full">
              <ReviewWithdrawalDetails
                selectedAccount={account}
                withdrawalDetails={withdrawalDetails}
                handleNext={handleNext}
              />
            </div>
          ) : activeTab === 2 ? (
            <div className="w-full">
              <TransactionPin
                closeModal={closeModal}
                selectedAccount={account}
                withdrawalDetails={withdrawalDetails}
              />
            </div>
          ) : null}
        </div>
      )}
    </motion.div>
  );
}
