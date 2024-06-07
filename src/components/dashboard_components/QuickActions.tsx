import React from "react";
import { Icons } from "../icons";
import TextSm from "../typography/TextSm";

interface IQuickActions {
  openModal(type: string): void;
}

export default function QuickActions({ openModal }: IQuickActions) {
  const quickActionsArr = [
    {
      icon: <Icons.sendMoney />,
      label: "Send Money",
    },
    {
      icon: <Icons.sendMoney />,
      label: "Receive Money",
    },
    {
      icon: <Icons.wallet />,
      label: "Pay Bills",
    },
    {
      icon: <Icons.airtime />,
      label: "Airtime to Cash",
    },
    {
      icon: <Icons.blackMarket />,
      label: "Black Market (P2P)",
    },
  ];

  return (
    <div className="lg:w-[64.2vw] md:mt-10 flex justify-start gap-4 flex-wrap">
      {quickActionsArr.map((action, index) => (
        <div
          className=" px-4 h-16   rounded-secondary bg-grey-400 flex justify-start gap-6 items-center hover:scale-105 transition-all cursor-pointer"
          key={index}
          onClick={()=>openModal(action.label)}
        >
          <div className="w-8 rounded-full shrink-0 bg-purple-200 h-8 flex justify-center items-center">
            {action.icon}
          </div>
          <TextSm content={action.label} className="font-bold text-black" />
        </div>
      ))}
    </div>
  );
}
