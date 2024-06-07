import React from 'react'
import { Icons } from '../icons'
import ModalHeaderText from '../typography/ModalHeaderText'

interface IModalHeaderFlex{
    handleBack:()=>void;
    Text:string;
    className?:string;
}

export default function ModalHeaderFlex({Text,handleBack,className}:IModalHeaderFlex) {
  return (
    <div className="flex w-full justify-start gap-12 items-center">
    <Icons.back
      onClick={handleBack}
      className="cursor-pointer"
    />
    <ModalHeaderText content={Text} className={`text-purple-200 ${className}` } />
  </div>
  )
}
