"use client";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import { Icons } from "@/components/icons";
import OtpInput from "@/components/otp/Otp";
import ModalHeaderText from "@/components/typography/ModalHeaderText";
import TextMd from "@/components/typography/TextMd";
import TextSm from "@/components/typography/TextSm";
import { IAccount } from "@/interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";

interface IBuyP2PModal {
  selectedTab: string;
  baseCurrency: IAccount;
  closeModal: () => void;
  setShowBuyP2PModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function BuyP2PModal({
  selectedTab,
  baseCurrency,
  closeModal,
  setShowBuyP2PModal,
}: IBuyP2PModal) {
  const [amount, setAmount] = useState("");

  const [activeTab, setActiveTab] = useState(0);

  function handleNext() {
    setActiveTab(activeTab + 1);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value);
  }

  const [pin, setPin] = useState("");
  const onChange = (value: string) => setPin(value);
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  useEffect(() => {
    pin.length === 4 && setTransactionSuccess(true);
  }, [pin]);

  return (
    <div>
      {activeTab === 0 ? (
        <>
          <div className="flex justify-start gap-[4.5rem] items-center">
            <Icons.back
              onClick={() => setShowBuyP2PModal(false)}
              className="cursor-pointer"
            />
            <ModalHeaderText
              content={`${selectedTab} ${baseCurrency.type.split(" ")[1]}`}
            />
          </div>

          <TextSm
            content="Rate - $1 = ₦800.00"
            className="text-grey-100 mt-8"
          />
          <TextSm
            content="Minimum Buy Order = $100"
            className="text-grey-100 mt-2"
          />

          <Input
            name="amount"
            value={amount}
            onChange={handleChange}
            placeholder="$ Amount"
            className="!w-full my-6"
          />

          <div className="w-full p-6 bg-grey-400 rounded-secondary">
            <div className="flex justify-between items-center">
              <TextSm content="You Get" className="text-grey-100 font-medium" />
              <div className="flex justify-start gap-2 items-center">
                <div className="w-6 h-6 rounded-full">
                  <Image
                    src={baseCurrency.img}
                    className="w-full h-full rounded-full"
                    alt=""
                  />
                </div>
                <TextSm content="$100" className="text-black" />
              </div>
            </div>

            <div className="flex mt-4 justify-between items-center">
              <TextSm content="Fees" className="text-grey-100 font-medium" />
              <div className="flex justify-start gap-2 items-center">
                <TextSm content="$0.00" className="text-black" />
                <div className="w-6 h-6 flex justify-center items-center rounded-full">
                  <Icons.warnGrey />
                </div>
              </div>
            </div>

            <div className="flex my-4 justify-between items-center">
              <TextSm
                content="Exchange Rate"
                className="text-grey-100 font-medium"
              />
              <div className="flex justify-start gap-2 items-center">
                <TextSm content="$1 = ₦800" className="text-black" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <TextSm content="You Get" className="text-grey-100 font-medium" />
              <div className="flex justify-start gap-2 items-center">
                <div className="w-6 h-6 rounded-full">
                  <Image
                    src={baseCurrency.img}
                    className="w-full h-full rounded-full"
                    alt=""
                  />
                </div>
                <TextSm content="$100" className="text-black" />
              </div>
            </div>
          </div>

          <TextSm
            content="Please read the trade below before Proceeding"
            className="text-red-100 my-4"
          />

          <div className="w-full p-6 mb-8 bg-grey-400 rounded-secondary">
            <div className="flex justify-between items-center">
              <TextSm
                content="Trade info"
                className="text-black !text-xs font-medium"
              />
            </div>

            <div className="flex mt-4 justify-between items-center">
              <TextSm
                content="Payment Window"
                className="text-grey-100 font-medium"
              />
              <TextSm content="Instant" className="text-black font-medium" />
            </div>

            <div className="flex my-4 justify-between items-center">
              <TextSm
                content="Merchant Name"
                className="text-grey-100 font-medium"
              />
              <TextSm content="ioni" className="text-black" />
            </div>

            <div className="flex justify-between items-center">
              <TextSm
                content="Payment method"
                className="text-grey-100 font-medium"
              />

              <TextSm content="Wallet" className="text-black" />
            </div>
          </div>

          <Button
            content={`${selectedTab} ${baseCurrency.type.split(" ")[1]}`}
            disabled={!amount}
            onClick={handleNext}
            className="!w-full"
          />
        </>
      ) : (
        <div className="w-full">
          <div className="flex justify-start gap-[4.5rem] items-center">
            <Icons.back onClick={closeModal} className="cursor-pointer" />
            <ModalHeaderText
              content={`${selectedTab} ${baseCurrency.type.split(" ")[1]}`}
            />
          </div>

          <div className="w-full my-8 p-6 bg-grey-400 rounded-secondary">
            <div className="flex justify-between items-center">
              <TextSm content="You Get" className="text-grey-100 font-medium" />
              <div className="flex justify-start gap-2 items-center">
                <div className="w-6 h-6 rounded-full">
                  <Image
                    src={baseCurrency.img}
                    className="w-full h-full rounded-full"
                    alt=""
                  />
                </div>
                <TextSm content="$100" className="text-black" />
              </div>
            </div>

            <div className="flex mt-4 justify-between items-center">
              <TextSm content="Fees" className="text-grey-100 font-medium" />
              <div className="flex justify-start gap-2 items-center">
                <TextSm content="$0.00" className="text-black" />
                <div className="w-6 h-6 flex justify-center items-center rounded-full">
                  <Icons.warnGrey />
                </div>
              </div>
            </div>

            <div className="flex my-4 justify-between items-center">
              <TextSm
                content="Exchange Rate"
                className="text-grey-100 font-medium"
              />
              <div className="flex justify-start gap-2 items-center">
                <TextSm content="$1 = ₦800" className="text-black" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <TextSm content="You Get" className="text-grey-100 font-medium" />
              <div className="flex justify-start gap-2 items-center">
                <div className="w-6 h-6 rounded-full">
                  <Image
                    src={baseCurrency.img}
                    className="w-full h-full rounded-full"
                    alt=""
                  />
                </div>
                <TextSm content="$100" className="text-black" />
              </div>
            </div>
          </div>

          {!transactionSuccess && (
            <OtpInput
              value={pin}
              setValue={setPin}
              onChange={onChange}
              valueLength={4}
            />
          )}

          {transactionSuccess && (
            <TextMd
              content="Transaction Successful"
              className="font-semibold mt-24 text-center"
            />
          )}
        </div>
      )}
    </div>
  );
}
