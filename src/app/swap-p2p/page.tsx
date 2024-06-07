import ReusableHero from "@/components/globalAccountPage/Hero";
import React from "react";
import { p2pp, swapp } from "../../../public";
import SecureMultiCurrency from "@/components/globalAccountPage/SecureMultiCurrency";
import AccordionSection from "@/components/landingPageComponents/AccordionSection";

export default function Page() {
  const optArr = [
    {
      number: "01",
      headerText: "Verify your Identity",
      smallText:
        "Create a SwiftAboki account and complete identity verification for enhanced security.",
    },
    {
      number: "02",
      headerText: "Choose your preferred option.",
      smallText:
        "You could either choose to use our rates on Instant Exchange or choose your own rate using our P2P ",
    },
    {
      number: "03",
      headerText: "Select your desired currencies",
      smallText: "Select the currency you want to swap and swap with ease",
    },
  ];

  return (
    <div className="min-h-screen w-full py-28 ">
      <ReusableHero
        bgText="Swap with Ease, Infinite Potential"
        smText="Seamless Currency Swaps and P2P Transactions USD, NGN, CAD, GBP with "
        img={swapp}
      />
      <div className="w-full h-16 lg:h-28 bg-purple-100"></div>
      <SecureMultiCurrency
        showFeatures
        arrayOptions={optArr}
        img={p2pp}
        text="What's in store for you with our Swap and P2P feature?"
      />
      <div className="px-6">
        <AccordionSection />
      </div>
    </div>
  );
}
