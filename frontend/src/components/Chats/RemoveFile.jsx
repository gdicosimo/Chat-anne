import React, { useEffect } from 'react'
import { ThreeDot } from 'react-loading-indicators'
import useFetch from '../../Hooks/useFetch'
import { cross } from '../../assets'
const RemoveFile = ({chatId, fileToRemove, closeWindow}) => {
    const {data, loading, error, fetchdata} = useFetch()
    async function removeFile(){
        let body = {
            id_chat: chatId,
            pdf_name: fileToRemove
        }
        await fetchdata(body, 'GET_POP_PDF', null)
    }

    return (
        <div className='absolute left-0 top-0 w-full h-full flex flex-row bg-color-black/20 backdrop-blur-xl z-50 justify-center'>
        <div className='h-min self-center bg-color-black/70 backdrop-blur-2xl p-8 rounded-3xl border-[1px] drop-shadow-2xl mx-4'>
          <img src={cross} onClick={()=>{!loading ? closeWindow():null}}className='items-center px-3 py-3 rounded-xl bg-color-lightblack btn-animated' />
          <h1 className='w-full text-left mt-10'>The following file will be deleted</h1>
          <div className='flex flex-col gap-2 w-full mb-10 mt-2 items-start'>
                <h2 className='text-left'>{fileToRemove}</h2>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <button
              className='bg-color-cream h-min py-4 px-6 rounded-xl btn-animated font-poppins flex-1' 
              onClick={()=>{
                  //deleteChat()
                  if (!loading){
                    removeFile().then(()=>{
                      closeWindow()
                    })
                  }
              }}>
              {
                          loading ? <ThreeDot variant="pulsate" color="#1E1E1E" size="small" text="" textColor="" /> : 'Accept'
                      }
            </button>
            <button
              className='bg-color-lightblack/20 border-2 h-min py-4 px-6 rounded-xl btn-animated font-poppins text-color-cream flex-1' 
              onClick={()=>{!loading ? closeWindow():null}}>
              Cancel
            </button>
          </div>
        </div>
      </div>
  )
}

export default RemoveFile
