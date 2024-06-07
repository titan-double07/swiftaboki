import { FlutterWaveButton } from "flutterwave-react-v3";
import { ArrowRight2 } from "iconsax-react";
import React from "react";

interface IModalFlex {
  headerText: string;
  childText: string;
  icon: JSX.Element;
  handleClick?(): void;
  showRightArrow?:boolean;
}
export default function ModalFlex({
  childText,
  headerText,
  icon,
  handleClick,
  showRightArrow
}: IModalFlex) {
  return (
    <div className="w-full mb-4">
      <div
        className="flex justify-between items-center gap-2 cursor-pointer hover:scale-105 transition-all"
        onClick={handleClick}
      >
        <div className="flex justify-start items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-purple-200 flex justify-center shrink-0 items-center">
            {icon}
          </div>
          <div>
            <p className="text-md font-medium text-black">{headerText}</p>
            {/* <div className="text-md font-normal text-gray">
            <FlutterWaveButton 
              className="text-md font-normal text-gray"
              text={fwConfig.text}
              callback={fwConfig.callback}
              onClose={fwConfig.onClose}
              public_key={fwConfig.public_key}
              tx_ref={fwConfig.tx_ref}
              amount={fwConfig.amount}
              currency={fwConfig.currency}
              payment_options={fwConfig.payment_options}
              customer={fwConfig.customer}
              customizations={fwConfig.customizations}          
                />
            </div> */}
            <p className="text-sm font-normal text-grey-100">{childText}</p>
          </div>
        </div>

        {showRightArrow && <ArrowRight2 size={18} className="text-purple-200"/>}
      </div>
    </div>
  );
}
