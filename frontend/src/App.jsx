import { useState } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import Panel from './components/PanelDesplegado/Panel'

function App() {
  const [open, setButtonOpen] = useState(false);
  return (
    <div className='bg-color-black pclarge:h-lvh h-dvh flex flex-col items-center justify-between'>
      <Header setButtonOpen={setButtonOpen}/>
      {open ? <Panel setButtonOpen={setButtonOpen}/> : null }
      <Body/>
      <Footer/>
    </div>
  )
}

export default App
