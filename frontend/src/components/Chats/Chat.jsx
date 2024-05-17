import React, { useEffect, useState } from 'react'
import useFetch from '../../Hooks/useFetch'

const Chat = ({messages, chatId, refresh, files}) => {
  const [msg, setMsg] = useState(messages)
  const [bot_response, setBotResponse] = useState(null)
  const {data, loading, error, fetchdata} = useFetch()

  useEffect(()=>{
    console.log(chatId["id_chat "])
    async function sendForm(form){
      await fetchdata(form, 'GET_ADD_DOC');
    }
    if (chatId) {
      const form = new FormData();
      form.append("id_chat", chatId);
      form.append("pdf", files[0]);

    }
    //enviarForm con pdfs
  },[chatId])

  useEffect(()=>{
    
    setMsg(messages)

  }, [refresh, bot_response])


  return (
    <div className='flex flex-col w-full gap-2'>
      {
        msg.map((item, index)=>(
          <div key={index} className={index % 2 === 0 ? 'bot-msg' : 'user-msg'}>
            {item}
          </div>
        ))
      }
    </div>
  )
}

export default Chat
