import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import PanelOpciones from './components/PanelDesplegado/PanelOpciones'
import PanelHistorial from './components/PanelHistorial'
import { Helmet } from 'react-helmet'
import { add } from './assets'
import Chat from './components/Chats/Chat'
import Emptychat from './components/Chats/Emptychat'
import useFetch from './Hooks/useFetch'
import { useParams } from "react-router-dom";

function App() {
  const [open, setButtonOpen] = useState(false);
  const [openHistorial, setOpenHistorial] = useState(false)
  const [filesLoaded, setFilesLoaded] = useState([])
  const [chatId, setChatId] = useState("")
  const [messages, setMessages] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const { id } = useParams()
  const {data, loading, error, fetchdata}  = useFetch()
  const [sendPdfs, setSendPdfs] = useState(false)

  async function fetch(existingChat){
    if (!existingChat){
      await fetchdata({id_chat: "untitled"}, 'GET_CREATE_CHAT', null) //cuando se cargan los archivos, se manda a crear el chat
    } else {
      await fetchdata(null, 'GET_MSGS', id)
    }
  }

  
  useEffect(()=>{
    if (id === '0' && filesLoaded.length > 0){
      fetch(false)
      setSendPdfs(true)
    }
  }, [filesLoaded.length])

  useEffect(()=>{
    if (id != '0'){
      fetch(true)
      console.log('ID CHANGED')
    }
  }, [id])

  useEffect(()=>{
    if (data) {
      if (id === '0'){
        setChatId(data)
      } else {
        console.log(data.chat.messages)
        console.log(data.chat.name)
        console.log(data.chat._id)
        setMessages(data.chat.messages)
        setChatId(data.chat._id)
        setRefresh(!refresh)
      }
    }
    //data ? setChatId(data) : null //al crear el chat, la API devuelve el id de este. Entonces lo seteamos
  },[data])

  return (
    <div className='bg-color-black pclarge:h-lvh h-dvh w-dvw flex flex-col items-center justify-between'>
      <Helmet>
          <title>Chat-anne</title>
          <link rel='icon' type='image/png' href={add} sizes='any'/>
      </Helmet>
      <Header files={filesLoaded} setFiles={setFilesLoaded} setButtonOpen={setButtonOpen} chatId={chatId} chatName={id === '0' ? 'untitled chat' : data != null ? data.chat.name : null}/>
      {
        open ? 
          <PanelOpciones setButtonOpen={setButtonOpen} setOpenHistorial={setOpenHistorial}/> : (
            openHistorial ? <PanelHistorial setPanelOpen={setOpenHistorial} panelOpen={openHistorial}/> : null
          )
      }
      <div className='w-full max-w-[900px] overflow-scroll scrollbar scrollbar-thumb-color-lightblack h-full flex'>
        {id !== '0' && data != null ? (
          <Chat messages={data.chat.messages} chatId={data.chat._id} refresh={refresh} files={filesLoaded} />
        ) : id === '0' ? (
          filesLoaded.length === 0 ? (
            <Emptychat files={filesLoaded} setFiles={setFilesLoaded} />
          ) : <Chat messages={messages} chatId={chatId} refresh={refresh} files={filesLoaded} sendPdfs={sendPdfs} setSend={setSendPdfs}/>
        ) : null
        }
      </div>
      
    </div>
  )
}

export default App
