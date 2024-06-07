import { ArrowDown2 } from "iconsax-react";
import React, { useState, useRef, useEffect } from "react";
import { IWithdrawalDetails } from "../modal/more/WithdrawalForm";

interface IDropdown {
  withdrawalDetails: IWithdrawalDetails;
  setWithdrawalDetails: React.Dispatch<
    React.SetStateAction<IWithdrawalDetails>
  >;
}
export default function Dropdown({
  withdrawalDetails,
  setWithdrawalDetails,
}: IDropdown) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function handleSelect(opt: string) {
    setWithdrawalDetails({ ...withdrawalDetails, reason: opt });
    setShowDropdown(false);
  }

  const reasonArr = [
    "Groceries",
    "School Fees",
    "Food",
    "Rent",
    "Health",
    "Miscellaneous",
  ];

  return (
    <div
      ref={dropdownRef}
      className="w-full relative flex justify-between mt-6 py-3 items-center pr-5 pl-[1.69rem] rounded-primary border border-grey-100"
    >
      <p className="text-grey-100 text-md font-semibold ">
        {withdrawalDetails.reason
          ? withdrawalDetails.reason
          : "Reason for Withdrawal"}
      </p>
      <ArrowDown2
        className="text-grey-100 cursor-pointer"
        onMouseDown={toggleDropdown}
      />
      {showDropdown && (
        <div className="absolute left-0 top-14 border border-grey-100 cursor-pointer w-full h-44 overflow-y-scroll bg-white z-30">
          {reasonArr.map((reason, index) => (
            <div
              className={`${
                withdrawalDetails.reason === reason && "bg-green-50"
              } p-2 hover:bg-grey-400 `}
              key={index}
              onClick={() => handleSelect(reason)}
            >
              <p>{reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
