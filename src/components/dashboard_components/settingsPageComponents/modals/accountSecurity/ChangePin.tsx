/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Icons } from "@/components/icons";
import OtpInput from "@/components/otp/Otp";
import TextMd from "@/components/typography/TextMd";
import ApiFetcher from "@/utils/api/Api";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

interface IChangePin {
  setSelectedTab: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ChangePin({ setSelectedTab }: IChangePin) {
  const setPinOPtionsArr = [
    {
      step: "Step 1",
      icon: <Icons.lockwhite />,
      smText: "Tap to enter your current PIN",
    },
    {
      step: "Step 2",
      icon: <Icons.lockwhite />,
      smText: "Tap to enter your new PIN",
    },
    {
      step: "Step 3",
      icon: <Icons.lockwhite />,
      smText: "Tap to confirm your new PIN",
    },
  ];

  const [pinStep, setPinStep] = useState(1);

  const [currentTransactionPin, setCurrentTransactionPin] = useState("");
  const [newtransactionPin, setNewTransactionPin] = useState("");
  const [confirmNewtransactionPin, setConfirmNewTransactionPin] = useState("");
  const [loading, setLoading] = useState(false);

  const onCurrentTransactionPin = (value: string) =>
    setCurrentTransactionPin(value);

  const onNewTransactionPinChange = (value: string) =>
    setNewTransactionPin(value);

  const onConfirmNewTransactionPinChange = (value: string) =>
    setConfirmNewTransactionPin(value);

  // reset pin API
  async function resetTransactionPin() {
    setLoading(true);
    try {
      const response = await ApiFetcher.put("/auth/change-pin", {
        current_pin: currentTransactionPin,
        new_pin: newtransactionPin,
        confirm_pin: confirmNewtransactionPin,
      });
      setLoading(false);
      enqueueSnackbar(`${response?.data?.message}`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(`${error?.response?.data?.message}`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }

  useEffect(() => {
    currentTransactionPin.length === 4 && setPinStep(pinStep + 1);
  }, [currentTransactionPin]);

  useEffect(() => {
    newtransactionPin.length === 4 && setPinStep(pinStep + 1);
  }, [newtransactionPin]);

  useEffect(() => {
    if (confirmNewtransactionPin.length === 4) {
      setPinStep(pinStep + 1);
      resetTransactionPin();
    }
  }, [confirmNewtransactionPin]);

  return (
    <div>
      <div className="flex w-full justify-start gap-16 items-center">
        <Icons.back
          className="cursor-pointer"
          onClick={() => setSelectedTab(null)}
        />
        <p className="text-xl font-bold">Change PIN</p>
      </div>

      <div className="mt-8">
        {setPinOPtionsArr.map((pin, index) => (
          <div
            className="w-full rounded-secondary mb-6 bg-grey-400 py-4 px-[1.69rem] flex justify-start items-center gap-2"
            key={index}
          >
            <div
              className={`${
                index + 1 === pinStep ? "bg-purple-200" : "bg-grey-100"
              } ${
                index === 0 &&
                currentTransactionPin.length === 4 &&
                "!bg-green-200"
              } ${
                index === 1 && newtransactionPin.length === 4 && "!bg-green-200"
              } ${
                index === 2 &&
                confirmNewtransactionPin.length === 4 &&
                "!bg-green-200"
              } h-10 w-10 rounded-full flex justify-center items-center`}
            >
              {pin.icon}
            </div>
            <div>
              <p className="font-medium text-md">{pin.step}</p>
              <p className="text-grey-100 text-xs">{pin.smText}</p>
            </div>
          </div>
        ))}
      </div>

      {pinStep === 1 && (
        <div className="mt-40">
          <OtpInput
            onChange={onCurrentTransactionPin}
            setValue={setCurrentTransactionPin}
            value={currentTransactionPin}
            valueLength={4}
          />
        </div>
      )}

      {pinStep === 2 && (
        <div className="mt-40">
          <OtpInput
            onChange={onNewTransactionPinChange}
            setValue={setNewTransactionPin}
            value={newtransactionPin}
            valueLength={4}
          />
        </div>
      )}

      {pinStep === 3 && (
        <div className="mt-40">
          <OtpInput
            onChange={onConfirmNewTransactionPinChange}
            setValue={setConfirmNewTransactionPin}
            value={confirmNewtransactionPin}
            valueLength={4}
          />
        </div>
      )}

      {pinStep === 4 && !loading ? (
        <TextMd
          content="Change Successful"
          className="font-semibold text-center mt-[14rem]"
        />
      ) : pinStep === 4 && loading ? (
        <p className="text-center">Loading...</p>
      ) : null}
    </div>
  );
}
