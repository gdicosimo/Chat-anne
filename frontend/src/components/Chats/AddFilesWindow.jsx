import React, { useEffect, useState } from 'react'
import { cross, error } from '../../assets'
import { ThreeDot } from 'react-loading-indicators'
import useFetch from '../../Hooks/useFetch'
import { apiPaths } from '../../environment/apiPaths';

const AddFilesWindow = ({cerrarVentana, chatId, files}) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorPdf, setError] = useState(null)
    useEffect(()=>{
        
    }, [files])

    async function sendPdfs(){
      
      const formData = new FormData();
      formData.append('id_chat', chatId);
      //formData.append('pdf_files', files);
      for (let i = 0; i < files.length; i++) {
        formData.append('pdf_files', files[i]);
      }
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
              //console.log(await response.json())
              const responseError = await response.json()
              throw new Error(responseError.message);
          }
          setLoading(false)
      } catch (error) {
          console.error(error); // Handle errors
          throw new Error(error);
      }
    }
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(()=>{
        console.log(data)
    }, [data.length])

    useEffect(()=>{
      async function throwEror(){
        delay(5000).then(()=>{
          cerrarVentana()
        })
      }
      if (errorPdf){
        console.log(errorPdf)
        throwEror()
      }
    },[errorPdf])
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
            {
              errorPdf ? (
                <div className='flex flex-row gap-2 items-center my-2'>
                    <img src={error} className='h-5'/>
                    <h1 className='font-normal text-yellow-400 text-base '>Error al cargar el pdf. Verifica que no esté repetido</h1>
                </div>
              ) : null
            }
            <div className="flex flex-row items-center justify-between gap-2">
              <button
                className='bg-color-cream h-min py-4 px-6 rounded-xl btn-animated font-poppins flex-1' 
                onClick={()=>{
                    //deleteChat()
                    if (!loading){
                      sendPdfs()
                      .then(()=>{
                          cerrarVentana()
                      })
                      .catch((err)=>{
                        setError(err)
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
