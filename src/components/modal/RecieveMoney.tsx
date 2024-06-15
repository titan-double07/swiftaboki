"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import ModalHeaderFlex from "./ModalHeaderFlex";
import Image from "next/image";
import { profilee } from "../../../public";
import TextMd from "../typography/TextMd";
import { useSelector } from "react-redux";
import { IAccount, ILoggedInUser } from "@/interfaces";
import TextSm from "../typography/TextSm";
import { Icons } from "../icons";
import { enqueueSnackbar } from "notistack";

interface IRecieveMoney {
  closeModal(): void;
}

export default function RecieveMoney({ closeModal }: IRecieveMoney) {
  const user: ILoggedInUser = useSelector((state: any) => state.auth.user);

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
          enqueueSnackbar(`"${textToCopy}" successfully copied to clipboard`, {
            variant: "success",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          });
        }
        return;
      }
      if (inputRef2.current) {
        await navigator.clipboard.writeText(textToCopy2);
        enqueueSnackbar(`${textToCopy2} successfully copied to clipboard`, {
          variant: "success",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
      }
    } catch (err) {
      alert("Unable to copy text to clipboard");
    }
  };

  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={` lg:w-[29vw] w-full
md:pt-36 md:w-3/5 pt-32  py-12 pb-36 relative z-[999] h-screen bg-white overflow-y-scroll`}>
      <div className="pl-12 w-full">
        <ModalHeaderFlex Text="Recieve Money" handleBack={closeModal} />
      </div>

      <div className="mt-8 w-16 h-16 rounded-full bg-blue-200 mx-auto">
        <Image src={profilee} className="w-full h-full rounded-full" alt="" />
      </div>
      <TextMd
        content={`${user.first_name} ${user.last_name}`}
        className="text-center"
      />
      <TextSm
        content={`@ ${user.email_address}`}
        className="text-grey-100 text-center"
      />

      <div className="w-full mt-8 md:px-12 px-8">
        <div className="!bg-grey-400 px-[1.69rem] rounded-secondary py-6">
          <p className="text-md font-semibold">Account Name</p>
          <div className="w-full mt-2 px-4 h-8 !bg-white border border-black rounded-primary flex justify-between items-center">
            <p ref={inputRef} className="text-grey-100 text-xs">
              {textToCopy}
            </p>

            <Icons.copy
              className="cursor-pointer"
              onClick={() => handleCopyClick("ref1")}
            />
          </div>

          <p className="text-md font-semibold mt-4">Bank</p>
          <div className="w-full mt-2 px-4 h-8 !bg-white border border-black rounded-primary flex justify-between items-center">
            <p className="text-grey-100 text-xs">Western Union</p>
          </div>

          <p className="text-md font-semibold mt-4">Account Number</p>
          <div className="w-full mt-2 px-4 h-8 !bg-white border border-black rounded-primary flex justify-between items-center">
            <p ref={inputRef2} className="text-grey-100 text-xs">
              {textToCopy2}
            </p>

            <Icons.copy
              className="cursor-pointer"
              onClick={() => handleCopyClick("ref2")}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
