import React from 'react'
import { send } from '../assets'

const Footer = () => {
  return (
    <div className='w-full border-t-2 border-color-lightblack justify-center flex '>
        <div className='w-full max-w-[900px] flex flex-row px-5 py-8 gap-4 '>
            <input class="font-poppins font-medium text-color-cream placeholder:text-color-cream/50 placeholder:font-poppins placeholder:font-medium block bg-color-black w-full border hover:border-2 border-color-cream rounded-[100px] py-3 px-4 focus:outline-none" placeholder="Start asking..." type="text" name="search"/>
            <img src={send} className='hover:scale-95 hover:opacity-90 transition-all'/>
        </div>
    </div>
  )
}

export default Footer
