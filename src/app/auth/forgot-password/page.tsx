/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Button from "@/components/button/Button";
import FormHeader from "@/components/form/FormHeader";
import Input from "@/components/form/Input";
import OtpInput from "@/components/otp/Otp";
import Slider from "@/components/slider/Slider";
import { emailRegex } from "@/utils";
import ApiFetcher from "@/utils/api/Api";
import { TickCircle } from "iconsax-react";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<any | string>("");
  // resend otp timer
  const [timer, setTimer] = useState<number>(120); // Initial duration in seconds
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserEmail(e.target.value);
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }
  const headers: string[] = [
    "What’s the registered email address?",
    "Enter OTP sent to your email address for verification",
    "Create a new secure password",
    "Retype your password",
  ];

  const passwordOpt = [
    "8 characters",
    "Uppercase and Lowercase",
    "Number and Symbol",
  ];

  function handleActiveTab() {
    if (activeTab === headers.length) {
      return;
    }
    setActiveTab((prev) => prev + 1);
  }

  const [otp, setOtp] = useState("");
  const onChange = (value: string) => setOtp(value);
  const casingRegex = /(?=.*[a-z])(?=.*[A-Z])/;
  const specialCharRegex = /(?=.*\d)(?=.*[^a-zA-Z\d])/;

  async function resetPassword() {
    setLoading(true);
    try {
      const response = await ApiFetcher.post("/auth/forgot-password", {
        email_address: userEmail,
      });
      setLoading(false);
      enqueueSnackbar(`${response?.data?.message}`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      setActiveTab(activeTab + 1);
      setIsTimerActive(true);
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(`${error?.response?.data?.message}`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }

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
        email_address: userEmail,
        reason: "reset_password",
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

  async function verifyOTP() {
    try {
      setLoading(true);
      const response = await ApiFetcher.post("/auth/verify-otp", {
        code: otp,
        reason: "reset_password",
        email_address: userEmail,
      });
      setLoading(false);
      enqueueSnackbar(`${response?.data?.message}`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      setActiveTab(activeTab + 1);
      setToken(response?.data?.data);
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(`${error?.response?.data?.message}`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }

  console.log(token);

  async function handleSetPassword() {
    setLoading(true);
    try {
      const response = await ApiFetcher.post("/auth/set-new-password", {
        password: password,
        confirm_password: confirmPassword,
        token,
      });
      setLoading(false);
      enqueueSnackbar(`${response?.data?.message}`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(`${error?.response?.data?.message}`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }

  useEffect(() => {
    otp.length === 5 && verifyOTP();
  }, [otp]);

  return (
    <div className="w-full h-screen flex justify-between items-center">
      <div className="hidden lg:block w-[50%] min-h-screen bg-purple-100 pt-12">
        <Slider />
      </div>

      {/* right */}
      <div className="w-[90%] mx-auto mt-10 lg:mt-0  max-w-[500px] lg:max-w-none lg:w-[50%] flex flex-col justify-start lg:justify-center items-center lg:items-start lg:pl-20 h-screen lg:h-full bg-white">
        <div className="w-full mt-10 pl-4 lg:pl-0">
          <FormHeader
            setActiveTab={setActiveTab}
            headerArr={headers}
            activeTab={activeTab}
          />
        </div>

        {activeTab === 1 ? (
          <>
            <div className="mt-6 w-full lg:px-0 px-4">
              <Input
                type="text"
                value={userEmail}
                name="userEmail"
                placeholder="Email address"
                onChange={handleChange}
              />
              <Button
                disabled={!emailRegex.test(userEmail) || loading}
                content={loading ? "Loading..." : "Next"}
                onClick={resetPassword}
                className="mt-16 w-full lg:w-[23.25rem] "
              />{" "}
            </div>
            <p className="text-sm flex justify-start ml-[10%] items-center text-grey-100 font-medium mt-6">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-red-100 ml-2">
                Sign in
              </Link>{" "}
            </p>
          </>
        ) : activeTab === 2 ? (
          <>
            <div className="mt-6 w-full lg:px-0 px-4">
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
                  onClick={handleResendOTP}>
                  Resend OTP
                </p>
              )}
              <Button
                disabled={otp.length !== 5 || loading}
                content={loading ? "Loading..." : "Next"}
                className="mt-16 w-full lg:w-[23.25rem] "
              />{" "}
            </div>
            <p className="text-sm flex justify-start ml-[10%] items-center text-grey-100 font-medium mt-6">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-red-100 ml-2">
                Sign in
              </Link>{" "}
            </p>
          </>
        ) : activeTab === 3 ? (
          <>
            <div className="mt-6 w-full lg:px-0 px-4">
              <Input
                type="password"
                value={password}
                name="password"
                label="Password"
                required
                onChange={handlePasswordChange}
                top="top-10"
                isPassword
              />
              <div className="mt-6 w-full lg:px-0 px-4">
                {passwordOpt.map((opt, index) => (
                  <div
                    className="flex justify-start items-center gap-2 mt-2"
                    key={index}>
                    <TickCircle
                      className="text-primary-4"
                      variant="Bold"
                      size={20}
                      color={
                        index === 0 && password.length >= 8
                          ? "green"
                          : index === 1 && casingRegex.test(password)
                          ? "green"
                          : index === 2 && specialCharRegex.test(password)
                          ? "green"
                          : "red"
                      }
                    />
                    <p className="text-sm font-medium text-primary-4 ">{opt}</p>
                  </div>
                ))}
              </div>
              <Button
                disabled={
                  password.length < 8 ||
                  !casingRegex.test(password) ||
                  !specialCharRegex.test(password)
                }
                content="Next"
                onClick={handleActiveTab}
                className="mt-16 w-full lg:w-[23.25rem] "
              />{" "}
            </div>
            <p className="text-sm flex justify-start ml-[10%] items-center text-grey-100 font-medium mt-6">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-red-100 ml-2">
                Sign in
              </Link>{" "}
            </p>
          </>
        ) : activeTab === 4 ? (
          <>
            <div className="mt-6 w-full lg:px-0 px-4">
              <Input
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                label="Password"
                required
                onChange={handleConfirmPasswordChange}
                top="top-10"
                isPassword
              />
              <Button
                disabled={confirmPassword !== password || loading}
                content={loading ? "Loading..." : "Next"}
                onClick={handleSetPassword}
                className="mt-16 w-full lg:w-[23.25rem] "
              />{" "}
            </div>
            <p className="text-sm flex justify-start ml-[10%] items-center text-grey-100 font-medium mt-6">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-red-100 ml-2">
                Sign in
              </Link>{" "}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
