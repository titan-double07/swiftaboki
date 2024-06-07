import React from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import ModalHeaderFlex from "@/components/modal/ModalHeaderFlex";
import ModalFlex from "@/components/modal/ModalFlex";
import { Icons } from "@/components/icons";

interface IHelpCenterModal {
  closeModal: () => void;
}
export default function HelpCenterModal({ closeModal }: IHelpCenterModal) {
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
        <ModalFlex
          headerText="Chat"
          childText="Start a conversation now"
          icon={<Icons.chat />}
          showRightArrow
        />
        <ModalFlex
          headerText="FAQs"
          childText="Find intelligent answers instantly"
          icon={<Icons.faq />}
          showRightArrow
        />
        <ModalFlex
          headerText="Email"
          childText="Get a solution beamed to your inbox"
          icon={<Icons.email />}
          showRightArrow
        />
      </div>
    </motion.div>
  );
}
