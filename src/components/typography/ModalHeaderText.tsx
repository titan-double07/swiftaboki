"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { fade } from "@/utils/framerMotionVariants";
interface ITypography {
  content: string;
  className?: string;
}
export default function ModalHeaderText({ content, className }: ITypography) {

  const scrollRef = useRef(null);
  return (
    <motion.h2
      variants={fade}
      viewport={{ once: true }}
      initial="hide"
      whileInView="show"
      ref={scrollRef}
      className={`text-xl text-black font-bold ${className}`}
    >
      {content}
    </motion.h2>
  );
}
