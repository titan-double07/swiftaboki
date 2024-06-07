'use client'
import { Icons } from '@/components/icons';
import OtpInput from '@/components/otp/Otp';
import ModalHeaderText from '@/components/typography/ModalHeaderText';
import TextSm from '@/components/typography/TextSm';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { ngflag, usflag } from '../../../../public';
import TextMd from '@/components/typography/TextMd';
import { IAccount } from '@/interfaces';

interface ITransactionPin{
    setActiveTab: (value: React.SetStateAction<number>) => void;
    setSwapOption: (value: React.SetStateAction<string | null>) => void;
    swapFromValue: IAccount;
    swapToValue: IAccount | undefined;
}

export default function TransactionPin({setActiveTab,setSwapOption,swapFromValue,swapToValue}:ITransactionPin) {

    const [pin, setPin] = useState("");
    const onChange = (value: string) => setPin(value);
    const [transactionSuccess, setTransactionSuccess] = useState(false);
  
    useEffect(() => {
      pin.length === 4 && setTransactionSuccess(true);
    }, [pin]);

  return (
    <div className="w-full">
    <div className="flex justify-start gap-12 items-center px-6">
      <Icons.back
        onClick={() => {
          setSwapOption(null);
          setActiveTab(0);
        }}
        className="cursor-pointer"
      />
      <ModalHeaderText
        content={
          transactionSuccess ? "Review details" : "Instant Exchange"
        }
      />
    </div>

    <div className="w-full px-12 mt-8">
      <p className="text-grey-100 text-center mb-8">
        You are initiating a currency swap from your{" "}
        <span className="text-black font-medium">
          {swapFromValue.currAbbreviation} balance
        </span>{" "}
        to your  
        <span className="text-black font-medium">
           {" "+swapToValue?.currAbbreviation} balance
        </span>
        . Please confirm the details below and proceed
      </p>

      {!transactionSuccess && (
        <OtpInput
          value={pin}
          setValue={setPin}
          onChange={onChange}
          valueLength={4}
        />
      )}

      <div className="bg-grey-400 rounded-secondary p-6 mt-8">
        <div className="flex justify-between items-center">
          <TextSm content="You Pay" className="text-sm text-grey-100" />

          <div className="flex justify-start items-center gap-1">
            <div className="w-4 h-4 rounded-full">
              <Image
                src={usflag}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <p className="text-sm">$1</p>
          </div>
        </div>

        <div className="flex my-4 justify-between items-center">
          <TextSm
            content="Amount Converted"
            className="text-sm text-grey-100"
          />

          <div className="flex justify-start items-center gap-1">
            <div className="w-4 h-4 rounded-full">
              <Image
                src={usflag}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <p className="text-sm">$0.99</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <TextSm content="Fees" className="text-sm text-grey-100" />

          <div className="flex justify-start items-center gap-1">
            <p className="text-sm">$1</p>
            <div className="w-4 h-4 bg-grey-100 rounded-full">
              <Icons.warnWhite />
            </div>
          </div>
        </div>

        <div className="flex my-4 justify-between items-center">
          <TextSm
            content="Exchange Rate"
            className="text-sm text-grey-100"
          />

          <p className="text-sm">$1 = ₦800</p>
        </div>

        <div className="flex justify-between items-center">
          <TextSm content="You Get" className="text-sm text-grey-100" />

          <div className="flex justify-start items-center gap-1">
            <div className="w-4 h-4 rounded-full">
              <Image
                src={ngflag}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <p className="text-sm">₦796</p>
          </div>
        </div>
      </div>

      {transactionSuccess && (
        <TextMd
          content="Transaction Successful"
          className="font-semibold mt-24 text-center"
        />
      )}
    </div>
  </div>
  )
}
