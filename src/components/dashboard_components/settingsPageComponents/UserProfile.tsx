/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import TextBg from "@/components/typography/TextBg";
import TextMd from "@/components/typography/TextMd";
import { ILoggedInUser } from "@/interfaces";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { profilee } from "../../../../public";
import ApiFetcher from "@/utils/api/Api";

export default function UserProfile() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const [profile_image, setProfile_image] = useState<File>();

  const handleImageChange = async (e: any) => {
    const data = new FormData();
    data.append('profile_image', e.target.files?.[0]);
  
    try {
      const response = await ApiFetcher.put(
        "/dashboard/upload-image",
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  
  

  const handleLabelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const user: ILoggedInUser = useSelector((state: any) => state.auth.user);

  return (
    <div className="flex justify-start items-center gap-6">
      <div className="w-[7.5rem] h-[7.5rem] rounded-full bg-blue-200">
        <Image src={profilee} alt="" className="w-full h-full rounded-full" />
      </div>

      <div>
        <TextBg
          content={user?.first_name + " " + user?.last_name}
          className="!text-3xl"
        />
        <TextMd
          content={"@" + user?.email_address}
          className="!text-grey-100"
        />
      </div>
      <div
        className="w-40 h-10 ml-12 rounded-primary border border-grey-100 flex justify-center items-center cursor-pointer text-grey-100 bg-transparent hover:scale-105 transition-all"
        onClick={handleLabelClick}
      >
        Edit Profile
      </div>
      <input
        type="file"
        id="images"
        name="images"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
}
