/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Card from "@/components/dashboard_components/Card";
import { Icons } from "@/components/icons";
import ModalBackDrop from "@/components/modal/ModalBackDrop";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountModal from "@/components/modal/AccountModal";
import TransactionsModal from "@/components/modal/TransactionsModal";
import QuickActions from "@/components/dashboard_components/QuickActions";
import Transactions from "@/components/dashboard_components/Transactions";
import TopUpModal from "@/components/modal/TopUpModal";
import SwapModal from "@/components/modal/swapModal/SwapModal";
import P2P from "@/components/modal/swapModal/P2P";
import MoreModal from "@/components/modal/more/MoreModal";
import SendMoney from "@/components/modal/sendMoney/SendMoney";
import RecieveMoney from "@/components/modal/RecieveMoney";
import Paybills from "@/components/modal/payBills/Paybills";
import AirtimeToCash from "@/components/modal/airtimeToCash/AirtimeToCash";

export default function Dashboard() {
  const topUp_swap_more = [
    {
      label: "Top up",
      icon: <Icons.topUp />,
    },
    {
      label: "Swap",
      icon: <Icons.swap />,
    },
    {
      label: "More",
      icon: <Icons.more />,
    },
  ];

  const user = useSelector((state: any) => state.auth.user);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      localStorage.setItem("hasreloaded", JSON.stringify(false));
      // router.push("/auth/login");
    }
  }, []);

  const [showModal, setShowModal] = useState(false);

  // this state is used to indicate what modal is to be displayed.
  const [modalType, setModalType] = useState("");

  function openModal(type: string) {
    setShowModal(true);
    setModalType(type);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="pt-28 md:mx-12 mx-6 mt-10 pb-16">
      {/* first section */}
      <div className="w-full flex flex-col md:flex-row justify-start gap-12 items-start">
        <Card openModal={openModal} />
        <div className="flex md:flex-col justify-between items-start w-full ">
          {topUp_swap_more.map((option, index) => (
            <div
              className="flex justify-start mb-10 items-center gap-2 cursor-pointer hover:scale-105 transition-all"
              key={index}
              onClick={() => openModal(option.label)}
            >
              <div className="w-8 h-8 flex justify-center items-center rounded-full bg-purple-200">
                {option.icon}
              </div>
              <p>{option.label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* ------------------------- */}

      {/* quick actions */}
      <QuickActions openModal={openModal} />
      {/* ----------------------------- */}

      {/* transactions */}
      <Transactions openModal={openModal} />
      {/* -------------- */}

      {/* the modal component */}
      {showModal && (
        <ModalBackDrop closeModal={closeModal}>
          {modalType === "account" && <AccountModal closeModal={closeModal} />}
          {modalType === "transactions" && (
            <TransactionsModal closeModal={closeModal} />
          )}
          {modalType === "Top up" && <TopUpModal closeModal={closeModal} />}
          {modalType === "Swap" && <SwapModal openP2PModal={openModal} />}
          {modalType === "P2P" && <P2P closeModal={closeModal} />}
          {modalType === "More" && <MoreModal closeModal={closeModal} />}
          {modalType === "Send Money" && <SendMoney closeModal={closeModal} />}
          {modalType === "Receive Money" && (
            <RecieveMoney closeModal={closeModal} />
          )}
          {modalType === "Pay Bills" && <Paybills closeModal={closeModal} />}
          {modalType === "Airtime to Cash" && (
            <AirtimeToCash closeModal={closeModal} />
          )}
          {modalType === "Black Market (P2P)" && (
            <SendMoney closeModal={closeModal} />
          )}
        </ModalBackDrop>
      )}
    </div>
  );
}