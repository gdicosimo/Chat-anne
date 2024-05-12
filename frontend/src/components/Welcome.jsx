import React from 'react'
import { vid } from '../assets'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { add } from '../assets'
const Welcome = () => {
  return (
    <div className='bg-color-black h-dvh items-center  justify-center flex flex-col overflow-clip'>
    <Helmet>
        <title>Chat-anne</title>
        <link rel='icon' type='image/png' href={add} sizes='any'/>
    </Helmet>
        <div className='items-center justify-between flex 
        flex-col z-10 bg-color-black/10 backdrop-blur-xl h-5/6 pclarge:w-1/3 pcsmall:w-1/3
        rounded-3xl border-[1px] border-color-gray/40 drop-shadow-2xl p-10 mx-4'>
            <div className='items-center flex flex-col h-full justify-center'>
                <div className='h-10 w-10 bg-gradient-to-br from-violet-100 via-violet-400 to-violet rounded-full mb-4 shadow-2xl shadow-violet-500'/>
                <h1 className='font-light'>Welcome to</h1>
                <h1 className='text-6xl text-center'>Chat-anne</h1>
                <h1 className='font-extralight text-base'>/tʃæt-æn/</h1>
                <h1 className='font-extralight text-base text-center my-4'>The most powerful AI in document-based understanding and response</h1>
            </div>
            <div className='flex pclarge:flex-row tablet:flex-col flex-col w-full gap-2'>
                <Link 
                    to="/register" 
                    className='hover:opacity-80 hover:scale-[0.99] transition-all  
                    justify-center text-center rounded-2xl bg-color-cream py-5 px-10 flex-1 
                    text-sm font-poppins font-semibold text-color-black'>
                            Sign up
                </Link>
                <Link 
                    to="/login" 
                    className='hover:opacity-80 hover:scale-[0.99] transition-all justify-center 
                    text-center rounded-2xl bg-color-cream/10 border-2 border-color-cream py-5 px-10 
                    flex-1 flex-row text-sm font-poppins font-semibold text-color-cream'>
                            Log in
                </Link>
            </div>
        </div>
        <video loop autoPlay muted className='absolute z-0 object-cover h-full w-full overflow-clip'>
            <source src={vid} type="video/mp4" />
        </video>
    </div>
  )
}

export default Welcome
