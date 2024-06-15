import { IAccount } from "@/interfaces";
import { slideIn } from "@/utils/framerMotionVariants";
import { FlutterWaveButton } from "flutterwave-react-v3";
import { motion } from "framer-motion";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Icons } from "../icons";
import ModalHeaderText from "../typography/ModalHeaderText";
import TextMd from "../typography/TextMd";
import TextSm from "../typography/TextSm";
import ModalFlex from "./ModalFlex";
import { useFormData } from "./flutterWave/flwConfig";

import { Mobile } from "@/lib/mediaQuery";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

interface ITopUpModal {
  closeModal(): void;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopUpModal({
  closeModal,
  showModal,
  setShowModal,
}: ITopUpModal) {
  const [activeTab, setActiveTab] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [email, setEmail] = useState("");
  //   const [formData, setFormData] = useState({
  //     email,
  //     phoneNumber: "",
  //     isValid: true,
  //     currency: "",
  //     accHolderName: "",
  //     amount: ""
  // })
  const { formData, handleInputChange, fwConfig } = useFormData();

  const account: IAccount = useSelector(
    (state: any) => state.account.selectedAccount
  );

  // const textToCopy = account.accountName;
  // const textToCopy2 = account.accountNumber;
  // const textToCopy3 = account.refrenceCode;
  // const Banktext = account.bank
  // const inputRef = useRef<HTMLInputElement | null>(null);
  // const inputRef2 = useRef<HTMLInputElement | null>(null);
  // const inputRef3 = useRef<HTMLInputElement | null>(null);

  // const handleCopyClick = async (type: string) => {
  //   try {
  //     if (type === "ref1") {
  //       if (inputRef.current) {
  //         await navigator.clipboard.writeText(textToCopy);
  //         enqueueSnackbar(`Text successfully copied to clipboard`, {
  //           variant: "success",
  //           anchorOrigin: { vertical: "bottom", horizontal: "right" },
  //         });
  //       }
  //       return;
  //     }
  //     if (type === "ref2") {
  //       if (inputRef.current) {
  //         await navigator.clipboard.writeText(textToCopy2);
  //         enqueueSnackbar(`Text successfully copied to clipboard`, {
  //           variant: "success",
  //           anchorOrigin: { vertical: "bottom", horizontal: "right" },
  //         });
  //       }
  //       return;
  //     }

  //     if (type === "ref3") {
  //       if (inputRef3.current) {
  //         await navigator.clipboard.writeText(textToCopy3);
  //         enqueueSnackbar(`Text successfully copied to clipboard`, {
  //           variant: "success",
  //           anchorOrigin: { vertical: "bottom", horizontal: "right" },
  //         });
  //       }
  //       return;
  //     }
  //   } catch (err) {
  //     alert("Unable to copy text to clipboard");
  //   }
  // };

  const surportedCurrency = ["NGN", "USD", "CAD", "EUR"];

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(event.target.value.trim()));
    setEmail(event.target.value);
    formData.email = event.target.value;
  };

  const handleSubmit = () => {
    console.log(
      `email: ${formData.email}\nphoneNumber: ${formData.phoneNumber}\n expDate: ${formData.currency}\naccHolderName: ${formData.accHolderName}\nCurrency: ${formData.currency}\nAmount: ${formData.amount}`
    );
    fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData,
      }),
    })
      .then((response) => {
        console.log(response);
        // Handle response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
    enqueueSnackbar(`Submited`, {
      variant: "success",
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
    });
  };

  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`lg:w-[29vw] pt-32 py-12 pb-36 relative z-[999]  lg:h-screen bg-white overflow-y-scroll`}>
      {activeTab === 0 && (
        <>
          <div className="md:block hidden">
            <ModalHeaderText content="Top up" className="pl-8 mb-8" />
            <div className="w-full px-8">
              <ModalFlex
                // headerText="Fund with debit/Credit Card"
                // childText="Tap to view Details"
                headerText="Fund With Bank"
                childText="choose your payment option"
                icon={<Icons.bank />}
                handleClick={() => setActiveTab(2)}
              />
            </div>
          </div>

          <Mobile>
            <Drawer open={showModal} onOpenChange={setShowModal}>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>
                    <ModalHeaderText content="Top up" className="" />
                  </DrawerTitle>
                </DrawerHeader>
                <div className="w-full px-8 pt-5">
                  <ModalFlex
                    // headerText="Fund with debit/Credit Card"
                    // childText="Tap to view Details"
                    headerText="Fund With Bank"
                    childText="choose your payment option"
                    icon={<Icons.bank />}
                    handleClick={() => setActiveTab(2)}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </Mobile>
        </>
      )}
      {/* {activeTab === 1 && (
        <div className="w-full">
          <div className="flex justify-start gap-[4.5rem] items-center px-12">
            <Icons.back
              onClick={() => setActiveTab(0)}
              className="cursor-pointer"
            />
            <ModalHeaderText content={account.label} />
          </div>
          <div className="w-full mt-8">
            <div className="w-14 h-14 rounded-full bg-purple-200 !mx-auto">
              <Image
                src={account.img}
                className="h-full rounded-full w-full"
                alt=""
              />
            </div>
            <TextMd
              content={account.balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              className="!text-lg text-center my-2 text-black"
            />
            <TextSm
              content="You can add funds to the account below using a 
              Bank Transfer"
              className="text-grey-100 text-center w-[80%] !mx-auto"
            />
          </div>

          <div className="w-full mt-8 px-8">
            <div className="!bg-grey-400 px-[1.69rem] rounded-secondary py-6">
              <p className="text-md font-semibold">Account Name</p>
              <div className="w-full mt-2 px-4 h-8 !bg-[rgba(0,0,0,0.1)] rounded-primary flex justify-between items-center">
                <p ref={inputRef} className="text-grey-100 text-xs">
                  {textToCopy}
                </p>

                <Icons.copy
                  className="cursor-pointer"
                  onClick={() => handleCopyClick("ref1")}
                />
              </div>

              <p className="text-md font-semibold mt-4">Bank</p>
              <div className="w-full mt-2 px-4 h-8 !bg-[rgba(0,0,0,0.1)] rounded-primary flex justify-between items-center">
                <p className="text-grey-100 text-xs">{Banktext}</p>
              </div>

              <p className="text-md font-semibold mt-4">Account Number</p>
              <div className="w-full mt-2 px-4 h-8 !bg-[rgba(0,0,0,0.1)] rounded-primary flex justify-between items-center">
                <p ref={inputRef2} className="text-grey-100 text-xs">
                  {textToCopy2}
                </p>

                <Icons.copy
                  className="cursor-pointer"
                  onClick={() => handleCopyClick("ref2")}
                />
              </div>
            
              
              <p className="text-md font-semibold mt-4">Refrence Code </p>
              <div className="w-full mt-2 px-4 h-8 !bg-[rgba(0,0,0,0.1)] rounded-primary flex justify-between items-center">
                <p ref={inputRef3} className="text-grey-100 text-xs">
                  {textToCopy3}
                </p>

                <Icons.copy
                  className="cursor-pointer"
                  onClick={() => handleCopyClick("ref3")}
                />
              </div>
              
            </div>
          </div>
        </div>
      )}*/}
      {activeTab === 2 && (
        <div className="w-screen md:w-full">
          <div className="flex justify-start gap-[4.5rem] items-center lg:px-12 px-8">
            <Icons.back
              onClick={() => setActiveTab(0)}
              className="cursor-pointer"
            />
            <ModalHeaderText content={account.label} />
          </div>
          <div className="w-full mt-8">
            <div className="w-14 h-14 rounded-full bg-purple-200 !mx-auto">
              <Image
                src={account.img}
                className="h-full rounded-full w-full"
                alt=""
              />
            </div>
            <TextMd
              content={account.balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              className="!text-lg text-center my-2 text-black"
            />
            <TextSm
              content="You can add funds to the account below using your Debit/Credit Card"
              className="text-grey-100 text-center w-[80%] !mx-auto"
            />
          </div>

          <div className="w-full mt-8 px-8  items-center">
            <div className="!bg-grey-400 px-[1.69rem] rounded-secondary py-6">
              <p className="text-md font-semibold">Email</p>
              <div className="relative mt-2">
                <input
                  type="text"
                  className={`w-full py-3 pl-4 pr-10 border border-gray-500 rounded-lg placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold ${
                    isValid ? "" : "Invalid"
                  }`}
                  placeholder="                       User@email.com"
                  value={email}
                  onChange={handleEmailChange}
                />
                {!isValid && <p className="error text-red">Invalid email</p>}
              </div>

              <p className="text-md font-semibold mt-4">Name</p>
              <div className="relative mt-2">
                <input
                  type="text"
                  className="w-full py-3 pl-4 pr-10 border border-gray-500 rounded-lg placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold"
                  placeholder="                     Usman ckwuemeka"
                  value={formData.accHolderName}
                  onChange={(e) => handleInputChange(e, "accHolderName")}
                />
              </div>

              <p className="text-md font-semibold mt-4">Phone Number</p>
              <div className="relative mt-2">
                <input
                  type="text"
                  className="w-full py-3 pl-4 pr-10 border border-gray-500 rounded-lg placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold"
                  placeholder="                    08134780932"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange(e, "phoneNumber")}
                />
              </div>

              <p className="text-md font-semibold mt-4">Currency</p>
              <div className="relative mt-2">
                <input
                  type="text"
                  className="w-full py-3 pl-4 pr-10 border border-gray-500 rounded-lg placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold"
                  placeholder="                        Select Currency"
                  value={formData.currency}
                  list="options"
                  onChange={(e) => handleInputChange(e, "currency")}
                />
                <datalist id="options">
                  {surportedCurrency.map((option, index) => (
                    <option key={index} value={option} />
                  ))}
                </datalist>
              </div>

              <p className="text-md font-semibold mt-4">Amount</p>
              <div className="relative mt-2">
                <input
                  type="text"
                  className="w-full py-3 pl-4 pr-10 border border-gray-500 rounded-lg placeholder:text-grey-100 placeholder:text-md placeholder:font-semibold"
                  placeholder="                                    1000"
                  value={formData.amount}
                  onChange={(e) => handleInputChange(e, "amount")}
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSubmit}
                  className="mt-4 bg-purple-600 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded">
                  <FlutterWaveButton
                    className="text-md font-normal text-gray"
                    text={fwConfig.text}
                    callback={fwConfig.callback}
                    onClose={fwConfig.onClose}
                    public_key={fwConfig.public_key}
                    tx_ref={fwConfig.tx_ref}
                    amount={fwConfig.amount}
                    currency={fwConfig.currency}
                    payment_options={fwConfig.payment_options}
                    customer={fwConfig.customer}
                    customizations={fwConfig.customizations}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
