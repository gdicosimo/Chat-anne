import React, { useEffect, useState } from 'react'
import { cross } from '../../assets'
import { ThreeDot } from 'react-loading-indicators'
import useFetch from '../../Hooks/useFetch'
import { apiPaths } from '../../environment/apiPaths';

const AddFilesWindow = ({cerrarVentana, chatId, files}) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        
    }, [files])

    async function sendPdfs(){
      
      const formData = new FormData();
      formData.append('id_chat', chatId);
      formData.append('pdf_file', files[0]);
      console.log(Object.fromEntries(formData))
      try {
          setLoading(true)
          const response = await fetch(apiPaths["GET_ADD_DOC"], {
              method: 'PUT',
              credentials: 'include',
              body: formData,
          });
          if (response.ok){
              const responseData = await response.json()
              setData(responseData)
          } else {
              console.log(await response.json())
          }
          setLoading(false)
      } catch (error) {
          console.error(error); // Handle errors
      }
    }


    useEffect(()=>{
        console.log(data)
    }, [data.length])
    return (
    <div className='absolute left-0 w-full h-dvh flex flex-row bg-color-black/20 backdrop-blur-xl z-50 justify-center'>
          <div className='h-min self-center bg-color-black/70 backdrop-blur-2xl p-8 rounded-3xl border-[1px] drop-shadow-2xl mx-4'>
            <img src={cross} onClick={()=>{!loading ? cerrarVentana():null}}className='items-center px-3 py-3 rounded-xl bg-color-lightblack btn-animated' />
            <h1 className='w-full text-left mt-10'>The following files will be added</h1>
            <div className='flex flex-col gap-2 w-full mb-10 mt-2 items-start'>
                {
                    files ? (
                        files.map((file, index)=>(
                            <h2 key={index} className='text-left'>{index+1}- {file.name}</h2>
                        ))
                    ) : null
                }
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <button
                className='bg-color-cream h-min py-4 px-6 rounded-xl btn-animated font-poppins flex-1' 
                onClick={()=>{
                    //deleteChat()
                    if (!loading){
                      sendPdfs().then(()=>{
                        cerrarVentana()
                      })
                    }
                }}>
                {
                            loading ? <ThreeDot variant="pulsate" color="#1E1E1E" size="small" text="" textColor="" /> : 'Accept'
                        }
              </button>
              <button
                className='bg-color-lightblack/20 border-2 h-min py-4 px-6 rounded-xl btn-animated font-poppins text-color-cream flex-1' 
                onClick={()=>{!loading ? cerrarVentana():null}}>
                Cancel
              </button>
            </div>
          </div>
        </div>
  )
}

export default AddFilesWindow
