import React, { useEffect } from 'react'
import { cross } from '../assets'
import useFetch from '../Hooks/useFetch'
import { ThreeDot } from 'react-loading-indicators'
const RemoveChatWindow = ({cerrarVentana, chatId}) => {
    const {data, loading, error, fetchdata} = useFetch()

    const deleteChat = async () => {
        console.log(chatId)
        fetchdata({id_chat: chatId}, 'GET_DELETE', null)
        .then(()=>{
            cerrarVentana()
            let urlparts = window.location.href.split('/')
            let id = urlparts[urlparts.length - 1];
            if (id === chatId){
                console.log("EQUALS")
                window.location.href = '/chat/0'
            } else {
                console.log("NON-EQUALS")
            }
        })
    }

    useEffect(()=>{}, [chatId])

    
    return (
        <div className='absolute w-full h-full flex flex-row bg-color-black/20 backdrop-blur-xl z-20 justify-center'>
          <div className='mx-4 h-min self-center bg-color-black/70 backdrop-blur-2xl p-8 rounded-3xl border-[1px] drop-shadow-2xl'>
            <img src={cross} onClick={cerrarVentana} className='items-center px-3 py-3 rounded-xl bg-color-lightblack btn-animated' />
            <h1 className='w-full text-center mt-10'>Are you sure you want to delete the chat?</h1>
            <h2 className='w-full text-center mb-10'>This action cannot be undone</h2>
            <div className="flex flex-row items-center justify-between gap-2">
              <button
                className='bg-color-cream h-min py-4 px-6 rounded-xl btn-animated font-poppins flex-1' 
                onClick={()=>{
                    deleteChat()
                }}>
                {
                            loading ? <ThreeDot variant="pulsate" color="#1E1E1E" size="small" text="" textColor="" /> : 'Accept'
                        }
              </button>
              <button
                className='bg-color-lightblack/20 border-2 h-min py-4 px-6 rounded-xl btn-animated font-poppins text-color-cream flex-1' 
                onClick={cerrarVentana}>
                Cancel
              </button>
            </div>
          </div>
        </div>
  )
}

export default RemoveChatWindow
