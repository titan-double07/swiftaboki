import React, { ReactNode } from "react";

interface IFlexBox {
  children: ReactNode;
  className?:string
}
export default function FlexBox({ children, className }: IFlexBox) {
  return (
    <div className={`${className} w-full`}>
      <div className="swift-container flex flex-wrap justify-between items-center">
        {children}
      </div>
    </div>
  );
}
