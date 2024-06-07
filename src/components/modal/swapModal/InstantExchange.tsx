import Button from "@/components/button/Button";
import { Icons } from "@/components/icons";
import ModalHeaderText from "@/components/typography/ModalHeaderText";
import TextSm from "@/components/typography/TextSm";
import { IAccount } from "@/interfaces";
import Image from "next/image";
import React, { ReactNode } from "react";

interface IInstantExchange {
  setSwapOption: (value: React.SetStateAction<string | null>) => void;
  setActiveTab: (value: React.SetStateAction<number>) => void;
  activeTab:number;
  swapped: boolean;
  swapFromValue: IAccount;
  swapToValue: IAccount | undefined;
  setClickedDropDown: (value: React.SetStateAction<string>) => void;
  setShowCurrencyOptionModal: (value: React.SetStateAction<boolean>) => void;
  setSwapAmount: (
    value: React.SetStateAction<{
      fromAmount: string;
      toAmount: string;
    }>
  ) => void;
  swapAmount: {
    fromAmount: string;
    toAmount: string;
  };
  handleSwap(): void;
  showCurrencyOptionModal: boolean;
  children: ReactNode;
}

export default function InstantExchange({
  setSwapOption,
  setActiveTab,
  swapped,
  swapFromValue,
  setClickedDropDown,
  setShowCurrencyOptionModal,
  setSwapAmount,
  handleSwap,
  swapToValue,
  swapAmount,
  showCurrencyOptionModal,
  children,
  activeTab
}: IInstantExchange) {
  return (
    <div className="w-full">
      <div className="flex justify-start gap-6 items-center px-6">
        <Icons.back
          onClick={() => {
            setSwapOption(null);
            setActiveTab(0);
          }}
          className="cursor-pointer"
        />
        <ModalHeaderText content="Instant Exchange" />
      </div>

      <div className="w-full relative mt-8 px-6">
        <div
          className={`${
            swapped ? "top-24" : "-top-20"
          } transition-all left-[11.5%]  absolute  w-[77%] h-12 rounded-primary bg-grey-400 flex justify-center items-center`}
        >
          <div
            className={`${
              swapFromValue.currAbbreviation === "NGN"
                ? "bg-dark-100"
                : "bg-purple-200"
            } w-[35%] flex justify-between items-center cursor-pointer px-1 h-full rounded-bl-primary rounded-tl-primary `}
            onClick={() => {
              setClickedDropDown("fromCurrency");
              setShowCurrencyOptionModal(true);
            }}
          >
            <div className="w-8 h-8 rounded-full">
              <Image
                src={swapFromValue.img}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <p className="text-md font-semibold text-white">
              {swapFromValue.currAbbreviation}
            </p>
            <Icons.arrowDown />
          </div>
          <input
            type="text"
            value={swapAmount.fromAmount}
            onChange={(e) =>
              setSwapAmount({ ...swapAmount, fromAmount: e.target.value })
            }
            className="h-full w-[65%] bg-transparent focus:outline-none px-4 rounded-tr-primary rounded-br-primary"
            name=""
            id=""
          />
        </div>

        <div className="w-[77%] ml-[9.5%] mt-28 my-6 flex justify-between items-center ">
          <div>
            <div className="flex justify-start items-center gap-1">
              <div className="w-6 h-6 flex justify-center items-center rounded-full bg-grey-100">
                <Icons.warn />
              </div>
              <TextSm content="$1 = ₦800.00" className="text-grey-100" />
            </div>

            <div className="mt-6 flex justify-start items-center gap-1">
              <TextSm content="Fee = $0.00" className="text-grey-100" />
              <Icons.warnPurple />
            </div>
          </div>

          <Icons.toggle
            className="hover:scale-105 cursor-pointer transition-all"
            onClick={handleSwap}
          />
        </div>

        <div
          className={`${
            swapped ? "-top-20" : "top-24"
          } transition-all left-[11.5%] absolute w-[77%]  h-12 rounded-primary bg-grey-400 flex justify-center items-center`}
        >
          <div
            className={`${
              swapToValue?.currAbbreviation === "NGN"
                ? "bg-black"
                : "bg-purple-200"
            } w-[35%] flex justify-between cursor-pointer items-center px-1 h-full rounded-bl-primary rounded-tl-primary`}
            onClick={() => {
              setClickedDropDown("toCurrency");
              setShowCurrencyOptionModal(true);
            }}
          >
            <div className="w-8 h-8 rounded-full">
              {swapToValue && (
                <Image
                  src={swapToValue?.img}
                  className="w-full h-full rounded-full"
                  alt=""
                />
              )}
            </div>
            <p className="text-md font-semibold text-white">
              {swapToValue?.currAbbreviation}
            </p>
            <Icons.arrowDown />
          </div>
          <input
            type="text"
            value={swapAmount.toAmount}
            onChange={(e) =>
              setSwapAmount({ ...swapAmount, toAmount: e.target.value })
            }
            className="h-full w-[65%] bg-transparent focus:outline-none px-4 rounded-tr-primary rounded-br-primary"
            name=""
            id=""
          />
        </div>
      </div>

      <Button
        content="Continue"
        className="mt-56 w-[77%] mx-auto flex justify-center items-center"
        disabled={!swapAmount.fromAmount && !swapAmount.toAmount}
        onClick={() => setActiveTab(activeTab + 1)}
      />

      {showCurrencyOptionModal && (
        <>
        {children}
        </>
      )}
    </div>
  );
}
