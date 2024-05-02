import React from 'react'
import { options } from '../assets'
import Chatname from './Chatname/Chatname'
import FilesLoaded from './Chats/FilesLoaded'
const Header = () => {
  const files = [
    {id:1, name:"Software design patterns for systems engineers"},
    {id:2, name:"Software design patterns for systems engineers"},
    {id:3, name:"Software design patterns for systems engineers"},
    {id:4, name:"Software design patterns for systems engineers"},
    {id:5, name:"Software design patterns for systems engineers"},
]

  return (
    <div className='flex flex-col w-full pclarge:px-[20px] px-[16px] '>
      <div className='py-[20px] flex flex-row justify-between w-full border-b-2 border-color-lightblack items-center'>
          <div className='flex flex-row items-center gap-3 '>
            <h1 className='hover:cursor-pointer'>Chat-anne</h1>
            
            <Chatname/>
          </div>
          <img src={options} className='btn-animated'/>
      </div>
      <FilesLoaded files={files}/>
    </div>
  )
}

export default Header
