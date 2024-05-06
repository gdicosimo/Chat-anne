import React, { useEffect, useState } from 'react'
import Emptychat from './Chats/Emptychat'
import Chat from './Chats/Chat'

const Body = ({files, setFiles, messages}) => {
    const [emptyChat, setEmptyChat] = useState(true)
    //cuando usuario sin registrar o chat nuevo, muestra empty chat
    //si el usuario selecciono un chat, tiene que traer el modulo de chat en progreso
    //userService.chats devuelve los chats
    const example = [{id:0, name:"Julian"}] //para usar de ejemplo como si fuera rta de la api
    const [filesLoaded, setFilesLoaded] = useState(false)
    
    useEffect(()=>{
        if (files.length > 0){
            setFilesLoaded(true)
        }
    },[files.length])

    return (
        <div className= 'px-5 py-10 w-full max-w-[900px] overflow-scroll scrollbar scrollbar-thumb-color-lightblack h-full flex'>
            {
                filesLoaded ? <Chat messages={messages}/> : <Emptychat files={files} setFiles={setFiles}/>
            }
            
        </div>
  )
}

export default Body
