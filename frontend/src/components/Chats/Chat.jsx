import React, { useEffect, useState } from 'react'

const Chat = ({messages, refresh}) => {
  const [msg, setMsg] = useState(messages)
  useEffect(()=>{
    console.log("newmsg")
    console.log(messages)
    setMsg(messages)
  },[refresh])
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
