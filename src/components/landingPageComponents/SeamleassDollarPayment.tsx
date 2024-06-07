import React from 'react'
import TextBg from '../typography/TextBg'
import HomeCards from '../homecards/HomeCards'
import FlexBox from '../FlexBox/FlexBox'
import { P2P1, airtime, bro, elevate1, elevate2, gif, p2p, p2p_, seamless, shop, visaMaster } from '../../../public'

export default function SeamleassDollarPayment() {
  const green_ = "#008753";
  return (
    <div
    className="pb-80 px-4 xl:px-[8.5vw]"
    style={{
      backgroundImage: 'url("/rect.svg")',
      backgroundSize: "fill",
      backgroundRepeat: "repeat",
      minHeight: "100vh",
      width: "100%",
      backgroundAttachment: "fixed",
    }}
  >
    <TextBg
      content="Seamless Dollar Payments, Exchanges, Receiving and Saving - All in One Place"
      className="text-lg lg:text-4xl text-black text-center font-bold w-full lg:w-[48rem] mx-auto pt-20"
    />

    <FlexBox className="mt-4 lg:mt-28">
      <HomeCards
        bgText="Seamless Naira and Dollar International Transfers"
        smText="Your Gateway to Global Finance"
        color="#4B0082"
        hoverColor="#4B0082"
        fixedImg={seamless}
      />
      <HomeCards
        bgText="Unlock Global Opportunities"
        smText="Receive International Payments and Own Your Dollar Account"
        color="#808080"
        hoverColor="black"
        fixedImg={bro}
      />
      <HomeCards
        bgText="Transform Dollars in an Instant"
        smText="Exchange with Ease through Our Instant Exchange and P2P Network"
        fixedImg={p2p_}
        color="#EF476F"
        hoverColor="#EF476F"
        img={P2P1}
      />
      <HomeCards
        bgText="Shop the World, Seamlessly"
        smText="Explore Borderless Spending with Our Virtual Cards"
        color="#008753"
        hoverColor={green_}
        fixedImg={visaMaster}
      />
      <HomeCards
        bgText="Elevate Your Wealth"
        smText="Savings, Flexibility, and Dollars.
          Discover the power of dual currency savings."
        color="#000000"
        fixedImg={elevate1}
        hoverColor="#000"
      />
      <HomeCards
        bgText="Over-Recharged? Fix It Here"
        smText="Accidentally over-recharged? We've got your back. Easily convert excess airtime into cash"
        color="#000000"
        fixedImg={gif}
        hoverColor="#2E004F"
        airtime
      />
    </FlexBox>

    <TextBg
      content="You can also Pay your Bills, Recharge, Flight and Hotel Booking and many more"
      className="text-lg lg:text-4xl font-bold w-full lg:w-194 mx-auto text-black my-4 text-center"
    />
  </div>
  )
}
