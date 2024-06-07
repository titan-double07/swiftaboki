"use client";
import Image from "next/image";
import React, { useState } from "react";
import { logod, proffilee } from "../../../public";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ProductsDropdown from "./ProductsDropdown";
export default function Nav() {
  const navArr = [
    {
      label: "Products",
      link: "/",
    },
    {
      label: "Company",
      link: "/",
    },
    {
      label: "Community",
      link: "/",
    },
  ];

  const variants = {
    open: {
      opacity: 1,
      x: 0,
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: { delay: 0.5, duration: 0.5 },
    },
  };

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const pathName = usePathname();
  const router = useRouter();

  const user = useSelector((state: any) => state.auth.user);

  // state for product dropdown
  const [productDropdown, setProductDropdown] = useState<boolean>(false);

  // state to indicator what dropdown would be displayed.
  const [hoveredDropDownList, setHoveredDropDownList] = useState<string | null>(
    null
  );

  /* function will toggle on a nav dropdown based on it's index */
  function showDropdownComponent(navlist: string) {
    setProductDropdown(true);
    setHoveredDropDownList(navlist);
  }
  
  return (
    <nav
      className={`${
        // dynamically hidding the footer on the login and register page.
        pathName.startsWith("/auth") || pathName.startsWith("/dashboard")
          ? "hidden"
          : "block"
      } w-full bg-white border-b fixed left-0 top-0 z-50 border-purple-100`}
    >
      <div className="px-4 lg:px-8 xl:px-[7.8vw] py-[1.69rem] bg-white flex justify-between">
        <Link href="/" className="cursor-pointer">
          <div className="flex gap-2 justify-start items-center">
            <div className="w-5 h-5 lg:w-8 lg:h-8">
              <Image
                src={logod}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <p className="text-lg xl:text-3xl text-black font-pacifico">
              Swift Aboki
            </p>
          </div>
        </Link>

        <div className="hidden lg:flex justify-center gap-8 items-center">
          {navArr.map((nav, index) => (
            <div
              key={index}
              className="text-md flex justify-start gap-2 items-center text-black font-bold cursor-pointer"
              onMouseOver={() => showDropdownComponent(nav.label)}
            >
              {nav.label}
              {hoveredDropDownList === nav.label ? (
                <ArrowUp2 />
              ) : (
                <ArrowDown2 />
              )}
            </div>
          ))}
        </div>

        {user ? (
          <div
            className="w-12 h-12 bg-[#2B468B] cursor-pointer rounded-full"
            onClick={() => router.push("/dashboard")}
          >
            <Image src={proffilee} className="w-full h-full" alt="" />
          </div>
        ) : (
          <div className="hidden lg:flex justify-end gap-4 items-center lg:w-[40%] xl:w-[30%]">
            <Link href="/auth/login">
              <button className="px-12 py-3 border border-grey-100 text-md text-grey-100 rounded-primary hover:scale-105 transition-all">
                Sign in
              </button>
            </Link>

            <Link href="/auth/register">
              <button className="py-3 border bg-purple-200 px-3 text-md text-white rounded-primary hover:scale-105 transition-all">
                Create an Account
              </button>
            </Link>
          </div>
        )}

        {!user && (
          <>
            {!showMenu ? (
              <GiHamburgerMenu
                size={30}
                className="lg:hidden block"
                onClick={() => setShowMenu(true)}
              />
            ) : (
              <MdClose
                size={30}
                className="lg:hidden block"
                onClick={() => setShowMenu(false)}
              />
            )}
          </>
        )}
      </div>

      {/* mobile menu */}
      <motion.div
        initial={false}
        animate={showMenu ? "open" : "closed"}
        variants={variants}
        className="fixed py-8 left-0 bg-white flex flex-col justify-start items-center px-5 !overflow-y-scroll text-white top-20 w-full h-screen lg:hidden"
      >
        <p
          className="mt-12 text-black text-md font-medium flex justify-start items-center gap-2"
          onClick={() => setShowMenu(false)}
        >
          Business <ArrowDown2 size={20} />
        </p>

        <p
          className="mt-12 text-black text-md font-medium flex justify-start items-center gap-2"
          onClick={() => setShowMenu(false)}
        >
          Company <ArrowDown2 size={20} />
        </p>

        <p
          className="mt-12 text-black text-md font-medium flex justify-start items-center gap-2"
          onClick={() => setShowMenu(false)}
        >
          Community <ArrowDown2 size={20} />
        </p>

        <Link href="/auth/login" onClick={() => setShowMenu(false)}>
          <button className="text-md w-72 rounded-[.6rem] border py-3 mt-6 border-grey-100 text-grey-100">
            Sign in
          </button>
        </Link>

        <Link href="/auth/register" onClick={() => setShowMenu(false)}>
          <button className="text-md w-72 rounded-[.6rem] border py-3 mt-6 bg-purple-100 text-white">
            Create an Account
          </button>
        </Link>
      </motion.div>

      {productDropdown && (
        <ProductsDropdown
          setProductDropdown={setProductDropdown}
          hoveredDropDownList={hoveredDropDownList}
          setHoveredDropDownList={setHoveredDropDownList}
        />
      )}
    </nav>
  );
}
