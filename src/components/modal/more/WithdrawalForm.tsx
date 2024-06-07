"use client";
import Button from "@/components/button/Button";
import Dropdown from "@/components/dropdown/Dropdown";
import Input from "@/components/form/Input";
import { Icons } from "@/components/icons";
import ModalHeaderText from "@/components/typography/ModalHeaderText";
import React, { ChangeEvent, useState } from "react";

export interface IWithdrawalDetails {
  bank: string;
  accountNumber: string;
  accountName: string;
  amount: string;
  reason: string;
}

interface IWithdrawalForm{
  handleNext(): void;
  withdrawalDetails: IWithdrawalDetails;
  setWithdrawalDetails:React.Dispatch<React.SetStateAction<IWithdrawalDetails>>;
  handlePrevious(): void
}
export default function WithdrawalForm({handleNext,withdrawalDetails,setWithdrawalDetails,handlePrevious}:IWithdrawalForm) {

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setWithdrawalDetails({ ...withdrawalDetails, [name]: value });
  }
  return (
    <div>
      <div className="flex justify-start gap-12 items-center">
        <Icons.back
            onClick={handlePrevious}
          className="cursor-pointer"
        />
        <ModalHeaderText content="Withdrawal" />
      </div>

      <form action="" className="mt-8 w-full">
        <Input
          value={withdrawalDetails.bank}
          onChange={handleChange}
          name="bank"
          className="!w-full"
          placeholder="Bank"
          inputClassName=" border border-grey-100 placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold "
        />
        <Input
          value={withdrawalDetails.accountNumber}
          onChange={handleChange}
          className="!w-full my-6"
          placeholder="Account Number"
          name="accountNumber"
          inputClassName=" border border-grey-100 placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold "
        />
        <Input
          value={withdrawalDetails.accountName}
          onChange={handleChange}
          className="!w-full"
          placeholder="Account Name"
          name="accountName"
          inputClassName=" border border-grey-100 placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold "
        />
        <Input
          value={withdrawalDetails.amount}
          onChange={handleChange}
          className="!w-full mt-6"
          placeholder="$ Amount"
          name="amount"
          inputClassName="border border-grey-100 placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold "
        />
        <Dropdown
          withdrawalDetails={withdrawalDetails}
          setWithdrawalDetails={setWithdrawalDetails}
        />
      </form>
      <Button
        content="Continue"
        className="w-full mt-24"
        disabled={
          !withdrawalDetails.accountName ||
          !withdrawalDetails.accountNumber ||
          !withdrawalDetails.amount ||
          !withdrawalDetails.bank ||
          !withdrawalDetails.reason
        }
        onClick={handleNext}
      />
    </div>
  );
}
