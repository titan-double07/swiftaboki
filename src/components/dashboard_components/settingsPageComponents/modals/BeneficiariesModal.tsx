import { slideIn } from "@/utils/framerMotionVariants";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ModalFlex from "@/components/modal/ModalFlex";
import ModalHeaderFlex from "@/components/modal/ModalHeaderFlex";
import { Icons } from "@/components/icons";
import { enqueueSnackbar } from "notistack";

interface IBeneficiaryModal {
  closeModal(): void;
}

export default function BeneficiariesModal({ closeModal }: IBeneficiaryModal) {
  const beneficiaryArr = [
    {
      name: "Chukwuemeka Obi ",
      bank: "First Bank - 23456789234",
      icon: <Icons.bank />,
    },

    {
      name: "EKECDC",
      bank: "Prepaid - 34568971834509",
      icon: <Icons.flash />,
    },
  ];

  const [beneficiaries, setBeneficiaries] = useState(beneficiaryArr);

  function handleDelete(beneficiary: string) {
    const newArr = beneficiaryArr.filter((item) => item.name !== beneficiary);
    enqueueSnackbar(
      `${beneficiary} has been removed from beneficiaries list.`,
      {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      }
    );
    setBeneficiaries(newArr);
  }

  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={` w-[34vw] pt-32  py-12 pb-36 relative z-[999] h-screen bg-white overflow-y-scroll`}
    >
      <div className="pl-12 w-full">
        <ModalHeaderFlex Text="24/7 Help Center" handleBack={closeModal} />
      </div>
      <div className="px-12 mt-8">
        {beneficiaries.map((beneficiary, index) => (
          <div key={index} className="w-full flex justify-between items-center">
            <ModalFlex
              headerText={beneficiary.name}
              childText={beneficiary.bank}
              icon={beneficiary.icon}
            />

            <Icons.deleteRed
              className="hover:scale-105 transition-all cursor-pointer"
              onClick={() => handleDelete(beneficiary.name)}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
