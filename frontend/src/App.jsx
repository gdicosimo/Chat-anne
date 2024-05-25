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
import { OrbitProgress } from 'react-loading-indicators'
function App() {
  const [open, setButtonOpen] = useState(false);
  const [openHistorial, setOpenHistorial] = useState(false)
  const [filesLoaded, setFilesLoaded] = useState([]) //no se usa
  const [chatId, setChatId] = useState("")
  const [messages, setMessages] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const { id } = useParams()
  const {data, loading, error, fetchdata}  = useFetch()
  const [chatName, setChatName] = useState(null)
  const [chatFiles, setChatFiles ] = useState(null)
  const [newFiles, setNewFiles] = useState(false)

  async function fetch(existingChat){
    if (!existingChat){
      await fetchdata({id_chat: "untitled chat"}, 'GET_CREATE_CHAT', null) //cuando se cargan los archivos, se manda a crear el chat
    } else {
      await fetchdata(null, 'GET_MSGS', id)
    }
  }

  useEffect(()=>{
    console.log('hola')
    if (id != '0'){
      fetch(true)
    } else {
      fetch(false)
    }
    console.log('ID CHANGED')
  }, [id, newFiles])

  useEffect(()=>{
    if (data) {
      if (id === '0'){
        setChatId(data)
      } else {
        setMessages(data.chat.messages)
        setChatId(data.chat._id)
        setRefresh(!refresh)
        setChatName(data.chat.name)
        setChatFiles(data.chat.pdfs)
      }
    }
    //data ? setChatId(data) : null //al crear el chat, la API devuelve el id de este. Entonces lo seteamos
  },[data])

  useEffect(()=>{
    console.log(loading)
  }, [loading])

  return (
    <div className='bg-color-black pclarge:h-lvh h-dvh w-dvw flex flex-col items-center justify-between'>
      <Helmet>
          <title>Chat-anne</title>
          <link rel='icon' type='image/png' href={add} sizes='any'/>
      </Helmet>
      <Header newFiles={newFiles} setNewFiles={setNewFiles} files={chatFiles} setFiles={setFilesLoaded} setButtonOpen={setButtonOpen} chatId={chatId} chatName={chatName ? chatName :  'untitled chat' }/>
      {
        open ? 
          <PanelOpciones setButtonOpen={setButtonOpen} setOpenHistorial={setOpenHistorial}/> : (
            openHistorial ? <PanelHistorial setPanelOpen={setOpenHistorial} panelOpen={openHistorial}/> : null
          )
      }
      {
        loading ? 
        <div className='items-center flex flex-col absolute w-full h-full bg-color-lightblack/20 z-50 justify-center backdrop-blur-lg'>
          <OrbitProgress variant='bubble-dotted' color='#FDF0D5' size='small' text='' textColor='' easing='ease-in-out' />
        </div> : null
      }
      <div className='w-full max-w-[900px] overflow-scroll scrollbar scrollbar-thumb-color-lightblack h-full flex'>
        {id !== '0' && data != null ? (
          <Chat messages={messages} chatId={chatId}  refresh={refresh} hasFiles={chatFiles ? true : false}/>
        ) : <Emptychat files={filesLoaded} setFiles={setFilesLoaded} chatId={chatId}/>
        }
      </div>
      
    </div>
  )
}

export default App
