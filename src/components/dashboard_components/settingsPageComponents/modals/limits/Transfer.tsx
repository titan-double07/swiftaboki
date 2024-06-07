import React from 'react'

export default function Transfer() {
  return (
    <div className='w-full'>
    {
        [1,2,3].map((card,index)=>(
            <div key={index} className='w-full mb-6 py-4 px-[1.69rem] rounded-secondary bg-grey-400'>
                <p className='text-xs text-grey-100 font-medium'>Bank Transfer</p>

                <div className='mt-4 flex justify-between items-center w-full'>
                    <p className='text-sm text-grey-100 font-medium'>Daily</p>
                    <p className='text-sm text-grey-100 font-medium'>$625.00</p>
                </div>

                <div className='w-full h-2 rounded-primary bg-blue-100 my-4'></div>
                <p className='text-sm text-grey-100 font-medium'>You have <span className='text-black'>$625.00 </span> left</p>
            </div>
        ))
    }
    </div>
  )
}
