"use client";
import React, { useEffect, useRef } from "react";
import DateDropDown from "../dateDropDown/DateDropDown";
import Button from "../button/Button";
import Link from "next/link";

interface IDateOfBirth {
  year: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  day: string;
  setDay: React.Dispatch<React.SetStateAction<string>>;
  month: string;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  handleActiveTab(): void;
}
export default function DateOfBirth({
  year,
  setYear,
  day,
  setDay,
  month,
  setMonth,
  handleActiveTab,
}: IDateOfBirth) {
  const dayInputRef = useRef<HTMLInputElement | null>(null);
  const monthInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (day.length === 2 && monthInputRef.current) {
      // If day has a length of two, focus on the month input
      dayInputRef.current?.blur();
      monthInputRef.current.focus();
    }
  }, [day]);

  return (
    <div className="w-full">
      <p className="text-md text-black font-semibold mt-6 mb-2">
        Date of Birth <span className="text-xs text-red-100">*</span>{" "}
      </p>
      <div className="w-full">
        <div className="flex justify-start items-center gap-4">
          <div className="w-16 h-12 border px-3 border-black rounded-primary">
            <input
              ref={dayInputRef}
              className="w-full text-lg font-semibold placeholder:text-lg placeholder:text-grey-100 placeholder:font-semibold focus:outline-none h-full rounded-primary bg-transparent"
              placeholder="DD"
              value={day}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (
                  inputValue === "" ||
                  (/^\d{0,2}$/.test(inputValue) && parseInt(inputValue) <= 31)
                ) {
                  setDay(inputValue);
                }
              }}
              type="text"
              maxLength={2}
            />
          </div>

          <div className="w-16 h-12 border px-3 border-black rounded-primary">
            <input
              ref={monthInputRef}
              className="w-full text-lg font-semibold placeholder:text-lg placeholder:text-grey-100 placeholder:font-semibold focus:outline-none h-full rounded-primary bg-transparent"
              placeholder="MM"
              value={month}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (
                  inputValue === "" ||
                  (/^\d{0,2}$/.test(inputValue) && parseInt(inputValue) <= 12)
                ) {
                  setMonth(inputValue);
                }
              }}
              type="text"
              name=""
              id=""
            />
          </div>

          <div className="w-28 h-12 flex justify-center items-center border border-black rounded-primary">
            <DateDropDown selectedYear={year} setSelectedYear={setYear} />
          </div>
        </div>
        <Button
          disabled={!day || !month || !year}
          content="Next"
          onClick={handleActiveTab}
          className="mt-16  lg:w-[23.25rem] w-full"
        />{" "}
      </div>
      <p className="text-sm flex justify-center lg:justify-start ml-[10%] items-center text-grey-100 font-medium mt-2 lg:mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-red-100 ml-2">
          Sign in
        </Link>{" "}
      </p>
    </div>
  );
}
