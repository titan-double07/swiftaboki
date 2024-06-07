import { IAccount, ICarousel } from "@/interfaces";
import {
  aboki1,
  abokiaiirtime,
  abokip2p,
  abokisave,
  abokivc,
  ngflag,
  usflag,
} from "../../public";

export const carouselArr: ICarousel[] = [
  {
    img: aboki1,
    title: "Dollar account",
    desc: "Receive Payment from anywhere in the world with our virtual dollar account",
  },
  {
    img: abokip2p,
    title: "Dollar P2P",
    desc: "Exchange Dollar to Naira Seamlessly with our Instant Exchange and P2P",
  },
  {
    img: abokivc,
    title: "Virtual cards",
    desc: "Online shopping and payments made easy with our virtual cards",
  },
  {
    img: abokiaiirtime,
    title: "Airtime to cash",
    desc: `Accidentally over-recharged? We've got you. Easily convert excess airtime into cash`,
  },
  {
    img: abokisave,
    title: "Flexible Savings",
    desc: "Save local and foreign currency easily with our flexible savings wallet",
  },
];

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const nameRegex = /^[a-zA-Z]{3,}$/;

export const accountArr: IAccount[] = [
  {
    img: ngflag,
    type: "NGN Naira",
    currency: "₦",
    balance: 300000,
    label: "Naira Account",
    accountName: "Isihaq Abdullahi Akanni",
    accountNumber: "0224482159",
    bank: "Gurantee Trust Bank ",
    currAbbreviation: "NGN",
    refrenceCode: "weugfhonfvmz"
  },
  {
    img: usflag,
    type: "US Dollar",
    currency: "$",
    balance: 500000,
    label: "Dollar Account",
    accountName: "Isiahq Abdullahi Akanni",
    accountNumber: "84028401832",
    refrenceCode: "oZhukhonOvg",
    bank: "Ban of America",
    currAbbreviation: "USD",
  },
];



