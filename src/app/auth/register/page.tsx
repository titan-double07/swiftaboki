/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import FormHeader from "@/components/form/FormHeader";
import DateOfBirth from "@/components/register_components/DateOfBirth";
import Email from "@/components/register_components/Email";
import Name from "@/components/register_components/Name";
import OTP from "@/components/register_components/OTP";
import Password from "@/components/register_components/Password";
import TransactionPin from "@/components/register_components/TransactionPin";
import Slider from "@/components/slider/Slider";
import { IUserDetails } from "@/interfaces";
import ApiFetcher from "@/utils/api/Api";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState(1);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [userDetails, setUserDetails] = useState<IUserDetails>({
    first_name: "",
    last_name: "",
    middle_name: "",
    email_address: "",
    password: "",
    confirm_password: "",
    date_of_birth: `${day}/${month}`,
  });

  //handles input change
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  }

  // array of header Text on each form
  const headers: string[] = [
    "What’s your name as it appears on official documents?",
    "What is your date of birth as it appears on official documents",
    "What’s your email address",
    "Create a secure password",
    "Retype your password",
    "Enter OTP sent to your email address for verification",
    "Create a secure four (4) digit transaction pin",
  ];

  // switch between tabs
  function handleActiveTab() {
    if (activeTab === headers.length) {
      return;
    }
    setActiveTab((prev) => prev + 1);
  }

  const [loading, setLoading] = useState(false);

  // timer state for resend otp
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // resets the user details after calling the register endpoint
  const resetUserDetails = () => {
    setUserDetails({
      first_name: "",
      last_name: "",
      middle_name: "",
      email_address: "",
      password: "",
      confirm_password: "",
      date_of_birth: `${day}/${month}`,
    });
  };

  // handles user registration to be called at the point where users retype their password.
  async function handleRegister() {
    try {
      setLoading(true);
      const response = await ApiFetcher.post("/auth/register", {
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        middle_name: userDetails.first_name,
        email_address: userDetails.email_address,
        password: userDetails.password,
        confirm_password: userDetails.confirm_password,
        date_of_birth: userDetails.date_of_birth,
      });
      setLoading(false);
      enqueueSnackbar(`${response?.data?.message}`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      // Call the ressetUserdetails function after successful registration
      resetUserDetails();
      setActiveTab(activeTab + 1);
      setIsTimerActive(true);
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(`${error?.response?.data?.data}`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }

  // handles selection of DOB
  useEffect(() => {
    /**
     * this function appends "0" to a day or month that is 
     * less than 10, before sending it to the backend.
     */
    const formattedDay =
      parseInt(day) < 10 && !day.startsWith("0") ? `0${day}` : day;
    const formattedMonth =
      parseInt(month) < 10 && !day.startsWith("0") ? `0${month}` : month;

    setUserDetails({
      ...userDetails,
      date_of_birth: `${formattedDay}/${formattedMonth}/${year}`,
    });
  }, [day, month, year]);

  return (
    <div className="w-full flex justify-between items-center h-screen mt-10 lg:mt-0">
      {/* left */}
      <div className="w-1/2 hidden h-full lg:block bg-purple-100">
        <Slider />
      </div>
      {/* rightt */}
      <div className="w-full lg:w-[50%] h-full flex flex-col justify-start lg:justify-center lg:items-start items-center  p-4 lg:p-16 mx-auto">
        <div className="w-full max-w-xl">
          <FormHeader
            headerArr={headers}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>

        {activeTab === 1 ? (
          <div className="w-full max-w-xl">
            <Name
              handleActiveTab={handleActiveTab}
              handleChange={handleChange}
              userDetails={userDetails}
            />
          </div>
        ) : activeTab === 2 ? (
          <div className="w-full max-w-xl">
            <DateOfBirth
              day={day}
              setDay={setDay}
              year={year}
              setYear={setYear}
              month={month}
              setMonth={setMonth}
              handleActiveTab={handleActiveTab}
            />
          </div>
        ) : activeTab === 3 ? (
          <div className="w-full max-w-xl">
            <Email
              handleActiveTab={handleActiveTab}
              handleChange={handleChange}
              userDetails={userDetails}
            />
          </div>
        ) : activeTab === 4 ? (
          <div className="w-full max-w-xl">
            <Password
              handleActiveTab={handleActiveTab}
              handleChange={handleChange}
              userDetails={userDetails}
              type="password"
            />
          </div>
        ) : activeTab === 5 ? (
          <div className="w-full max-w-xl">
            <Password
              handleChange={handleChange}
              userDetails={userDetails}
              type="confirm_password"
              handleRegister={handleRegister}
              loading={loading}
            />
          </div>
        ) : activeTab === 6 ? (
          <div className="w-full max-w-xl">
            <OTP
              activeTab={activeTab}
              loading={loading}
              setActiveTab={setActiveTab}
              setLoading={setLoading}
              userDetails={userDetails}
              isTimerActive={isTimerActive}
              setIsTimerActive={setIsTimerActive}
            />
          </div>
        ) : activeTab === 7 ? (
          <div className="w-full max-w-xl">
            <TransactionPin loading={loading} setLoading={setLoading} />
          </div>
        ) : null}
      </div>{" "}
    </div>
  );
}
