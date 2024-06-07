"use client";
import { IAccount, ICards } from "@/interfaces";
import React, { useState } from "react";
import { master, verve, visa } from "../../../../public";
import Image from "next/image";
import TextMd from "@/components/typography/TextMd";
import TextSm from "@/components/typography/TextSm";
import { useSelector } from "react-redux";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";

export default function Page() {
  const selectedAccount: IAccount = useSelector(
    (state: any) => state.account.selectedAccount
  );
  const cardsArr: ICards[] = [
    {
      creationFee: 0,
      name: "Swift Aboki Mastercard",
      description: "Suitable for all online shopping and subscription services",
      secure: false,
      transactionFee: {
        minValue: 1,
        maxValue: 2,
      },
      img: master,
    },
    {
      creationFee: 0,
      name: "Swift Aboki Visa Card",
      description: "Visa Card for even more versatile transactions",
      secure: false,
      transactionFee: {
        minValue: 0,
        maxValue: 5,
      },
      img: visa,
    },
    {
      creationFee: 0,
      name: "Swift Aboki Verve Card",
      description: "Suitable for all online shopping and subscription services",
      secure: true,
      transactionFee: {
        minValue: 0,
        maxValue: 0,
      },
      img: verve,
    },
  ];

  const [showCardDetails, setShowCardDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState<ICards | null>(null);
  const [index, setIndex] = useState(0);

  function selectCard(cardDetails: ICards, index: number) {
    setSelectedCard(cardDetails);
    setIndex(index);
    setShowCardDetails(true);
  }

  const router = useRouter();

  function handleCardCreation() {
    router.push(`/dashboard/cards/${selectedCard?.name.split(" ")[2]}`);
  }
  return (
    <div className=" pt-28 mx-12 mt-10  pb-16 ">
      <div className="flex justify-between items-center">
        {cardsArr.map((card, index) => (
          <div
            className={`${
              index === 0
                ? "bg-black"
                : index === 1
                ? "bg-blue-200"
                : "bg-green-200"
            } relative w-[21.11vw] rounded-primary h-40 hover:scale-105 transition-all cursor-pointer`}
            key={index}
            onClick={() => selectCard(card, index)}
          >
            <div className="absolute w-full h-full left-0 top-0 ">
              <Image src={card.img} alt="" className="w-full h-full" />
            </div>
          </div>
        ))}
      </div>
      {showCardDetails && (
        <div
          className={`${
            index === 0 ? "ml-[0%]" : index === 1 ? "ml-[35%]" : "ml-[68%]"
          } transition-all mb-24 mt-14 w-[25.11vw] h-72`}
        >
          <TextMd
            content={selectedCard?.name as string}
            className="text-center font-semibold"
          />
          <TextSm
            content={selectedCard?.description as string}
            className="text-center text-grey-100"
          />

          <div className="w-full py-6 px-4 mt-10 rounded-secondary bg-grey-400">
            <div className="flex justify-start gap-2 items-center">
              <div className="w-10 h-10 flex justify-center items-center rounded-full bg-[rgba(0,0,0,0.1)]">
                <Icons.Card />
              </div>
              <div>
                <TextSm content="Card creation fee" className="text-grey-100" />
                <TextSm
                  content={`${selectedAccount?.currency} ${selectedCard?.creationFee}`}
                  className="text-green-200"
                />
              </div>
            </div>

            <div className="flex mt-6 justify-start gap-2 items-start">
              <div className="w-10 h-10 flex justify-center items-center rounded-full bg-[rgba(0,0,0,0.1)]">
                <Icons.dollar />
              </div>
              <div>
                <TextSm content="Transaction fees" className="text-grey-100" />
                <TextSm
                  content={`${selectedAccount?.currency} ${selectedCard?.transactionFee.minValue} fee for transactions below $100$`}
                  className=""
                />
                <TextSm
                  content={`${selectedAccount?.currency} ${selectedCard?.transactionFee.maxValue} fee for transactions below $100$`}
                  className=""
                />
              </div>
            </div>

            <div className="flex justify-start mt-6 gap-2 items-center">
              <div className="w-10 h-10 flex justify-center items-center rounded-full bg-[rgba(0,0,0,0.1)]">
                <Icons.lock />
              </div>
              <div>
                <TextSm content="3D Secure" className="text-grey-100" />
                <TextSm
                  content={`${
                    selectedCard?.secure ? "Verve safe token" : "No"
                  }`}
                  className=""
                />
              </div>
            </div>
          </div>

          <Button
            className="w-full mt-6"
            content={`Create a ${selectedCard?.name.split(" ")[2]}`}
            onClick={handleCardCreation}
          />
        </div>
      )}
    </div>
  );
}
