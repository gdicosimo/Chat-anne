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

function App() {
  const [open, setButtonOpen] = useState(false);
  const [openHistorial, setOpenHistorial] = useState(false)
  const [filesLoaded, setFilesLoaded] = useState([])
  const [chatId, setChatId] = useState("")
  const [messages, setMessages] = useState(["Hi! Let's start talking"])
  const [refresh, setRefresh] = useState(false)
  
  const {data, loading, error, fetchdata}  = useFetch()

  useEffect(()=>{
    async function fetch(){
      await fetchdata({name_chat: "untitled_3"}, 'GET_CREATE_CHAT')
    }
    if (filesLoaded.length > 0){
      fetch()
    }
  }, [filesLoaded.length])

  useEffect(()=>{
    data ? setChatId(data) : null
  },[data])


  const addMsg = (msg) => {
    messages.push(msg)
    setMessages(messages)
    console.log(messages)
    setRefresh(!refresh)
  }
  return (
    <div className='bg-color-black pclarge:h-lvh h-dvh w-dvw flex flex-col items-center justify-between'>
      <Helmet>
          <title>Chat-anne</title>
          <link rel='icon' type='image/png' href={add} sizes='any'/>
      </Helmet>
      <Header files={filesLoaded} setFiles={setFilesLoaded} setButtonOpen={setButtonOpen} chatId={chatId} chatName={'untitled chat'}/>
      {
        open ? 
          <PanelOpciones setButtonOpen={setButtonOpen} setOpenHistorial={setOpenHistorial}/> : (
            openHistorial ? <PanelHistorial setPanelOpen={setOpenHistorial} panelOpen={openHistorial}/> : null
          )
      }
      <div className= 'px-5 py-10 w-full max-w-[900px] overflow-scroll scrollbar scrollbar-thumb-color-lightblack h-full flex'>
          {
              filesLoaded.length > 0 ? <Chat messages={messages} chatId={chatId} refresh={refresh} files={filesLoaded}/> : <Emptychat files={filesLoaded} setFiles={setFilesLoaded}/>
          }
      </div>
      <Footer setMessages={(msg)=>{addMsg(msg)}}/>
    </div>
  )
}

export default App
