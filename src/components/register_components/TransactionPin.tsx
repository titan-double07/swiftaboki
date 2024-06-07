/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import OtpInput from "../otp/Otp";
import { Danger, TickCircle } from "iconsax-react";
import Button from "../button/Button";
import Link from "next/link";
import ApiFetcher from "@/utils/api/Api";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

interface ITransactionPin {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function TransactionPin({
  loading,
  setLoading,
}: ITransactionPin) {
  const pinIntructions = [
    "Don’t use consecutive numbers (e.g. 1234)",
    "Don’t use Repetitive numbers (e.g. 1111)",
    "Don’t use your date of birth",
  ];
  const [transactionPin, setTransactionPin] = useState("");
  const onTransactionChange = (value: string) => setTransactionPin(value);
  const router = useRouter()
  const dispatch = useDispatch();
  async function handleSetTransactionPin() {
    setLoading(true);
    try {
      const response = await ApiFetcher.post("/auth/set-transaction-pin", {
        pin: transactionPin,
      });
      setLoading(false);
      enqueueSnackbar(`${response?.data?.message}`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      dispatch(login(response.data.data));
      router.push('/dashboard');
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(`${error?.response?.data?.message}`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }
  useEffect(()=>{
    if(transactionPin.length === 4){
      handleSetTransactionPin()
    }
  },[transactionPin])

  return (
    <div className="w-full">
      <div className="mt-6">
        <OtpInput
          setValue={setTransactionPin}
          value={transactionPin}
          onChange={onTransactionChange}
          valueLength={4}
        />
        <div className="mt-6">
          {pinIntructions.map((instruction, index) => (
            <div
              className="flex justify-start items-center gap-2 mt-2"
              key={index}
            >
              {index === 2 ? (
                <Danger className="text-primary-2" variant="Bold" size={20} />
              ) : (
                <TickCircle
                  className="text-primary-4"
                  variant="Bold"
                  size={20}
                />
              )}

              <p className="text-sm font-medium text-primary-4 ">
                {instruction}
              </p>
            </div>
          ))}
        </div>
        <Button
          disabled={transactionPin.length !== 4 || loading}
          content={loading ? "Loading..." : "Next"}
          onClick={handleSetTransactionPin}
          className="lg:mt-16 mt-64 lg:w-[23.25rem] w-full"
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
