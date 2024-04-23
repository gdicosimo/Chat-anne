import { useState } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

function App() {
  return (
    <div className='bg-color-black pclarge:h-lvh h-dvh flex flex-col items-center justify-between'>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}

export default App
