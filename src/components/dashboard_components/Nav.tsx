"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Icons } from "../icons";
import Image from "next/image";
import { proffilee } from "../../../public";
import { ILoggedInUser } from "@/interfaces";
import { useSelector } from "react-redux";
import TransactionsModal from "../modal/TransactionsModal";
import NotificationModal from "../modal/NotificationModal";
import { usePathname } from "next/navigation";

export default function Nav() {
  const loggedInUser: ILoggedInUser = useSelector(
    (state: any) => state.auth.user
  );

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  function openModal(type: string) {
    setShowModal(true);
    setModalType(type);
  }

  function closeModal() {
    setShowModal(false);
  }

  function close(e: any) {
    e.target.classList.contains("modal-backdrop") && closeModal();
  }

  const pathname = usePathname()

  return (
    <div className="ml-[18%] bg-white !z-[909] w-[82%] fixed left-0 top-0  pb-8 pt-[2.19rem] border-b border-grey-100 flex justify-between items-center px-12">
      <Link href="/dashboard" className="text-purple-200 capitalize text-xl font-bold">
        {pathname === '/dashboard' ? "Home" : pathname.split('/dashboard/')[1]}
      </Link>

      <div className="flex justify-end gap-5 items-center">
        <Icons.history
          className="cursor-pointer"
          onClick={() => openModal("transactions")}
        />
        <Icons.notification
          className="cursor-pointer"
          onClick={() => openModal("notifications")}
        />
        <div className="flex justify-start gap-5 items-center">
          <p className="text-lg font-medium text-black">
            {loggedInUser !== null && loggedInUser.first_name}{" "}
            {loggedInUser !== null && loggedInUser?.last_name}
          </p>
          <div className="w-12 h-12 bg-[#2B468B] rounded-full">
            <Image src={proffilee} className="w-full h-full" alt="" />
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal-backdrop w-full h-screen fixed flex justify-end left-0 top-[16.3%] bg-[#00000042]"
          onClick={close}
        >
          {modalType === "transactions" && (
            <TransactionsModal fromNav closeModal={closeModal} />
          )}

          {modalType === "notifications" && (
            <NotificationModal closeModal={closeModal} />
          )}
        </div>
      )}
    </div>
  );
}
