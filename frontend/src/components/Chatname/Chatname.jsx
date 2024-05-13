import React, { useState } from 'react'
import { cross } from '../../assets'

const Chatname = () => {
    //Traer el nombre del chat desde la api cuando sea un chat selecciona
    //si el usuario no esta logueado, el nombre del chat es default
    //al clickearlo tiene que abrir un panel para cambiar el nombre si el usuario esta logueado
    //si no esta logueado, dirigir a que vaya al panel
    const [chatName, setChatName] = useState(null)
    const [showEditor, setShowEditor] = useState(false)

    const handleInputChange = (event) => {
      setChatName(event.target.value)
    }

    const updateName = () => {
      //API Post mandando ID de chat y nuevo nombre
      setShowEditor(false)
    }

    return (
      <div className='flex flex-col'>
        <div 
          onClick={()=>{setShowEditor(!showEditor)}}
          className='flex px-[10px] py-[5px] bg-color-lightblack rounded-lg btn-animated '>
            <h3 className='whitespace-nowrap overflow-clip overflow-ellipsis'>{chatName ? chatName : "untitled chat" }</h3>
        </div>
        {
          showEditor ? (
          <div className='
          absolute flex flex-col p-6 bg-color-lightblack/20 backdrop-blur-lg 
          mt-10 rounded-2xl z-50 border-[1px] gap-2
          '>
              <input
                className="font-poppins font-normal text-color-cream placeholder:text-color-cream/50 
                placeholder:font-poppins placeholder:font-medium block bg-color-lightblack/10 w-full border-b hover:border-b-2
              border-color-cream p-2 my-2 focus:outline-none" 
                placeholder={chatName ? chatName : "untitled"}
                type="text"
                value={chatName}
                onChange={(e)=>{handleInputChange(e)}}
              >

              </input>
              <div className='flex flex-row w-full gap-1'>
                <button 
                  onClick={()=>{updateName()}}
                  className='flex-1 btn-animated bg-color-cream p-2 rounded-md font-poppins font-semibold'>
                    Save
                </button>
                <button 
                  onClick={()=>{setShowEditor(false)}}
                  className='flex-1 btn-animated bg-color-lightblack/20 border-[1px] border-color-cream text-color-cream p-2 rounded-md font-poppins font-light'>
                    Cancel
                </button>
              </div>
          </div>
          ) : null
        }
      </div>
  )
}

export default Chatname
