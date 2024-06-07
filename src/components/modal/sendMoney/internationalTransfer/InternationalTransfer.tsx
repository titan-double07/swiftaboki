"use client";
import React, { useEffect, useState } from "react";
import ModalHeaderFlex from "../../ModalHeaderFlex";
import TextMd from "@/components/typography/TextMd";
import TextSm from "@/components/typography/TextSm";
import { Icons } from "@/components/icons";
import Input from "@/components/form/Input";
import { IWithdrawalDetails } from "../../more/WithdrawalForm";
import Button from "@/components/button/Button";
import Dropdown from "@/components/dropdown/Dropdown";
import ModalHeaderText from "@/components/typography/ModalHeaderText";
import { IAccount } from "@/interfaces";
import OtpInput from "@/components/otp/Otp";
import ReviewTransaction from "./ReviewTransaction";
import TransactionPin from "./TransactionPin";
import International from ".";

interface IInternationalTransfer {
  selectModalOption(option: string | null): void;
  selectedAccount: IAccount;
  closeModal: () => void;
}

export interface IBeneficiaryDetails extends IWithdrawalDetails {}

export default function InternationalTransfer({
  selectModalOption,
  selectedAccount,
  closeModal,
}: IInternationalTransfer) {
  const [beneficiaryDetails, setBeneficiaryDetails] =
    useState<IBeneficiaryDetails>({
      accountName: "",
      accountNumber: "",
      amount: "",
      bank: "",
      reason: "",
    });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setBeneficiaryDetails({ ...beneficiaryDetails, [name]: value });
  }

  const [naration, setNaration] = useState("");

  const [saveBeneficiary, setSaveBenefiiary] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  function handleContinue() {
    setActiveTab(activeTab + 1);
  }

  return (
    <div className="w-full px-12 mr-12">
      {activeTab === 0 ? (
        <International
          beneficiaryDetails={beneficiaryDetails}
          handleChange={handleChange}
          handleContinue={handleContinue}
          saveBeneficiary={saveBeneficiary}
          selectModalOption={selectModalOption}
          setBeneficiaryDetails={setBeneficiaryDetails}
          setSaveBenefiiary={setSaveBenefiiary}
        />
      ) : activeTab === 1 ? (
        <ReviewTransaction
          beneficiaryDetails={beneficiaryDetails}
          handleContinue={handleContinue}
          naration={naration}
          selectedAccount={selectedAccount}
          setNaration={setNaration}
        />
      ) : (
        <TransactionPin
          beneficiaryDetails={beneficiaryDetails}
          closeModal={closeModal}
          selectedAccount={selectedAccount}
        />
      )}
    </div>
  );
}
