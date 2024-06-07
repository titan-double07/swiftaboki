"use client";
import Input from "@/components/form/Input";
import { Icons } from "@/components/icons";
import { Add } from "iconsax-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";
import { master, verve, visa } from "../../../../../public";
import { fade } from "@/utils/framerMotionVariants";
import { motion } from "framer-motion";

interface ICardDetails {
  holderName: string;
  cardNumber: string;
  validity: string;
  CVC: string;
  address: string;
  zipCode: string;
}

export default function Page() {
  const pathname = usePathname();
  const [cardDetails, setCardDetails] = useState<ICardDetails>({
    holderName: "",
    cardNumber: "",
    validity: "",
    CVC: "",
    address: "",
    zipCode: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  }
  const scrollRef = useRef(null);

  const [showOthers, setShowOthers] = useState(false);

  return (
    <div className="min-h-screen pt-28 mx-12 mt-10 pb-16">
      <div className="flex justify-start items-center gap-8">
        <div
          className={`${
            pathname === "/dashboard/cards/Mastercard"
              ? "bg-black"
              : pathname === "/dashboard/cards/Visa"
              ? "bg-blue-200"
              : "bg-green-200"
          } w-[21.11vw] h-40 relative cursor-pointer hover:scale-105 transition-all rounded-primary`}
          onClick={() => setShowOthers(true)}
        >
          <div className="absolute left-0 top-0 w-full h-full rounded-primary">
            <Image
              src={
                pathname === "/dashboard/cards/Mastercard"
                  ? master
                  : pathname === "/dashboard/cards/Visa"
                  ? visa
                  : verve
              }
              alt=""
              className="w-full h-full"
            />
          </div>
        </div>

        {showOthers && (
          <motion.div
            variants={fade}
            viewport={{ once: true }}
            initial="hide"
            whileInView="show"
            ref={scrollRef}
          >
            <button className="p-1 rounded-primary bg-purple-200 text-xs text-white">
              Card Active
            </button>

            <div className="flex justify-start items-center gap-2 mt-8">
              <div className="w-6 h-6 flex justify-center items-center rounded-full bg-purple-200">
                <Add color="white" />
              </div>
              <p>Top up</p>
            </div>

            <div className="flex mt-8 justify-start items-center gap-2">
              <div className="w-6 h-6 rounded-full flex justify-center items-center bg-purple-200">
                <Icons.freeze />
              </div>
              <p>Top up</p>
            </div>
          </motion.div>
        )}
      </div>

      {showOthers && (
        <motion.div
          variants={fade}
          viewport={{ once: true }}
          initial="hide"
          whileInView="show"
          ref={scrollRef}
          className="w-[42.22vw] py-6 px-4 rounded-secondary bg-grey-200 mt-10"
        >
          <div className="w-full flex justify-between items-center">
            <Input
              label="Card holder name"
              value={cardDetails.holderName}
              onChange={handleChange}
              className="!w-[48%]"
              inputClassName="border border-grey-100 h-10"
              name='holderName'
            />
            <Input
              label="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleChange}
              className="!w-[48%]"
              inputClassName="border border-grey-100 h-10"
              name="cardNumber"
            />
          </div>

          <div className="w-full flex justify-between items-center mt-4 ">
            <Input
              label="Validity"
              value={cardDetails.validity}
              onChange={handleChange}
              className="!w-[48%]"
              inputClassName="border border-grey-100 h-10"
              name="validity"
            />
            <Input
              label="CVC"
              value={cardDetails.CVC}
              onChange={handleChange}
              className="!w-[48%]"
              inputClassName="border border-grey-100 h-10"
              name="CVC"
            />
          </div>

          <div className="w-full flex justify-between items-center mt-4 ">
            <Input
              label="Address"
              value={cardDetails.address}
              onChange={handleChange}
              className="!w-[48%]"
              inputClassName="border border-grey-100 h-10"
              name="Address"
            />
            <Input
              label="Zip Code"
              value={cardDetails.zipCode}
              onChange={handleChange}
              className="!w-[48%]"
              inputClassName="border border-grey-100 h-10"
              name="zipCode"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
