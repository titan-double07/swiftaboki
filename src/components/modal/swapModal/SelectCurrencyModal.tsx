"use client";
import React from "react";
import { useSelector } from "react-redux";
import { IAccount } from "@/interfaces";
import Image from "next/image";
import { Icons } from "@/components/icons";

interface ISelectCurrencyModal {
  setBaseCurrency: React.Dispatch<React.SetStateAction<IAccount>>;
  baseCurrency: IAccount;
  closeShowDropDOwnMoadal(): void
}
export default function SelectCurrencyModal({
  setBaseCurrency,
  baseCurrency,
  closeShowDropDOwnMoadal
}: ISelectCurrencyModal) {
  const accounts: IAccount[] = useSelector(
    (state: any) => state.account.accounts
  );


  function handleCurrencySelect(currency: IAccount) {
    setBaseCurrency(currency);
    closeShowDropDOwnMoadal()
  }
  return (
    <div className={`w-full h-full`}>
      {accounts.map((account, index) => (
        <div
          key={index}
          className="flex justify-between items-center  mb-8 cursor-pointer "
          onClick={() => handleCurrencySelect(account)}
        >
          <div className="flex justify-start gap-2 items-center">
            {" "}
            <div className="w-10 h-10 rounded-full">
              <Image
                src={account.img}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <div>
              <p className="text-md text-black font-semibold">
                {account.label}
              </p>
              <p className="text-sm text-grey-100">{account.balance}</p>
            </div>
          </div>

          {baseCurrency.type === account.type && <Icons.tickCircle />}
        </div>
      ))}
    </div>
  );
}
