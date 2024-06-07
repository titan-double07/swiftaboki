"use client";
import React, { useState } from "react";
import TextMd from "../typography/TextMd";
import Image from "next/image";
import { ArrowRight2, EyeSlash } from "iconsax-react";
import { Icons } from "../icons";
import { IAccount } from "@/interfaces";
import { useSelector } from "react-redux";

interface ICard {
  openModal(type: string): void;
}
export default function Card({ openModal }: ICard) {
  const account: IAccount = useSelector(
    (state: any) => state.account.selectedAccount
  );

  const [showBalance, setShowBalance] = useState(true);

  const hiddenVal = "*******";

  return (
    <div
      className={`${
        account.currAbbreviation === "NGN" ? "bg-dark-100" : "bg-purple-100"
      } lg:w-[31.11vw] w-full  rounded-primary px-6 py-4`}
    >
      <div className="w-full flex justify-between items-center">
        <TextMd
          content={account.label}
          className="!text-xl text-white font-extrabold"
        />
        <div className="flex justify-start items-center gap-2">
          <div className="w-6 h-6 rounded-full">
            <Image
              src={account.img}
              className="w-full h-full rounded-full object-full"
              alt=""
            />
          </div>
          <TextMd
            content={account.currAbbreviation}
            className="!text-md text-white font-semibold"
          />
          <ArrowRight2
            className="text-white cursor-pointer hover:scale-105 transition-all"
            onClick={() => openModal("account")}
          />
        </div>
      </div>

      <p className="text-md mt-20 font-extrabold text-white opacity-50 flex justify-start gap-1 items-center">
        Hide Balance{" "}
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
      </p>

      {showBalance ? (
        <TextMd
          content={
            account.currency +
            " " +
            account.balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }
          className="!text-3xl mt-1 text-white font-semibold"
        />
      ) : (
        <p className="mt-1 text-3xl text-white font-semibold">{hiddenVal}</p>
        // <TextMd className="text-3xl mt-1 text-white font-semibold" content={hiddenVal} />
      )}
    </div>
  );
}
