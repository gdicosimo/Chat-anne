import React, {useState} from "react";
import { add, chat, cross } from "../../assets";
import ButtonReg from "../PanelDesplegado/ButtonReg"
import ButtonLogOut from "../PanelDesplegado/ButtonLogOut"

const Panel = ({setButtonOpen}) => {
  const [newchats, setButtonChat] = useState(false);
  const [historial, setButtonHistorial] = useState(false);
  
  const logged = false;
  const closePanel = () => {
      setButtonOpen(false)
    }
    const newChat = () => {
      setButtonChat(false)
    }
    const openhistorial = () => {
      setButtonHistorial(false)
    }
    if(!close)
    {
      return null
    }
    return (
      <div className='panel flex flex-col justify-between pclarge:h-lvh h-dvh '>  
        <div className="flex flex-col w-full gap-3">
              <button onClick={closePanel}><img src={cross} className='gap-2 items-center flex flex-row px-3 py-3 m-4 rounded-xl bg-color-lightblack '/></button> 
              <button onClick={openhistorial} className='container-panel'>
                <img src={add} /> 
                <h1 className="text-base font-poppins font-medium">New chat</h1>
              </button>
              <button onClick={newChat} className='container-panel'>
                <img src={chat} /> 
                <h1 className="text-base font-poppins font-medium">Show all chats</h1> 
              </button>
        </div>
        <div className="flex flex-col h-min">
          {logged ? <ButtonLogOut/>:<ButtonReg/>}
        </div>
      </div> 
        
    );
  };
export default Panel
