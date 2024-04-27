import React, { useState } from 'react'
import Emptychat from './Chats/Emptychat'
import Chat from './Chats/Chat'
const Body = () => {
    const [emptyChat, setEmptyChat] = useState(true)
    //cuando usuario sin registrar o chat nuevo, muestra empty chat
    //si el usuario selecciono un chat, tiene que traer el modulo de chat en progreso
    //userService.chats devuelve los chats
    const example = [{id:0, name:"Julian"}] //para usar de ejemplo como si fuera rta de la api
    const logged = false;
    return (
        <div className='px-5 py-8 w-full h-full max-w-[900px] flex'>
            {
                logged ? <Chat/> : <Emptychat/>
            }
            
        </div>
  )
}

export default Body
