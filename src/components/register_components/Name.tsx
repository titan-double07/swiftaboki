import React from "react";
import Input from "../form/Input";
import Button from "../button/Button";
import { IUserDetails } from "@/interfaces";
import Link from "next/link";
import { nameRegex } from "@/utils";

export interface IName {
  userDetails: IUserDetails;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleActiveTab(): void;
}

export default function Name({
  userDetails,
  handleChange,
  handleActiveTab,
}: IName) {
  return (
    <div className="mt-6 ">
      <Input
        type="text"
        value={userDetails.first_name}
        name="first_name"
        label="Legal first name"
        required
        onChange={handleChange}
        className=""
      />
      <Input
        type="text"
        value={userDetails.middle_name}
        name="middle_name"
        label="Middle name"
        className="mt-4"
        onChange={handleChange}
      />
      <Input
        type="text"
        value={userDetails.last_name}
        name="last_name"
        label="Legal last name"
        className="mt-4"
        required
        onChange={handleChange}
      />
      <Button
        content="Next"
        onClick={handleActiveTab}
        className="mt-32 lg:mt-16 w-full"
        disabled={!nameRegex.test(userDetails.first_name)  || !nameRegex.test(userDetails.last_name)}
      />{" "}
      <p className="text-sm flex justify-center lg:justify-start ml-[10%] items-center text-grey-100 font-medium mt-2 lg:mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-red-100 ml-2">
          Sign in
        </Link>{" "}
      </p>
    </div>
  );
}
