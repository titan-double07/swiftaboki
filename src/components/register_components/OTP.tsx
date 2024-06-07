/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import OtpInput from "../otp/Otp";
import Button from "../button/Button";
import Link from "next/link";
import ApiFetcher from "@/utils/api/Api";
import { enqueueSnackbar } from "notistack";
import { IUserDetails } from "@/interfaces";

interface IOTP {
  userDetails: IUserDetails;
  loading: boolean;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isTimerActive: boolean;
  setIsTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function OTP({
  userDetails,
  activeTab,
  loading,
  setActiveTab,
  setLoading,
  isTimerActive,
  setIsTimerActive,
}: IOTP) {
  const [otp, setOtp] = useState("");
  const onChange = (value: string) => setOtp(value);
  // resend otp timer
  const [timer, setTimer] = useState<number>(120); // Initial duration in seconds

  // useEffect hook to handle the countdown logic
  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (isTimerActive && timer > 0) {
      countdown = setTimeout(
        () => setTimer((prevTimer) => prevTimer - 1),
        1000
      );
    } else {
      setIsTimerActive(false);
    }

    return () => clearTimeout(countdown);
  }, [isTimerActive, timer]);

  // Function to handle the "Resend OTP"
  async function handleResendOTP() {
    try {
      const response = await ApiFetcher.post("/auth/resend-otp", {
        email_address: userDetails.email_address,
        reason: "verify_email",
      });
      enqueueSnackbar(`${response?.data?.message}`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } catch (error: any) {
      enqueueSnackbar(`${error?.response?.data?.message}`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
    // Reset the timer
    setTimer(120);
    setIsTimerActive(true);
  }

  // verify email
  async function verifyEmail() {
    try {
      setLoading(true);
      const response = await ApiFetcher.post("/auth/verify-email", {
        code: otp,
      });
      setLoading(false);
      enqueueSnackbar(`${response?.data?.message}`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      setActiveTab(activeTab + 1);
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(`${error?.response?.data?.message}`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }

  /* automatically call the verifyEmail()
   function when user inputs their OTP code*/
   
  useEffect(()=>{
    if(otp.length === 5){
      verifyEmail()
    }
  },[otp])

  return (
    <div className="w-full">
      <div className="mt-6">
        <OtpInput
          setValue={setOtp}
          value={otp}
          onChange={onChange}
          valueLength={5}
        />
        {timer > 0 ? (
          <p className="text-sm font-medium text-grey-100 mt-6">
            <span className="mr-2">Resend OTP in </span>
            {String(Math.floor(timer / 60)).padStart(2, "0")}:
            {String(timer % 60).padStart(2, "0")}
          </p>
        ) : (
          <p
            className="text-sm cursor-pointer font-medium text-purple-100 mt-6 underline"
            onClick={handleResendOTP}
          >
            Resend OTP
          </p>
        )}
        <Button
          disabled={otp.length !== 5 || loading}
          content={loading ? "Loading..." : "Next"}
          onClick={verifyEmail}
          className="mt-16 lg:w-[23.25rem] w-full"
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
