import { useState } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import Panel from './components/Panel'

function App() {
  return (
    <div className='bg-color-black pclarge:h-lvh h-dvh flex flex-col items-center justify-between'>
      <Header/>
      <Body/>
      <Footer/>
      <Panel/>
    </div>
  )
}

export default App
