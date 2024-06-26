"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import { Icons } from "@/components/icons";
import TextMd from "@/components/typography/TextMd";
import WithdrawalForm, { IWithdrawalDetails } from "./WithdrawalForm";
import ReviewWithdrawalDetails from "./ReviewWithdrawalDetails";
import { useSelector } from "react-redux";
import { IAccount } from "@/interfaces";
import TransactionPin from "./TransactionPin";
import { Mobile } from "@/lib/mediaQuery";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import ModalHeaderText from "@/components/typography/ModalHeaderText";

interface IMoreModal {
  closeModal(): void;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function MoreModal({
  closeModal,
  showModal,
  setShowModal,
}: IMoreModal) {
  const moreOptionsArr = [
    {
      label: "View Details",
      icon: <Icons.warnWhite className="w-6 h-6" />,
    },
    {
      label: "Account Statement",
      icon: <Icons.reciept />,
    },
    {
      label: "Withdraw",
      icon: <Icons.withdraw />,
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  function handleNext() {
    setActiveTab(activeTab + 1);
  }

  function handlePrevious() {
    setActiveTab(activeTab - 1);
  }

  const [withdrawalDetails, setWithdrawalDetails] =
    useState<IWithdrawalDetails>({
      bank: "",
      accountNumber: "",
      accountName: "",
      amount: "",
      reason: "",
    });

  const selectedAccount: IAccount = useSelector(
    (state: any) => state.account.selectedAccount
  );

  return (
    <>
      <motion.div
        variants={slideIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={` hidden md:block lg:w-[29vw] w-4/5 md:w-3/5 pt-32 px-8  py-12 pb-36 relative z-[999] h-screen bg-white overflow-y-scroll`}>
        {activeTab === 0 ? (
          <>
            {" "}
            <TextMd
              content="More"
              className="text-purple-200 !text-xl font-semibold"
            />
            {moreOptionsArr.map((option, index) => (
              <div
                className="flex justify-start items-center my-8 gap-2 hover:scale-105 transition-all cursor-pointer"
                key={index}
                onClick={handleNext}>
                <div className="w-10 h-10 rounded-full bg-purple-200 flex justify-center items-center">
                  {option.icon}
                </div>

                <p className="text-md font-medium">{option.label}</p>
              </div>
            ))}
          </>
        ) : activeTab === 1 ? (
          <div className="w-full pb-24">
            <WithdrawalForm
              withdrawalDetails={withdrawalDetails}
              setWithdrawalDetails={setWithdrawalDetails}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          </div>
        ) : activeTab === 2 ? (
          <div className="w-full">
            <ReviewWithdrawalDetails
              selectedAccount={selectedAccount}
              withdrawalDetails={withdrawalDetails}
              handleNext={handleNext}
            />
          </div>
        ) : activeTab === 3 ? (
          <div className="w-full">
            <TransactionPin
              closeModal={closeModal}
              selectedAccount={selectedAccount}
              withdrawalDetails={withdrawalDetails}
            />
          </div>
        ) : null}
      </motion.div>
      <Mobile>
        <Drawer open={showModal} onOpenChange={setShowModal}>
          <DrawerContent>
            {activeTab === 0 ? (
              <div className="px-10">
                <DrawerHeader className="p-0 pt-5">
                  <TextMd
                    content="More"
                    className="text-purple-200 !text-xl font-semibold"
                  />
                </DrawerHeader>
                {moreOptionsArr.map((option, index) => (
                  <div
                    className="flex justify-start items-center mt-4 gap-4 hover:scale-105 transition-all cursor-pointer odd:border-t odd:border-b odd:py-4 "
                    key={index}
                    onClick={handleNext}>
                    <div className="w-10 h-10 rounded-full bg-purple-200 flex justify-center items-center ">
                      {option.icon}
                    </div>

                    <p className="text-md font-medium">{option.label}</p>
                  </div>
                ))}
              </div>
            ) : activeTab === 1 ? (
              <div className="w-full pb-16 pt-10 px-5 h-screen">
                <WithdrawalForm
                  withdrawalDetails={withdrawalDetails}
                  setWithdrawalDetails={setWithdrawalDetails}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                />
              </div>
            ) : activeTab === 2 ? (
              <div className="w-full pb-16 pt-10 px-5 h-screen">
                <ReviewWithdrawalDetails
                  selectedAccount={selectedAccount}
                  withdrawalDetails={withdrawalDetails}
                  handleNext={handleNext}
                />
              </div>
            ) : activeTab === 3 ? (
              <div className="w-full pb-16 pt-10 px-5 h-screen">
                <TransactionPin
                  closeModal={closeModal}
                  selectedAccount={selectedAccount}
                  withdrawalDetails={withdrawalDetails}
                />
              </div>
            ) : null}
          </DrawerContent>
        </Drawer>
      </Mobile>
    </>
  );
}
