import React, { useState } from 'react'
import Emptychat from './Emptychat'

const Body = () => {
    const [emptyChat, setEmptyChat] = useState(true)
    return (
        <div className='px-5 py-8 w-full h-full max-w-[900px] flex'>
            <Emptychat/>
        </div>
  )
}

export default Body
