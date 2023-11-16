import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
const SidebarInfo = ({ isOpen, onClose, rowdata }) => {
  console.log(rowdata)
  return (

    <div className={`absolute px-3 py-5 h-screen w-2/12 right-0 top-0 ease-linear transition-opacity delay-200 duration-200 overflow-visible z-40 bg-white dark:shadow-primary dark:bg-dark dark:border-black dark:shadow-xl dark:text-white ounded-l-xl shadow-lg border-l-2 border-l-gray-100 ${isOpen ? 'block' : 'hidden'}`}>
      <div className='flex items-center justify-between border-b-2 pb-4 border-gray-100'>
        <h3 className='text-lg font-bold'>Application API</h3>
        <button onClick={onClose}>
          <AiOutlineClose className='text-xl' />
        </button>
      </div>
      <div className='mt-5'>
        {"Content will be shown here"}
        {rowdata}
      </div>
    </div>

  )
}

export default SidebarInfo
