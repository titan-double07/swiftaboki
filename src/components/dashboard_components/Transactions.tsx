import React from "react";
import { Icons } from "../icons";
import TextSm from "../typography/TextSm";
import TextMd from "../typography/TextMd";
import FlexBox from "../FlexBox/FlexBox";

interface ITransaction {
  openModal(type: string): void;
}

export default function Transactions({ openModal }: ITransaction) {
  return (
    <div className="md:w-[69.4vw] px-6 py-4 mt-10 rounded-secondary bg-grey-400 flex-wrap">
      <FlexBox className="mb-6">
        <TextMd content="Transactions" className="font-semibold text-black" />
        <p
          className="!text-md cursor-pointer !underline  text-end text-grey-100 font-semibold"
          onClick={() => openModal("transactions")}
        >
          View all
        </p>
      </FlexBox>
      {[1, 2, 3, 4].map((arr, index) => (
        <div
          className="w-full mb-6 flex justify-between items-center"
          key={index}
        >
          <div className="flex justify-start gap-2 items-center">
            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-purple-200">
              <Icons.flash />
            </div>
            <div>
              <TextSm
                content="Electric Bill"
                className="text-black !text-md font-medium"
              />
              <TextSm content="Monday at 12:12pm" className="text-grey-100" />
            </div>
          </div>

          <TextMd
            content="-₦4000"
            className="text-red-100 !text-md font-medium"
          />
        </div>
      ))}
    </div>
  );
}
