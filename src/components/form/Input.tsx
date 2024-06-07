"use client";
import { useState } from "react";
import { Icons } from "../icons";
import { EyeSlash } from "iconsax-react";

interface IInput {
  type?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  inputClassName?: string;
  top?: string;
  isPassword?: boolean;
}

export default function Input({
  placeholder,
  type,
  label,
  required,
  onChange,
  value,
  name,
  className,
  inputClassName,
  top,
  isPassword,
}: IInput) {
  const [inputType, setInputType] = useState(isPassword ? "password" : "text");
  return (
    <div className={`w-full lg:w-[23rem] relative + ${className}`}>
      <label htmlFor="" className="lato text-sm font-medium text-black">
        {label}
        {required && <span className="text-primary-2">*</span>}
      </label>
      <input
        type={inputType}
        name={name}
        id=""
        value={value}
        onChange={onChange}
        className={`w-full py-3 px-6 border border-primary-4 rounded-lg focus:outline focus:outline-black placeholder:text-sm placeholder:lg:text-md focus:outline-1 ${inputClassName} `}
        placeholder={placeholder}
      />
      {isPassword && (
        <>
          {inputType === "password" ? (
            <Icons.eye
              className={`absolute right-4 ${top} cursor-pointer`}
              color="#808080"
              onClick={() => setInputType("text")}
            />
          ) : (
            <EyeSlash
              size={16}
              className={`absolute right-4 ${top} cursor-pointer text-grey-100`}
              onClick={() => setInputType("password")}
            />
          )}
        </>
      )}
    </div>
  );
}
