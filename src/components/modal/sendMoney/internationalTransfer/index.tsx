import React from 'react'
import ModalHeaderFlex from '../../ModalHeaderFlex'
import { Icons } from '@/components/icons'
import TextMd from '@/components/typography/TextMd'
import Input from '@/components/form/Input'
import TextSm from '@/components/typography/TextSm'
import Dropdown from '@/components/dropdown/Dropdown'
import Button from '@/components/button/Button'
import { IBeneficiaryDetails } from './InternationalTransfer'

interface IInternational{
  beneficiaryDetails: IBeneficiaryDetails
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void
  selectModalOption: (option: string | null) => void
  saveBeneficiary: boolean
  setBeneficiaryDetails: React.Dispatch<React.SetStateAction<IBeneficiaryDetails>>
  setSaveBenefiiary: (value: React.SetStateAction<boolean>) => void
  handleContinue(): void
}

export default function International({beneficiaryDetails,handleChange,selectModalOption,saveBeneficiary,setBeneficiaryDetails,setSaveBenefiiary,handleContinue}:IInternational) {
  return (
    <div>
        <ModalHeaderFlex
            Text="Send Money"
            handleBack={() => selectModalOption(null)}
          />

          <div className="w-full mt-8 pl-6 py-2 rounded-primary border border-grey-100 bg-white flex justify-start items-center gap-1">
            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-purple-200">
              <Icons.beneficiaries />
            </div>
            <div>
              <TextMd
                content="Beneficiaries"
                className="!text-md font-medium"
              />
              <TextSm
                content="Send to already saved channels"
                className="text-grey-100 -mt-1 !text-xs"
              />
            </div>
          </div>

          <form action="" className='w-full'>
            <Input
              placeholder="Bank"
              value={beneficiaryDetails.bank}
              name="bank"
              onChange={handleChange}
              className="!w-full mt-6"
              inputClassName="border border-grey-100 placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold"
            />
            <Input
              placeholder="Beneficiary Account Number"
              value={beneficiaryDetails.accountNumber}
              name="accountNumber"
              onChange={handleChange}
              className="!w-full mt-6"
              inputClassName="border border-grey-100 placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold"
            />
            <Input
              placeholder="Account Name"
              value={beneficiaryDetails.accountName}
              name="accountName"
              onChange={handleChange}
              className="!w-full mt-6"
              inputClassName="border border-grey-100 placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold"
            />
            <Input
              placeholder="$ Amount"
              value={beneficiaryDetails.amount}
              name="amount"
              onChange={handleChange}
              className="!w-full mt-6"
              inputClassName="border border-grey-100 placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold"
            />

            <div className="pl-8 mt-2">
              <TextMd content="$1 = ₦800" className="!text-md text-grey-100" />
              <div className="flex mt-2 justify-start gap-2 items-center">
                <TextMd
                  content="Fee = $0.00"
                  className="!text-md text-grey-100"
                />
                <Icons.warnGrey />
              </div>
            </div>

            <Dropdown
              setWithdrawalDetails={setBeneficiaryDetails}
              withdrawalDetails={beneficiaryDetails}
            />
          </form>

          <div className="w-full mt-[1.69rem] flex justify-between items-center">
            <TextMd
              content="Save as a Beneficiary"
              className="!text-md font-semibold text-grey-100"
            />

            <div
              className={`${
                saveBeneficiary
                  ? "bg-white border border-grey-100"
                  : "bg-grey-100"
              } relative w-11 h-3 rounded-lg `}
              onClick={() => setSaveBenefiiary(!saveBeneficiary)}
            >
              <div
                className={`${
                  saveBeneficiary
                    ? "left-[50%] bg-purple-200"
                    : "left-0 border border-grey-100 bg-white"
                } transition-all cursor-pointer -top-[.4rem] h-6 w-6 rounded-full  absolute`}
              ></div>
            </div>
          </div>

          <Button
            content="Continue"
            onClick={handleContinue}
            className="w-full mt-16"
            disabled={
              !beneficiaryDetails.accountName ||
              !beneficiaryDetails.accountNumber ||
              !beneficiaryDetails.amount ||
              !beneficiaryDetails.bank ||
              !beneficiaryDetails.reason
            }
          />
    </div>
  )
}
