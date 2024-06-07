import React, { useState } from "react";
import Input from "../form/Input";
import Button from "../button/Button";
import Link from "next/link";
import { IName } from "./Name";
import { emailRegex } from "@/utils";
import ApiFetcher from "@/utils/api/Api";
import { enqueueSnackbar } from "notistack";

interface IEmail extends IName {}

export default function Email({
  handleActiveTab,
  handleChange,
  userDetails,
}: IEmail) {
  const [loading, setLoading] = useState(false);
  async function lookUpEmail() {
    setLoading(true);
    try {
      const response = await ApiFetcher.post("/auth/look-up", {
        email_address: userDetails.email_address,
      });
      setLoading(false);
      handleActiveTab();
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(`${error?.response?.data?.message}`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }

  return (
    <div>
      <div className="mt-6">
        <Input
          type="email"
          value={userDetails.email_address}
          name="email_address"
          label="Email"
          required
          onChange={handleChange}
        />
        <p className="text-sm mt-2 font-medium text-grey-100">
          By proceeding, you agree to our{" "}
          <span className="text-black"> Terms of Service</span>  and{" "}<br />
          <span className="text-black"> Privacy Policy</span>
        </p>
        <Button
          disabled={!emailRegex.test(userDetails.email_address) || loading}
          content={loading ? "Loading..." : "Next"}
          onClick={lookUpEmail}
          className="mt-16 lg:w-[23.25rem] w-full "
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
