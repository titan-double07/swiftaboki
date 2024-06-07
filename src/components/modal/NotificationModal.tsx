import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/framerMotionVariants";
import { Icons } from "../icons";
import ModalHeaderText from "../typography/ModalHeaderText";

interface INotificationModal {
  closeModal(): void;
}
export default function NotificationModal({ closeModal }: INotificationModal) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`w-[32vw]  py-12 relative z-[999] h-screen bg-white overflow-y-scroll`}
      style={{
        backgroundImage: 'url("/rect.svg")',
        backgroundSize: "fill",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {activeTab === 0 ? (
        <>
          <div className="flex justify-between items-center px-12">
            <Icons.back onClick={closeModal} className="cursor-pointer" />
            <ModalHeaderText content="Notifications" />
            <Icons.download className="cursor-pointer" />
          </div>

          <div className="w-full px-12 mt-8">
            <div className="w-full p-4 rounded-primary bg-grey-400">
              <p className="text-sm text-grey-100">May 3rd, 2023</p>
              <div className="flex justify-between mt-4 items-center">
                <div
                  className="flex justify-start cursor-pointer gap-2 items-center"
                  onClick={() => setActiveTab(activeTab + 1)}
                >
                  <div className="w-10 h-10 rounded-full bg-red-100 flex justify-center items-center border-black">
                    <Icons.notification2 />
                  </div>
                  <div>
                    <p className="text-md font-medium">
                      Scheduled Card Maintenance
                    </p>
                    <p className="text-sm text-dark-200">
                      There’s an ongoing maintenance..
                    </p>
                    <p className="text-sm text-grey-100">12:12pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full p-4 mt-6 rounded-primary bg-grey-400">
              <p className="text-sm text-grey-100">May 3rd, 2023</p>
              <div className="flex justify-between mt-4 items-center">
                <div
                  className="flex cursor-pointer  justify-start gap-2 items-center"
                  onClick={() => setActiveTab(activeTab + 1)}
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex justify-center items-center border-black">
                    <Icons.notification2 />
                  </div>
                  <div>
                    <p className="text-md font-medium">
                      Scheduled Card Maintenance
                    </p>
                    <p className="text-sm text-dark-200">
                      There’s an ongoing maintenance..
                    </p>
                    <p className="text-sm text-grey-100">12:12pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full ">
          <div className="flex justify-start gap-[4.5rem] items-center px-12">
            <Icons.back
              onClick={() => setActiveTab(activeTab - 1)}
              className="cursor-pointer"
            />
            <ModalHeaderText content="Notifications" />
          </div>

          <div className="w-full px-12 mt-[3.3rem]">
            <p className="text-sm text-grey-100">May 2nd, 2023 12:12 PM</p>
            <p className="text-md font-medium text-black">
              Scheduled Card Maintenance
            </p>
            <p className="text-sm text-dark-200">
              There’s an ongoing maintenance that may disrupt your ability to
              fund your card. We’re working to fix this as soon as possible
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
