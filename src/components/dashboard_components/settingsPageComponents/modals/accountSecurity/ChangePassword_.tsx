"use client";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import { Icons } from "@/components/icons";
import ApiFetcher from "@/utils/api/Api";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

interface IChangePassword {
  setSelectedTab: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ChangePassword_({ setSelectedTab }: IChangePassword) {
  const [inputVal, setInputVal] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  }

  const [loading, setLoading] = useState<boolean>(false);
  async function changePassword() {
    setLoading(true);
    try {
      const response = await ApiFetcher.put("/auth/change-password", inputVal);
      setLoading(false);
      enqueueSnackbar(`${response?.data?.message}`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      enqueueSnackbar(`please Sign in again`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      setTimeout(() => {
        window.location.replace("/auth/login");
      }, 500);
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(`${error?.response?.data?.message}`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }
  return (
    <div className="w-full">
      <div className="flex w-full justify-start gap-16 items-center">
        <Icons.back
          className="cursor-pointer"
          onClick={() => setSelectedTab(null)}
        />
        <p className="text-xl font-bold">Change Password</p>
      </div>
      <div className="mt-8 w-full">
        <Input
          placeholder="Current Password"
          value={inputVal.current_password}
          onChange={handleChange}
          className="mb-6 !w-full"
          inputClassName="h-10 border border-grey-100"
          type="password"
          name="current_password"
          top="!top-3"
          isPassword
        />

        <Input
          placeholder="New Password"
          value={inputVal.new_password}
          onChange={handleChange}
          className="mb-6 !w-full"
          inputClassName="h-10 border border-grey-100"
          type="password"
          name="new_password"
          top="!top-3"
          isPassword
        />
        <Input
          placeholder="Confirm New Password"
          value={inputVal.confirm_password}
          onChange={handleChange}
          className="mb-6 !w-full"
          inputClassName="h-10 border border-grey-100"
          type="password"
          name="confirm_password"
          top="!top-3"
          isPassword
        />

        <Button
          content={loading ? "loading..." : "Change"}
          disabled={
            !inputVal.confirm_password ||
            !inputVal.current_password ||
            !inputVal.new_password ||
            inputVal.new_password !== inputVal.confirm_password ||
            inputVal.current_password === inputVal.new_password ||
            loading
          }
          className="w-full mt-[14rem]"
          onClick={changePassword}
        />
      </div>
    </div>
  );
}
