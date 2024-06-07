import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import { Icons } from "@/components/icons";
import ModalHeaderText from "@/components/typography/ModalHeaderText";
import TextMd from "@/components/typography/TextMd";
import TextSm from "@/components/typography/TextSm";
import React from "react";
import { IBeneficiaryDetails } from "./InternationalTransfer";
import { IAccount } from "@/interfaces";

interface IReviewTransaction {
  beneficiaryDetails: IBeneficiaryDetails;
  selectedAccount: IAccount;
  setNaration: (value: React.SetStateAction<string>) => void;
  naration: string;
  handleContinue(): void;
}
export default function ReviewTransaction({
  beneficiaryDetails,
  selectedAccount,
  naration,
  setNaration,
  handleContinue,
}: IReviewTransaction) {
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
        {beneficiaryDetails?.accountName?.charAt(0)}
      </div>

      <TextMd
        content={beneficiaryDetails.accountName}
        className="mt-1 text-center"
      />
      <TextSm
        content={`${beneficiaryDetails.bank} - ${beneficiaryDetails.accountNumber}`}
        className="text-grey-100 mt-2 text-center font-medium"
      />

      <div className="w-full rounded-secondary bg-grey-400 py-6 mt-6 px-4">
        <div className="w-full flex justify-between items-center">
          <TextSm
            content="Recipient Gets"
            className="text-grey-100 font-medium"
          />
          <TextSm
            content={`${selectedAccount.currency} -${beneficiaryDetails.amount}`}
            className="text-black font-medium"
          />
        </div>

        <div className="w-full mt-4 flex justify-between items-center">
          <TextSm
            content="Reason for Payment"
            className="text-grey-100 font-medium"
          />
          <TextSm
            content={beneficiaryDetails.reason}
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

      <Button
        content="Confirm"
        className="w-full mt-44"
        onClick={handleContinue}
      />
    </div>
  );
}
