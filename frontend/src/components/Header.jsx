import React, { useEffect, useState } from 'react'
import { options } from '../assets'
import Chatname from './Chatname/Chatname'
import Panel from './PanelDesplegado/PanelOpciones'

import FilesLoaded from './Chats/FilesLoaded'
import { Link } from 'react-router-dom'

const Header = ({setButtonOpen, files, setFiles, chatId, chatName}) => {
  

  function openPanel ()  {
    setButtonOpen(true)
  }

  useEffect(()=>{
    console.log(files)
  },[files.length])
  return (
    <div className='flex flex-col w-full pclarge:px-[20px] px-[16px] '>
      <div className='py-[20px] flex flex-row justify-between w-full border-b-2 border-color-lightblack items-center'>
          <div className='flex flex-row items-center justify-start gap-3 max-w-[80%] overflow-x-clip rounded-lg'>
            <h1 onClick={()=>{window.location.reload()}} className='hover:cursor-pointer whitespace-nowrap'>Chat-anne</h1>
            <Chatname chatId={chatId} name={chatName}/>
          </div>
          <img onClick={openPanel} src={options} className='btn-animated items-baseline'/>
      </div>
      <FilesLoaded files={files} setFiles={setFiles}/>
    </div>
  )
}

export default Header
