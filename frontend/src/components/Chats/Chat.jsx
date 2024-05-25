import React, { useEffect, useState, useRef } from 'react'
import useFetch from '../../Hooks/useFetch'
import Footer from '../Footer'
import { ThreeDot } from 'react-loading-indicators'
import { useParams } from 'react-router-dom'
import LoadingAnswerContext from './LoadingAnswer'

const Chat = ({messages, chatId, refresh, hasFiles}) => {
  const [msg, setMsg] = useState(messages)
  const {data, loading, error, fetchdata} = useFetch()
  const [loadingAnswer, setloadingAnswer] = useState(false)
  const [mensajeNuevo, setMensajeNuevo] = useState('')
  const messageContainerRef = useRef(null);

  const { id } = useParams()
  useEffect(()=>{
    async function sendMsg(msg){
      const body = {
        id_chat: id != '0' ? id : chatId['id_chat '],
        query: msg
      }
      await fetchdata(body, 'GET_SEND_MSG', null)
    }
    if (mensajeNuevo){
      setMsg(prevMsg => (prevMsg ? [...prevMsg, {query: mensajeNuevo }] : [{query: mensajeNuevo }] ));
      setloadingAnswer(true)
      sendMsg(mensajeNuevo)
    }
  }, [mensajeNuevo])

  useEffect(()=>{
    if (data) {
      // Assuming 'prevMsg' is intended to be an array
      setMsg(prevMsg => (prevMsg ? [...prevMsg, { answer: data}] : [{ answer: data}] ));
      setloadingAnswer(false)
    }
  },[data])

  function scrollBottom(){
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }

  useEffect(()=>{
    scrollBottom()
  }, [msg, loading, messages])

  useEffect(()=>{
    //window.location.reload()
    setMsg(messages)
  },[refresh])

  useEffect(()=>{}, [hasFiles])


  return (
    <div className=' w-dvw flex flex-col items-center justify-between'>
      <div 
      ref={messageContainerRef}
      className='flex flex-col w-full gap-2 overflow-y-auto scrollbar scrollbar-thumb-color-lightblack'>
        {
          msg?.map((message, index)=>(
            <div key={index} className='flex flex-col w-full gap-2'>
                {
                  message.query ? <p className='user-msg'>{message.query}</p> : null
                }
                {
                  message.answer ? <p className='bot-msg'>{message.answer}</p> : null
                }  
            </div>
          ))
        }
        {
          loading ? 
          <div className='bot-msg px-4 py-2 items-center'>
            <ThreeDot variant="bob" color="#FDF0D5" size="small" text={""} textColor="" />
          </div> : null
        }
        
      </div>
      <div className=' bottom-0 w-full max-w-[900px] mt-2'>
      <LoadingAnswerContext.Provider value={loadingAnswer}>
        <Footer setMessages={(msg)=>{setMensajeNuevo(msg)}} hasFiles={hasFiles}/>
      </LoadingAnswerContext.Provider>
      </div>
    </div>
    
  )
}

export default Chat
