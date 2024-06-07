'use client'
import React, { useRef, useState } from 'react'
import {motion} from 'framer-motion';
import { fadeIn, fadeUp1, fadeUp2, fadeUp3, fadeUp4, hiddenMask, hiddenMask_, visibleMask, visibleMask_ } from '@/utils/framerMotionVariants';
import { Icons } from '../icons';
import Image from 'next/image';
import { dollar_, dollarhome, mac, macbook_mobile } from '../../../public';
export default function Hero() {

  const scrollRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className="px-4 lg:px-8 xl:px-[7.8vw] pb-24 lg:pb-44 !mt-28 flex flex-col lg:flex-row justify-between items-center">
    {/* left */}
    <div className="w-full  lg:w-[33rem] ">
      <motion.h1
        variants={fadeUp1}
        viewport={{ once: true }}
        initial="hide"
        whileInView="show"
        ref={scrollRef}
        className="text-3xl text-center lg:text-start lg:text-5xl xl:text-8xl font-extrabold"
      >
        Master Your <br />
        Financial World
      </motion.h1>

      <motion.p
        variants={fadeUp2}
        viewport={{ once: true }}
        initial="hide"
        whileInView="show"
        ref={scrollRef}
        className="text-lg text-center lg:text-start lg:text-xl xl:text-4xl "
      >
        Simplify Dollar Payments, Exchanges, Savings, and Receipts with
        <span className="font-extrabold"> SWIFT ABOKI</span>
      </motion.p>

      <motion.div
        variants={fadeUp3}
        viewport={{ once: true }}
        initial="hide"
        whileInView="show"
        ref={scrollRef}
        className="flex flex-col lg:flex-row mt-8 justify-center lg:justify-start items-center gap-8"
      >
        <button className="w-40 h-12 bg-black rounded-primary hover:scale-105 transition-all">
          <Icons.playstore />
        </button>
        <button className="w-40 h-12 bg-black rounded-primary hover:scale-105 transition-all">
          <Icons.appstore className="h-full w-full " />
        </button>
      </motion.div>
    </div>

    {/* right */}

    {/* desktop : this view is only for desktop screens */}
    <div className="w-full lg:w-[33rem] lg:block hidden relative py-20">
      <motion.div
        initial={false}
        animate={
          isLoaded
            ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
            : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
        }
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        className="w-full lg:w-[33rem] relative z-20 h-[20rem]"
      >
        <Image
          src={mac}
          className="w-full h-full object-contain"
          alt=""
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>
      <motion.div
        initial={false}
        animate={
          isLoaded
            ? { WebkitMaskImage: visibleMask_, maskImage: visibleMask_ }
            : { WebkitMaskImage: hiddenMask_, maskImage: hiddenMask_ }
        }
        transition={{ duration: 1, delay: 3 }}
        viewport={{ once: true }}
        className="w-44 z-30 h-24 lg:h-[22rem] top-28 absolute left-0"
      >
        <Image
          src={dollarhome}
          className="w-full h-full object-contain"
          alt=""
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>

      <motion.div
        variants={fadeUp4}
        viewport={{ once: true }}
        initial="hide"
        whileInView="show"
        ref={scrollRef}
        className="w-56 h-56 absolute rounded-full z-10 -left-4 bg-red-100 top-64"
      ></motion.div>

      <motion.div
        variants={fadeIn}
        viewport={{ once: true }}
        initial="hide"
        whileInView="show"
        ref={scrollRef}
        className="w-full h-[33rem] rounded-[33rem] absolute top-0 "
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(46, 0, 79, 0.50) 0%, rgba(46, 0, 79, 0.00) 100%)",
        }}
      ></motion.div>
    </div>
    {/* --------------------------------------------------- */}

    {/* mobile : this view is only for mobile screens*/}
    <div className="w-[18rem] ml-10 relative z-10 lg:hidden mt-8 h-40">
      <motion.div
        initial={false}
        animate={
          isLoaded
            ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
            : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
        }
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        className="w-full h-full"
      >
        <Image
          src={macbook_mobile}
          className="object-contain"
          alt=""
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>

      <motion.div
        initial={false}
        animate={
          isLoaded
            ? { WebkitMaskImage: visibleMask_, maskImage: visibleMask_ }
            : { WebkitMaskImage: hiddenMask_, maskImage: hiddenMask_ }
        }
        transition={{ duration: 1, delay: 3 }}
        viewport={{ once: true }}
        className="w-24 h-44 mt-4 absolute z-20 -left-4 top-0"
      >
        <Image
          src={dollar_}
          className="object-content"
          alt=""
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>
      <motion.div
        variants={fadeUp4}
        viewport={{ once: true }}
        initial="hide"
        whileInView="show"
        ref={scrollRef}
        className="w-32 h-32 border absolute -z-10 top-20 -left-8 rounded-full bg-red-100"
      ></motion.div>
    </div>
    {/* ---------------------------------------------- */}
  </div>
  )
}
