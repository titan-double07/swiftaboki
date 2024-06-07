import { Icons } from "@/components/icons";
import ModalHeaderText from "@/components/typography/ModalHeaderText";
import React, { useState } from "react";
import { IWithdrawalDetails } from "./WithdrawalForm";
import TextMd from "@/components/typography/TextMd";
import TextSm from "@/components/typography/TextSm";
import { IAccount } from "@/interfaces";
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";

interface IReviewWithdrawalDetails {
  withdrawalDetails: IWithdrawalDetails;
  selectedAccount: IAccount;
  handleNext(): void;
}
export default function ReviewWithdrawalDetails({
  withdrawalDetails,
  selectedAccount,
  handleNext,
}: IReviewWithdrawalDetails) {
  const [naration, setNaration] = useState("");

  return (
    <div className="w-full">
      <div className="flex justify-start gap-12 items-center ">
        <Icons.back
          //   onClick={() => setActiveTab(activeTab - 1)}
          className="cursor-pointer"
        />
        <ModalHeaderText content="Review details" />
      </div>

      <div className="w-16 h-16 rounded-full flex justify-center items-center mx-auto text-xl font-bold text-white bg-blue-200 mt-8">
        {withdrawalDetails?.accountName?.charAt(0)}
      </div>

      <TextMd
        content={withdrawalDetails.accountName}
        className="mt-1 text-center"
      />
      <TextSm
        content={`${withdrawalDetails.bank} - ${withdrawalDetails.accountNumber}`}
        className="text-grey-100 mt-2 text-center font-medium"
      />

      <div className="w-full rounded-secondary bg-grey-400 py-6 mt-6 px-4">
        <div className="w-full flex justify-between items-center">
          <TextSm
            content="Recipient Gets"
            className="text-grey-100 font-medium"
          />
          <TextSm
            content={`${selectedAccount.currency} -${withdrawalDetails.amount}`}
            className="text-black font-medium"
          />
        </div>

        <div className="w-full mt-4 flex justify-between items-center">
          <TextSm
            content="Reason for Payment"
            className="text-grey-100 font-medium"
          />
          <TextSm
            content={withdrawalDetails.reason}
            className="text-black font-medium"
          />
        </div>

        <div className="w-full mt-4 flex justify-between items-center">
          <TextSm content="Fees" className="text-grey-100 font-medium" />
          <div className="flex justify-start items-center gap-2 ">
            <TextSm content="₦1.50" className="text-black font-medium" />

            <div>
              <Icons.warnGrey />
            </div>
          </div>
        </div>
      </div>

      <Input
        placeholder="Narration (Optional)"
        value={naration}
        onChange={(e) => setNaration(e.target.value)}
        name="naration"
        className="!w-full mt-6"
        inputClassName="border border-grey-100 placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold"
      />

      <Button content="Confirm" className="w-full mt-44" onClick={handleNext} />
    </div>
  );
}
