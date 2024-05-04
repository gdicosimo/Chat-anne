import { useEffect, useState } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import sessionFileStorage from './Utils/StorageManager/sessionFileStorage'

function App() {
  const [filesLoaded, setFilesLoaded] = useState([])

  useEffect(()=>{
    console.log(filesLoaded)
  }, [filesLoaded.length])
  return (
    <div className='bg-color-black pclarge:h-lvh h-dvh flex flex-col items-center justify-between'>
      <Header files={filesLoaded} setFiles={setFilesLoaded}/>
      <Body files={filesLoaded} setFiles={setFilesLoaded}/>
      <Footer/>
    </div>
  )
}

export default App
