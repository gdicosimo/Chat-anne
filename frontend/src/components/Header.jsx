import React, { useEffect, useState } from 'react'
import { options } from '../assets'
import Chatname from './Chatname/Chatname'
import FilesLoaded from './Chats/FilesLoaded'

const Header = ({files, setFiles}) => {

  useEffect(()=>{
    console.log(files)
  },[files.length])
  return (
    <div className='flex flex-col w-full pclarge:px-[20px] px-[16px] '>
      <div className='py-[20px] flex flex-row justify-between w-full border-b-2 border-color-lightblack items-center'>
          <div className='flex flex-row items-center gap-3 '>
            <h1 className='hover:cursor-pointer'>Chat-anne</h1>
            <Chatname/>
          </div>
          <img src={options} className='btn-animated'/>
      </div>
      <FilesLoaded files={files} setFiles={setFiles}/>
    </div>
  )
}

export default Header
