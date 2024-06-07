import { ArrowDown2 } from "iconsax-react";
import React, { useEffect, useRef, useState } from "react";
import TextMd from "../typography/TextMd";

interface IDateDropDown {
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
}

export default function DateDropDown({
  selectedYear,
  setSelectedYear,
}: IDateDropDown) {
  const startYear = 1930;
  const currentYear = new Date().getFullYear();
  const maxAge = 18;
  const yearsArray = Array.from(
    { length: currentYear - startYear - maxAge + 1 },
    (_, index) => startYear + index
  );

  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the last year when the component mounts or when showDropDown changes
    if (showDropDown && dropdownRef.current) {
      dropdownRef.current.scrollTop = dropdownRef.current.scrollHeight;
    }

    // Add click event listener to close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropDown]);

  function handleSelectYear(year: number) {
    setSelectedYear(year.toString());
    setShowDropDown(false);
  }

  return (
    <div className="w-full relative">
      <div
        className="w-full flex justify-center gap-2 items-center"
        onMouseDown={() => setShowDropDown(true)}
      >
        <TextMd
          content={selectedYear ? selectedYear : "YYYY"}
          className={`${
            selectedYear ? "text-black" : "text-grey-100"
          }  font-semibold`}
        />
        <ArrowDown2 />
      </div>
      {showDropDown && (
        <div
          ref={dropdownRef}
          className="w-full h-64 overflow-y-scroll shadow border bg-white absolute left-0 top-12"
        >
          {yearsArray.map((year, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-grey-400"
              onClick={() => handleSelectYear(year)}
            >
              {year}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
