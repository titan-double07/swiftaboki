import React from "react";

export default function Bills() {
  return (
    <div className="w-full">
      {[1, 2, 3].map((card, index) => (
        <div
          key={index}
          className="w-full mb-6 py-4 px-[1.69rem] rounded-secondary bg-grey-400"
        >
          <p className="text-xs text-grey-100 font-medium">Airtime</p>

          <div className="mt-4 flex justify-between items-center w-full">
            <p className="text-sm font-medium">Single Transaction</p>
            <p className="text-sm font-medium">₦10,000.00</p>
          </div>
        </div>
      ))}
    </div>
  );
}
