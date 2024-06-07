import React from "react";
import TextMd from "../typography/TextMd";
import TextSm from "../typography/TextSm";
import { Icons } from "../icons";
import { useRouter } from "next/navigation";

interface IProductDropdown {
  setProductDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  hoveredDropDownList: string | null;
  setHoveredDropDownList: React.Dispatch<React.SetStateAction<string | null>>;
}
export default function ProductsDropdown({
  setProductDropdown,
  hoveredDropDownList,
  setHoveredDropDownList,
}: IProductDropdown) {
  const productsArr = [
    {
      icon: <Icons.global className="w-9 h-9" />,
      product: "Global Account",
      link: "/global-account",
      description:
        "Breaking currency barriers for effortless global transactions and a connected future.",
    },
    {
      icon: <Icons.swapPurple className="w-9 h-9" />,
      product: "Swap/P2P",
      link: "/swap-p2p",
      description:
        "Unleash the power to swap currencies effortlessly with our Currency Swap. ",
    },
    {
      icon: <Icons.savingsActive className="w-9 h-9" />,
      product: "Savings",
      link: "/global-account",
      description:
        "Elevate your savings game with our Currency Saver. Secure, swap, and watch your currencies grow effortlessly.",
    },
    {
      icon: <Icons.cardActive className="w-9 h-9" />,
      product: "Cards",
      link: "/global-account",
      description:
        "Empower your transactions with the Virtual Card Hero. Swift, secure, and at your fingertips for a seamless digital experience.",
    },
  ];

  const companyArr = [
    {
      icon: <Icons.global className="w-9 h-9" />,
      product: "About us",
      link: "/global-account",
      description:
        "Crafting connections, shaping futures. Discover more about us.",
    },
    {
      icon: <Icons.swapPurple className="w-9 h-9" />,
      product: "Careers",
      link: "/global-account",
      description: "Fuel your future with us. Explore career possibilities.",
    },
  ];

  const communityArr = [
    {
      icon: <Icons.global className="w-9 h-9" />,
      product: "Referrals",
      link: "/global-account",
      description:
        "Unlock rewards by sharing the success! Refer & Earn with us.",
    },
    {
      icon: <Icons.swapPurple className="w-9 h-9" />,
      product: "Swiftaboki Support",
      link: "/global-account",
      description: "Need help? Our support team is always here for you, 24/7.",
    },
  ];

  const router = useRouter();

  function hideDropDown() {
    setProductDropdown(false);
    setHoveredDropDownList(null);
  }

  return (
    <div
      className="w-full absolute px-[7.8vw] pt-[3.3rem] pb-[1.75rem] left-0 top-24 bg-grey-400 flex justify-start items-start gap-20"
      onMouseLeave={hideDropDown}
      style={{
        backgroundImage: 'url("/dropDwnBg.svg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        backgroundAttachment: "fixed",
      }}
    >
      {hoveredDropDownList === "Products"
        ? productsArr.map((product, index) => (
            <div
              className="w-[13rem] hover:scale-105 transition-all cursor-pointer"
              key={index}
              onClick={() => router.push(`${product.link}`)}
            >
              <div className="h-10 w-10 flex justify-center items-center">
                {product.icon}
              </div>
              <TextMd
                content={product.product}
                className="text-black font-bold mt-4"
              />
              <TextSm
                content={product.description}
                className="text-black !text-sm font-light mt-4"
              />
            </div>
          ))
        : hoveredDropDownList === "Company"
        ? companyArr.map((product, index) => (
            <div
              className="w-[13rem] hover:scale-105 transition-all cursor-pointer"
              key={index}
            >
              <div className="h-10 w-10 flex justify-center items-center">
                {product.icon}
              </div>
              <TextMd
                content={product.product}
                className="text-black font-bold mt-4"
              />
              <TextSm
                content={product.description}
                className="text-black !text-sm font-light mt-4"
              />
            </div>
          ))
        : communityArr.map((product, index) => (
            <div
              className="w-[13rem] hover:scale-105 transition-all cursor-pointer"
              key={index}
            >
              <div className="h-10 w-10 flex justify-center items-center">
                {product.icon}
              </div>
              <TextMd
                content={product.product}
                className="text-black font-bold mt-4"
              />
              <TextSm
                content={product.description}
                className="text-black !text-sm font-light mt-4"
              />
            </div>
          ))}

      {/* <div className="absolute w-full h-full">
        <Image src={dropDwnBg} className="w-full h-full object-cover" alt="" />
      </div> */}
    </div>
  );
}
