import React from 'react'
import { options } from '../assets'

const Header = () => {
  return (
    <div className=' py-[20px] pclarge:px-[20px] px-[16px] flex flex-row justify-between w-full border-b-2 border-color-lightblack items-end'>
        <div className='flex flex-row items-center gap-3 '>
          <h1 className='hover:cursor-pointer'>Chat-anne</h1>
          <div className='flex px-[10px] py-[5px] bg-color-lightblack rounded-lg'>
              <h3>untitled chat</h3>
          </div>
        </div>
        <img src={options} className='hover:scale-95 hover:opacity-90 transition-all'/>
    </div>
  )
}

export default Header
