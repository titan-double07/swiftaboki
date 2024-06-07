import React, { ReactNode } from "react";

interface IButtonProps {
  content: string | ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
}

export default function Button({
  content,
  onClick,
  className,
  disabled,
  type,
}: IButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-[23.25rem] disabled:bg-grey-200 disabled:cursor-not-allowed bg-purple-200 transition-all text-white font-bold py-3 rounded-lg text-md hover:scale-105 ${
        className || ""
      }`}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
