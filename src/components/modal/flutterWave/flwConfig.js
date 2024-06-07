import  { useState } from 'react';
import { closePaymentModal } from 'flutterwave-react-v3';
import axios from "axios"
// import crypto from "crypto"
// import dotenv from "dotenv"

// dotenv.config()

// const hash = crypto.createHmac()

export const useFormData = () => {
   const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    isValid: true,
    currency: "",
    accHolderName: "",
    amount: ""    
   })

console.log(formData)
   
  const handleInputChange = (event, key) => {
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [key]: value

    }));
  };

const config = {
    public_key: "FLWPUBK_TEST-f312e3da407ea0757c969da2256eac00-X",
    tx_ref: Date.now().toString(),
    amount: parseInt(formData.amount),
    currency: formData.currency,
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: formData.email,
      phone_number: formData.phoneNumber,
      name: formData.accHolderName,
    },
    customizations: {
      title: 'Swift Aboki',
      description: 'Payment for funding wallet',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

   const fwConfig = {
    ...config,
    text:"Pay with fultter-wave",
    headerText: "Fund With Bank",
    childText: "choose payment options",
    callback: (res) => {
       console.log(res);
       axios.post("127.0.0.1/api/payment")
       .then((res) => console.log(res.data))
      closePaymentModal()
    },
    onClose: () => {},
  };

  return {formData, setFormData, fwConfig, handleInputChange}

}
