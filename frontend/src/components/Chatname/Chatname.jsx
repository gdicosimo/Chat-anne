import React, { useEffect, useState } from 'react'
import { cross } from '../../assets'
import useFetch from '../../Hooks/useFetch'
import { ThreeDot } from 'react-loading-indicators'
const Chatname = ({chatId, name}) => {
    
    const [chatName, setChatName] = useState(name)
    const [showEditor, setShowEditor] = useState(false)
    const {data, loading, error, fetchdata} = useFetch()

    const handleInputChange = (event) => {
      setChatName(event.target.value)
    }

    useEffect(()=>{
      setChatName(name)
    }, [chatId, name])

    const updateName = async () => {
      //API Post mandando ID de chat y nuevo nombre
      console.log(chatId)
      if (chatName != ""){
          fetchdata({id_chat: chatId, new_value: chatName}, 'GET_RENAME', null)
            .then(()=>{
              setShowEditor(false)
            })
      }
      
    }
    return (
      <div className='flex flex-col'>
        <div 
          onClick={()=>{setShowEditor(!showEditor)}}
          className='flex px-[10px] py-[5px] bg-color-lightblack rounded-lg btn-animated '>
            <h3 className='whitespace-nowrap overflow-clip overflow-ellipsis'>{chatName}</h3>
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
                placeholder={name}
                type="text"
                value={chatName}
                onChange={(e)=>{handleInputChange(e)}}
              >

              </input>
              <div className='flex flex-row w-full gap-1'>
                <button 
                  onClick={()=>{updateName()}}
                  className='flex-1 btn-animated bg-color-cream p-2 rounded-md font-poppins font-semibold'>
                        {
                            loading ? <ThreeDot variant="pulsate" color="#1E1E1E" size="small" text="" textColor="" /> : 'Save'
                        }
                </button>
                <button 
                  onClick={()=>{setShowEditor(false); setChatName(name)}}
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
