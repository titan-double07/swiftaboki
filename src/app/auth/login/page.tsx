/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Slider from "@/components/slider/Slider";
import TextBg from "@/components/typography/TextBg";
import TextMd from "@/components/typography/TextMd";
import Link from "next/link";
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";
import ApiFetcher from "@/utils/api/Api";
import { enqueueSnackbar } from "notistack";
import { emailRegex } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/authSlice";

export default function Login() {
  // check if user is logged in
  const user = useSelector((state: any) => state.auth.user);

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [hasReloaded, setHasReloaded] = useState(
    typeof window !== "undefined" && localStorage.getItem("hasreloaded")
      ? JSON.parse(localStorage.getItem("hasreloaded")!)
      : false
  );

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else if (pathname === "/auth/login" && !hasReloaded) {
      // Ensure proper order of operations
      setHasReloaded(true);
      localStorage.setItem("hasreloaded", JSON.stringify(true));
      window.location.reload();
    }
  }, [user, pathname, hasReloaded]);

  const [userDetails, setUserDetails] = useState({
    email_address: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await ApiFetcher.post(
        "/auth/signin-with-password",
        userDetails
      );
      setLoading(false);
      enqueueSnackbar(`${response?.data?.message}`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      dispatch(login(response.data.data));
      router.push("/dashboard");
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(`${error?.response?.data?.message}`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-between items-center">
      {/* left */}
      <div className="hidden lg:block w-[50%] min-h-screen bg-purple-100 pt-12">
        <Slider />
      </div>

      {/* right */}
      <div className="w-[90%] mx-auto mt-10 lg:mt-0  max-w-[500px] lg:max-w-none lg:w-[50%] flex flex-col justify-start lg:justify-center items-center lg:items-start lg:pl-20 h-screen lg:h-full bg-white">
        <div className="w-full mt-10 pl-4 lg:pl-0">
          <TextBg
            content="Welcome Back!"
            className="text-purple-200 !text-xl lg:!text-4xl !font-extrabold"
          />
          <TextMd
            content="Enter your account email and password"
            className="text-grey-100 !text-sm lg:!text-lg !font-medium lg:mt-2"
          />
        </div>

        <form
          action=""
          className="mt-6 w-full lg:px-0 px-4"
          onSubmit={handleLogin}>
          <Input
            type="text"
            value={userDetails.email_address}
            placeholder="Email Address"
            onChange={handleChange}
            name="email_address"
            className="w-full"
          />

          <Input
            isPassword
            value={userDetails.password}
            placeholder="Password"
            onChange={handleChange}
            name="password"
            className="mt-4"
            top="top-4"
          />

          <p className="text-sm text-primary-4 font-medium mt-4">
            Forgot Password?{" "}
            <Link href="/auth/forgot-password" className="text-red-100">
              Reset
            </Link>{" "}
          </p>

          <Button
            type="submit"
            content={loading ? "Loading..." : "Login"}
            disabled={
              !emailRegex.test(userDetails.email_address) ||
              !userDetails.password ||
              loading
            }
            className=" w-full lg:w-[23.25rem] mt-16"
          />
        </form>
        <p className="text-sm flex justify-start ml-[10%] items-center text-grey-100 font-medium mt-4 lg:mt-6">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-red-100 ml-2">
            Create an account
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
