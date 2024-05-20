import React, { useEffect, useState, useRef } from 'react'
import useFetch from '../../Hooks/useFetch'
import Footer from '../Footer'
import { ThreeDot } from 'react-loading-indicators'
const Chat = ({messages, chatId, refresh, files, sendPdfs, setSend}) => {
  const [msg, setMsg] = useState(messages)
  const {data, loading, error, fetchdata} = useFetch()
  const {data: dataPdf, loading: loadingPdf, error: errorPdf, fetchdata: fetchdataPdf}  = useFetch()
  const [mensajeNuevo, setMensajeNuevo] = useState('')
  const messageContainerRef = useRef(null);

  useEffect(()=>{
    console.log(chatId['id_chat '])
    console.log(messages)
    async function sendFiles(){
      const form = new FormData();
      form.append("pdf_file", files[0]);
      console.log(files[0])
      form.append("id_chat", '664a8f0058832b1c62e9b746');
      const d = Object.fromEntries(form.entries());
      console.log(d);
      await fetchdataPdf(form, 'GET_ADD_DOC', null, true)
    }
    if (sendPdfs){
      sendFiles()
      setSend(false)
    }
  },[sendPdfs])

  useEffect(()=>{
    async function sendMsg(msg){
      const body = {
        id_chat: chatId,
        query: msg
      }
      await fetchdata(body, 'GET_SEND_MSG', null)
    }
    if (mensajeNuevo){
      sendMsg(mensajeNuevo)
    }
  }, [mensajeNuevo])

  useEffect(()=>{
    if (data) {
      // Assuming 'prevMsg' is intended to be an array
      setMsg(prevMsg => (prevMsg ? [...prevMsg, { answer: data, query: mensajeNuevo }] : [{ answer: data, query: mensajeNuevo }] ));
      console.log(data);
    }
  },[data])

  function scrollBottom(){
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }

  useEffect(()=>{
    console.log(msg)
    console.log("MESSSS", messages)
    scrollBottom()
  }, [msg, loading, messages])

  useEffect(()=>{
    console.log(dataPdf)
  },[dataPdf])

  useEffect(()=>{
    //window.location.reload()
    setMsg(messages)
  },[refresh])


  return (
    <div className=' w-dvw flex flex-col items-center justify-between'>
      <div 
      ref={messageContainerRef}
      className='flex flex-col w-full gap-2 overflow-y-auto scrollbar scrollbar-thumb-color-lightblack'>
        {
          msg?.map((message, index)=>(
            <div key={index} className='flex flex-col w-full gap-2'>
                <p className='user-msg'>{message.query}</p>
                <p className='bot-msg'>{message.answer}</p>
            </div>
          ))
        }
        {
          loading || loadingPdf ? 
          <div className='bot-msg px-4 py-2 items-center'>
            <ThreeDot variant="bob" color="#FDF0D5" size="small" text={loadingPdf ? 'Uploading files' : null} textColor="" />
          </div> : null
        }
        
      </div>
      <div className=' bottom-0 w-full max-w-[900px] mt-2'>
        <Footer setMessages={(msg)=>{setMensajeNuevo(msg)}} />
      </div>
    </div>
  )
}

export default Chat
