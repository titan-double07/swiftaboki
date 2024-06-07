"use client";
import { global, handholdingphone } from "../../../public";
import Hero from "@/components/globalAccountPage/Hero";
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
      headerText: "Choose your currency to create a new account.",
      smallText:
        "Select your preferred account type to open a new bank account - USD, GBP, EUR, NGN, and more.",
    },
    {
      number: "03",
      headerText: "Share your account for global payments.",
      smallText:
        "Share your account details with employers, friends, and businesses to receive payments seamlessly.",
    },
  ];
  return (
    <div className="min-h-screen w-full py-28 ">
      <Hero
        bgText="Your free global account awaits."
        smText="Open USD, NGN, CAD, GBP accounts in under 5 minutes! with "
        img={global}
      />
      <div className="w-full h-16 lg:h-28 bg-purple-100"></div>
      <SecureMultiCurrency
        arrayOptions={optArr}
        text="Secure a multi-currency account in minutes—effortless and swift."
        img={handholdingphone}
      />
      <div className="px-6">
        <AccordionSection />
      </div>
    </div>
  );
}
