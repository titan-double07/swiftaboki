import React from "react";

export default function Cards() {
  return (
    <div className="w-full">
      {[1, 2, 3].map((card, index) => (
        <div
          key={index}
          className="w-full mb-6 py-4 px-[1.69rem] rounded-secondary bg-grey-400"
        >
          <p className="text-xs text-grey-100 font-medium">Mastercard</p>

          <div className="mt-4 flex justify-between items-center w-full">
            <p className="text-sm font-medium">Max balance</p>
            <p className="text-sm font-medium">$1000.00</p>
          </div>

          <div className="w-full h-2 rounded-primary bg-blue-100 my-4"></div>
          <p className="text-sm text-grey-100 font-medium">
            You can add <span className="text-black">$1000</span>
          </p>
        </div>
      ))}
    </div>
  );
}
