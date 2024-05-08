import { useEffect, useState } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import PanelOpciones from './components/PanelDesplegado/PanelOpciones'
import sessionFileStorage from './Utils/StorageManager/sessionFileStorage'
import PanelHistorial from './components/PanelHistorial'

function App() {
  const [open, setButtonOpen] = useState(true);
  const [filesLoaded, setFilesLoaded] = useState([])

  useEffect(()=>{
    console.log(filesLoaded)
  }, [filesLoaded.length])


  const [messages, setMessages] = useState(["Hi! Let's start talking"])
  const [refresh, setRefresh] = useState(false)

  const addMsg = (msg) => {
    messages.push(msg)
    setMessages(messages)
    console.log(messages)
    setRefresh(!refresh)
  }
  return (
    <div className='bg-color-black pclarge:h-lvh h-dvh flex flex-col items-center justify-between'>
      <Header files={filesLoaded} setFiles={setFilesLoaded} setButtonOpen={setButtonOpen}/>
      {open ? <PanelHistorial setPanelOpen={setButtonOpen}/> : null }
      <Body files={filesLoaded} setFiles={setFilesLoaded} messages={messages} refresh={refresh}/>
      <Footer setMessages={(msg)=>{addMsg(msg)}}/>
    </div>
  )
}

export default App
