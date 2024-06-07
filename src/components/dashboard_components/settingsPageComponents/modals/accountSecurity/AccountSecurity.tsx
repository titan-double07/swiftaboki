import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import { Icons } from "@/components/icons";
import { ArrowRight2 } from "iconsax-react";
import ChangePin from "./ChangePin";
import ChangePassword_ from "./ChangePassword_";

interface IAccountSecurity {
  closeModal: () => void;
}
export default function AccountSecurity({ closeModal }: IAccountSecurity) {
  const accountSecurityArrOptions = [
    {
      text: "Change Password",
      icon: <Icons.changePassword />,
    },
    {
      text: "Change PIN",
      icon: <Icons.lockwhite />,
    },
  ];

  const [selectedTab, setSelectedTab] = useState<null | string>(null);

  function selectTab(tab: string | null) {
    setSelectedTab(tab);
  }

  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`w-[34vw] pt-32  py-12 pb-36 relative z-[999] h-screen bg-white overflow-y-scroll`}
    >
      <div className="px-12 py-6 ">
        {!selectedTab && (
          <>
            <div className="flex w-full justify-start gap-16 items-center">
              <Icons.back onClick={closeModal} className="cursor-pointer" />
              <p className="text-xl font-bold">Account Security</p>
            </div>
            {accountSecurityArrOptions.map((option, index) => (
              <div
                className="w-full mb-6 mt-8 hover:scale-105 transition-all cursor-pointer flex justify-between items-center"
                key={index}
                onClick={() => selectTab(option.text)}
              >
                <div className="flex justify-start items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex justify-center items-center">
                    {option.icon}
                  </div>
                  <p>{option.text}</p>
                </div>

                <ArrowRight2 className="text-purple-200" size={18} />
              </div>
            ))}
          </>
        )}
        {selectedTab === "Change Password" && <ChangePassword_ setSelectedTab={setSelectedTab} />}
        {selectedTab === "Change PIN" && <ChangePin setSelectedTab={setSelectedTab} />}
      </div>
    </motion.div>
  );
}
