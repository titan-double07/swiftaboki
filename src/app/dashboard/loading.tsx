import React from "react";
import Image from "next/image";
import { logod } from "../../../public";

export default function loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Image src={logod} alt="" className="animate-spin w-12 h-12 lg:w-[50px] lg:h-[50px]" />
      <p className="text-xl lg:text-2xl text-primary-1 animate-fade font-pacifico">
        Swift Aboki
      </p>
    </div>
  );
}
