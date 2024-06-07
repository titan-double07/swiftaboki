import { Icons } from "@/components/icons";
import ModalFlex from "@/components/modal/ModalFlex";
import React from "react";

interface ISettingsOptions {
  openModal(type: string): void;
  handleLogout(): Promise<void>;
}
export default function SettingsOptions({
  openModal,
  handleLogout,
}: ISettingsOptions) {
  const optionsArr = [
    {
      icon: <Icons.helpcenter />,
      headerText: "Help Center",
      childText: "Have an issue? Speak to our team",
    },
    {
      icon: <Icons.lockwhite />,
      headerText: "Account Security",
      childText: "Manage Account Settings",
    },
    {
      icon: <Icons.beneficiaries />,
      headerText: "Beneficiaries",
      childText: "Manage beneficiaries",
    },
    {
      icon: <Icons.rates />,
      headerText: "Rate & Fees",
      childText: "See Exchange Rate and Fees",
    },
    {
      icon: <Icons.limits />,
      headerText: "Limits",
      childText: "See your transaction Limits",
    },
    {
      icon: <Icons.profile />,
      headerText: "Become a Merchant",
      childText: "Trade Currencies at your custom price",
    },
    {
      icon: <Icons.logout />,
      headerText: "Logout",
      childText: "",
    },
    {
      icon: <Icons.delete />,
      headerText: "Delete Account",
      childText: "",
    },
  ];

  /**
   * this function handles two operations based on
   * the header text of the element that is being clicked:
   * 1. it triggers the open modal function if the
   * header text of the element is not  *Logout*
   *ELSE
   * 2. if the header text of the element in the array that is
   * being clicked is  *Logout* it will ignore the openModal function
   * and call the logout endpoint to log the user out.
   */
  function handleOptionClick(headerText: string) {
    if (headerText !== "Logout") {
      openModal(headerText);
      return
    }
    handleLogout();
  }

  return (
    <div className="w-[56vw] py-6 px-4 pb-3 rounded-secondary bg-grey-400 mt-[4.5rem] flex justify-start flex-wrap items-center">
      {optionsArr.map((option, index) => (
        <div
          className="w-[48%]"
          key={index}
          onClick={() => handleOptionClick(option.headerText)}
        >
          <ModalFlex
            headerText={option.headerText}
            childText={option.childText}
            icon={option.icon}
          />
        </div>
      ))}
    </div>
  );
}
