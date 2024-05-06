import React, {useState, Component} from 'react'
import { options } from '../assets'
import Chatname from './Chatname/Chatname'
import Panel from './PanelDesplegado/Panel'

const Header = ({setButtonOpen}) => {
  

  function openPanel ()  {
    setButtonOpen(true)
  }
  return (

    <div className='py-[20px] pclarge:px-[20px] px-[16px] flex flex-row justify-between w-full border-b-2 border-color-lightblack items-center'>
        <div className='flex flex-row items-center gap-3 '>
          <h1 className='hover:cursor-pointer'>Chat-anne</h1>
          <Chatname/> 
        </div>
        <div className='h-full'>
          <button onClick={openPanel}><img src={options} className='hover:scale-95 hover:opacity-90 transition-all'/></button>
       </div>
        
    </div>
  )
}

export default Header
