import ModalHeaderText from "@/components/typography/ModalHeaderText";
import React from "react";
import ModalFlex from "../ModalFlex";
import { Icons } from "@/components/icons";

interface ISwapOption {
  handleInstantExchange(): void;
  handleP2P(): void;
}

export default function Swapoption({handleInstantExchange,handleP2P}:ISwapOption) {
  return (
    <div>
      <ModalHeaderText content="Swap" className="pl-12 mb-8" />
      <div className="w-full px-12">
        <ModalFlex
          headerText="Instant Exchange"
          childText="Swap Currencies with Market Price"
          icon={<Icons.swap />}
          handleClick={handleInstantExchange}
        />

        <div className="mt-8">
          <ModalFlex
            headerText="P2P"
            childText="Swap Currencies with other Wallet Users"
            icon={<Icons.blackMarket />}
            handleClick={handleP2P}
          />
        </div>
      </div>
    </div>
  );
}
