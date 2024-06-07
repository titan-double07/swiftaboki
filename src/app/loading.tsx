/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect } from "react";
import { logod } from "../../public";
import Image from "next/image";
import { useDispatch } from "react-redux";
import ApiFetcher from "@/utils/api/Api";
import { login } from "@/redux/slices/authSlice";
import { enqueueSnackbar } from "notistack";

export default function Loading() {
  const dispatch = useDispatch();

  /** 
   * calling the getSession() function to check if the user's 
   * session is still active. If active we pass the user details
   * as payload to the redux store.
   * else, we prevent the user from accessing
   * authenticated routes.
   */
  async function getSession() {
    try {
      const response = await ApiFetcher.get("/auth/session");
      dispatch(login(response.data.data));
      enqueueSnackbar(`${response?.data?.message}`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSession();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Image src={logod} alt="" className="animate-spin w-12 h-12 lg:w-[100px] lg:h-[100px]" />
      <p className="text-xl lg:text-5xl text-primary-1 animate-fade font-pacifico">
        Swift Aboki
      </p>
    </div>
  );
}
