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
      <div className='panel space-y-20 pclarge:h-lvh h-dvh'>  
        <div>
          <div>
              <button onClick={closePanel}><img src={cross} className='gap-2 items-center flex flex-row px-3 py-3 m-4 rounded-xl bg-color-lightblack '/></button> 
          </div>
            <div>
              <button onClick={openhistorial} className='gap-2 items-center flex m-4 rounded-xl bg-color-lightblack py-5 px-20 w-96'><img src={add} /> <h4>New chat</h4></button>
              <button onClick={newChat} className='container-panel'><img src={chat} /> <h4>Show all chats</h4> </button>
            </div>
        </div>
        <div>
          {logged ? <ButtonLogOut/>:<ButtonReg/>}
        </div>
      </div> 
        
    );
  };
export default Panel
