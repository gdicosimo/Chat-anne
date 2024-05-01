import React from 'react'
import { options } from '../assets'
import Chatname from './Chatname/Chatname'
const Header = () => {
  return (
    <div className='py-[20px] pclarge:px-[20px] px-[16px] flex flex-row justify-between w-full border-b-2 border-color-lightblack items-center'>
        <div className='flex flex-row items-center gap-3 '>
          <h1 className='hover:cursor-pointer'>Chat-anne</h1>
          
          <Chatname/>
        </div>
        <img src={options} className='hover:scale-95 hover:opacity-90 transition-all'/>
    </div>
  )
}

export default Header
