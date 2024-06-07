"use client";
import React from "react";
import TextMd from "../typography/TextMd";
import Image from "next/image";
import { logod } from "../../../public";
import { ISideNav } from "@/interfaces";
import { Icons } from "../icons";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidenav() {
  const sideNavList: ISideNav[] = [
    {
      icon: <Icons.homeInactive />,
      iconActive: <Icons.Home />,
      label: "Home",
      link: "/dashboard",
    },
    {
      icon: <Icons.Card />,
      iconActive: <Icons.cardActive />,
      label: "Cards",
      link: "/dashboard/cards",
    },
    {
      icon: <Icons.savings />,
      iconActive: <Icons.savingsActive />,
      label: "Savings",
      link: "/dashboard/savings",
    },
    {
      icon: <Icons.settings />,
      iconActive: <Icons.settingsActive />,
      label: "Settings",
      link: "/dashboard/settings",
    },
  ];

  const pathname = usePathname();
  const router = useRouter();

  function navigateToHome() {
    if (typeof window !== "undefined") {
      localStorage.setItem("/hasreloaded", JSON.stringify(false));
      router.push("/");
    }
  }

  return (
    <div className="fixed z-[9999999999999] left-0 top-0 w-[18vw] h-screen bg-white">
      <div
        className="flex mb-12 pt-[2.4rem] ml-12 pb-8 items-center cursor-pointer gap-4 justify-start"
        onClick={navigateToHome}
      >
        <Image src={logod} className="w-6 h-6" alt="" />
        <TextMd
          content="Swift Aboki"
          className="!text-xl text-black font-bold"
        />
      </div>

      {sideNavList.map((list, index) => (
        <Link href={list.link} className="w-full" key={index}>
          <div className="w-full mb-12 ml-[5.3rem] flex justify-start items-center gap-4">
            <div>{pathname === list.link ? list.iconActive : list.icon}</div>
            <p
              className={`${
                pathname === list.link ? "text-purple-200" : "text-grey-100"
              } text-md  font-semibold cursor-pointer`}
            >
              {list.label}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
