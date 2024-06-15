import React from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import ModalHeaderText from "@/components/typography/ModalHeaderText";
import { Icons } from "@/components/icons";
import ModalFlex from "../ModalFlex";
import ModalHeaderFlex from "../ModalHeaderFlex";

interface IPayBills {
  closeModal(): void;
}
export default function Paybills({ closeModal }: IPayBills) {
  const payBillsArr = [
    {
      headerText: "Airtime/Data",
      childText: "Buy Airtime or Data Plans",
      icon: <Icons.phone />,
    },
    {
      headerText: "Utility",
      childText: "Pay for your Electricity",
      icon: <Icons.flash />,
    },
    {
      headerText: "Flight Booking",
      childText: "Book flight ticket",
      icon: <Icons.flight />,
    },
    {
      headerText: "Delivery",
      childText: "Pay your dispatch",
      icon: <Icons.delivery />,
    },
    {
      headerText: "Hotel Booking",
      childText: "Book room",
      icon: <Icons.hotel />,
    },
    {
      headerText: "Gift Cards",
      childText: "Buy your gift cards",
      icon: <Icons.gift />,
    },
    {
      headerText: "Education",
      childText: "Pay your fees",
      icon: <Icons.education />,
    },
    {
      headerText: "Bulk SMS",
      childText: "Pay your Fees",
      icon: <Icons.sms />,
    },
  ];
  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={` lg:w-[29vw] w-full
md:pt-36 md:w-3/5 px-8 pt-32  py-12 pb-36 relative z-[999] h-screen bg-white overflow-y-scroll`}>
      <ModalHeaderFlex
        handleBack={closeModal}
        Text="Pay Bills"
        className="!text-black "
      />
      <div className="mb-8"></div>
      <div className="w-full mt-8">
        {payBillsArr.map((bill, index) => (
          <ModalFlex
            childText={bill.childText}
            headerText={bill.headerText}
            icon={bill.icon}
            handleClick={closeModal}
            key={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
