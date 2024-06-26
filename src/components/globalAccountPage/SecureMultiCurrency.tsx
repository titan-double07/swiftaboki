import Image from "next/image";
import React from "react";
import TextMd from "../typography/TextMd";
import { Icons } from "../icons";
import TextSm from "../typography/TextSm";

interface ISecureMultiCurrency {
  text: string;
  img: string;
  arrayOptions: {
    number: string;
    headerText: string;
    smallText: string;
  }[];
  showFeatures?: boolean;
}
export default function SecureMultiCurrency({
  arrayOptions,
  img,
  text,
  showFeatures,
}: ISecureMultiCurrency) {
  const arrOptions = [
    {
      icon: <Icons.flashPurple className="w-9 h-9" />,
      product: "Instant",
      description:
        "Swift Transactions, Seamless Experiences: Redefining Speed in Every Financial Move.",
    },
    {
      icon: <Icons.lockwhitePurple className="w-9 h-9" />,
      product: "Secured",
      description:
        "Elevate your peace of mind with our commitment to safe and secure transactions.",
    },
    {
      icon: <Icons.chart className="w-9 h-9" />,
      product: "FlexRate",
      description:
        "Trust in fair and competitive exchange rates for a seamless financial experience.",
    },
    {
      icon: <Icons.helpcenterPurple className="w-9 h-9" />,
      product: "24/7 Support",
      description:
        "Through storms and TV shows, rest assured, our support is unwavering. We're here to help.",
    },
  ];

  return (
    <div
      className="px-4 sm:px-10 xl:px-[8.5vw] lg:pt-20 pt-10 "
      style={{
        backgroundImage: 'url("/rect.svg")',
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        minHeight: "100vh",
        width: "100%",
        backgroundAttachment: "fixed",
      }}>
      <p className="md:text-4xl text-2xl text-black font-bold lg:w-[48rem] text-center mx-auto ">
        {text}
      </p>

      {showFeatures && (
        <div className="py-[2.1rem]  lg:mt-20 mt-10 lg:px-14 mx-5 bg-white flex justify-between flex-col gap-6 md:flex-row items-center rounded-secondary px-10 ">
          {arrOptions.map((product, index) => (
            <div
              className="md:w-[13rem] cursor-pointer flex lg:flex-row flex-col md:block md:gap-5 items-center md:text-left text-center "
              key={index}>
              <div className="h-10 w-10 flex justify-center items-center">
                {product.icon}
              </div>
              <div>
                <TextMd
                  content={product.product}
                  className="text-black font-bold mt-4"
                />
                <TextSm
                  content={product.description}
                  className="text-black !text-sm font-light mt-4"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex lg:flex-row flex-col justify-between items-center lg:mt-28 mt-10 lg:gap-0 gap-10">
        <div>
          {arrayOptions.map((option, index) => (
            <div
              className={`${
                index === 1 && "my-16"
              } flex md:flex-row flex-col justify-start items-center gap-6 md:text-left text-center`}
              key={index}>
              <div className="md:w-[4.125rem] md:h-[4.125rem] size-14 rounded-full bg-purple-200 flex justify-center items-center shrink-0 text-white text-xl font-bld">
                {option.number}
              </div>
              <div>
                <TextMd
                  content={option.headerText}
                  className="!text-xl   font-bold"
                />
                <TextMd
                  content={option.smallText}
                  className="lg:w-[31.2rem] text-lg font-light mt-2"
                />
              </div>
            </div>
          ))}
        </div>

        <div className=" w-4/5 max-w-96 lg:max-w-none lg:w-[27.7vw] lg:h-[33.5rem]">
          <Image src={img} className="w-full mt-8 h-full" alt="" />
        </div>
      </div>
    </div>
  );
}
