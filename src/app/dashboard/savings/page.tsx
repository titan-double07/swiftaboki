"use client";
import Transactions from "@/components/dashboard_components/Transactions";
import { Icons } from "@/components/icons";
import ModalBackDrop from "@/components/modal/ModalBackDrop";
import TransactionsModal from "@/components/modal/TransactionsModal";
import TopUp from "@/components/modal/savings/TopUp";
import Withdraw from "@/components/modal/savings/Withdraw";
import TextBg from "@/components/typography/TextBg";
import TextSm from "@/components/typography/TextSm";
import { IAccount } from "@/interfaces";
import { selectAccount } from "@/redux/slices/accountSlice";
import { ArrowDown, ArrowUp, EyeSlash } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const [showModal, setShowModal] = useState(false);

  function closeModal() {
    setShowModal(false);
  }

  // this state is used to indicate what modal is to be displayed.
  const [modalType, setModalType] = useState("");

  function openModal(type: string) {
    setShowModal(true);
    setModalType(type);
  }

  const selectedAccount: IAccount = useSelector(
    (state: any) => state.account.selectedAccount
  );

  const [selectedTab, setSelectedTab] = useState("Dollar");
  function handleTabSelect(tab: string) {
    setSelectedTab(tab);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    function switchAccountType() {
      if (selectedTab === "Dollar") {
        dispatch(selectAccount("US Dollar"));
      } else if (selectedTab === "Naira") {
        dispatch(selectAccount("NGN Naira"));
      }
    }

    switchAccountType();
  }, [dispatch, selectedTab]);

  const [showBalance, setShowBalance] = useState(true);
  const hiddenVal = "*******";

  return (
    <div className="min-h-screen pt-28 mx-12 mt-10 pb-16">
      {/* tab */}
      <div className="w-[22.22vw] relative rounded-primary">
        <button
          className="w-1/2 h-10 rounded-tl-primary rounded-bl-primary font-semibold bg-grey-400"
          onClick={() => handleTabSelect("Dollar")}
        >
          Dollar
        </button>
        <button
          className="w-1/2 h-10 rounded-tr-primary rounded-br-primary font-semibold bg-grey-400"
          onClick={() => handleTabSelect("Naira")}
        >
          Naira
        </button>
        <button
          className={`${
            selectedTab === "Dollar"
              ? "left-0 bg-purple-200"
              : "left-[50%] bg-black"
          } transition-all absolute w-1/2 h-10 rounded-primary text-white font-semibold  `}
        >
          {selectedTab}
        </button>
      </div>

      <div className="flex w-full justify-start gap-8 items-start">
        <div className="w-[28.22vw] mt-8">
          <div className="flex pl-8 justify-start gap-1 items-center">
            <TextSm
              content="Total Savings"
              className="!text-md text-grey-100"
            />
            {showBalance ? (
              <Icons.eye
                className="cursor-pointer hover:scale-105 transition-all"
                onClick={() => setShowBalance(false)}
              />
            ) : (
              <EyeSlash
                className="text-grey-100 cursor-pointer"
                size={18}
                onClick={() => setShowBalance(true)}
              />
            )}
          </div>

          <div className=" mt-2 pl-8">
            {showBalance ? (
              <TextBg
                content={
                  selectedAccount.currency +
                  " " +
                  selectedAccount.balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }
                className="!text-5xl"
              />
            ) : (
              <p className="text-3xl mt-1 text-black font-semibold">
                {hiddenVal}
              </p>
            )}
          </div>

          <div className="mt-8">
            <TextSm
              content="This is a cash account for you to keep funds towards a target, e.g Shopping, Emergencies etc"
              className="text-grey-100"
            />
          </div>

          <div className="w-full mt-6 flex justify-between items-center">
            <div className="w-[48%] p-2 rounded-lg bg-grey-400">
              <p className="text-[.625rem]">Interest in 0 days</p>
              <div className="flex justify-start gap-1 items-end">
                <TextSm content="$0,00" className="text-black" />
                <p className="text-[.6rem] text-grey-100">at (0% p.a)</p>
              </div>
            </div>
            <div className="w-[48%] p-2 rounded-lg bg-grey-400">
              <p className="text-[.625rem] text-right">Withdrawals</p>
              <p className="text-sm text-right">
                0 <span className="text-[.6rem] text-grey-100">this month</span>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12">
          <div
            className="flex cursor-pointer hover:scale-105 transition-all justify-start gap-1 items-center"
            onClick={() => openModal("top up")}
          >
            <div className="w-6 h-6 rounded-full bg-purple-200 flex justify-center items-center">
              <ArrowDown size={18} color="white" />
            </div>
            <p>Top up</p>
          </div>

          <div
            className="flex cursor-pointer hover:scale-105 transition-all mt-9 justify-start gap-1 items-center"
            onClick={() => openModal("withdraw")}
          >
            <div className="w-6 h-6 rounded-full bg-purple-200 flex justify-center items-center">
              <ArrowUp size={18} color="white" />
            </div>
            <p>Withdraw</p>
          </div>
        </div>
      </div>

      <Transactions openModal={openModal} />

      {showModal && (
        <ModalBackDrop closeModal={closeModal}>
          {modalType === "transactions" && (
            <TransactionsModal closeModal={closeModal} />
          )}

          {modalType === "top up" && <TopUp closeModal={closeModal} />}

          {modalType === "withdraw" && <Withdraw closeModal={closeModal} />}
        </ModalBackDrop>
      )}
    </div>
  );
}
