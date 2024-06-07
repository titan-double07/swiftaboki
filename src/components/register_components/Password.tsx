import React from "react";
import Input from "../form/Input";
import { TickCircle } from "iconsax-react";
import Button from "../button/Button";
import Link from "next/link";
import { IName } from "./Name";

interface IPassword extends Omit<IName, "handleActiveTab"> {
  type: string;
  handleRegister?(): Promise<void>;
  handleActiveTab?(): void;
  loading?: boolean;
}
export default function Password({
  handleActiveTab,
  handleChange,
  userDetails,
  type,
  handleRegister,
  loading,
}: IPassword) {
  const passwordOpt = [
    "8 characters",
    "Uppercase and Lowercase",
    "Number and Symbol",
  ];

  const casingRegex = /(?=.*[a-z])(?=.*[A-Z])/;
  const specialCharRegex = /(?=.*\d)(?=.*[^a-zA-Z\d])/;

  return (
    <div className="w-full">
      <div className="mt-6">
        <Input
          isPassword
          value={
            type === "password"
              ? userDetails.password
              : userDetails.confirm_password
          }
          name={type === "password" ? "password" : "confirm_password"}
          label="Password"
          required
          onChange={handleChange}
          top="top-10"
        />
        {type === "password" && (
          <div className="mt-6">
            {passwordOpt.map((opt, index) => (
              <div
                className="flex justify-start items-center gap-2 mt-2"
                key={index}
              >
                <TickCircle
                  className="text-primary-4"
                  variant="Bold"
                  size={20}
                  color={
                    index === 0 && userDetails.password.length >= 8
                      ? "green"
                      : index === 1 && casingRegex.test(userDetails.password)
                      ? "green"
                      : index === 2 &&
                        specialCharRegex.test(userDetails.password)
                      ? "green"
                      : "red"
                  }
                />
                <p className="text-sm font-medium text-primary-4 ">{opt}</p>
              </div>
            ))}
          </div>
        )}
        <Button
          disabled={
            type === "password"
              ? userDetails.password.length < 8 ||
                !casingRegex.test(userDetails.password) ||
                !specialCharRegex.test(userDetails.password) ||
                loading
              : userDetails.confirm_password !== userDetails.password || loading
          }
          content={loading ? "Loading..." : "Next"}
          onClick={
            type === "confirm_password" ? handleRegister : handleActiveTab
          }
          // type === "password" ? "mt-64" : "mt-[24rem]"
          className={` mt-16 lg:w-[23.25rem] w-full `}
        />{" "}
      </div>
      <p className="text-sm flex justify-center lg:justify-start ml-[10%] items-center text-grey-100 font-medium mt-2 lg:mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-red-100 ml-2">
          Sign in
        </Link>{" "}
      </p>
    </div>
  );
}
