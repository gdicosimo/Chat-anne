import React from 'react'
import { addDocs, check } from '../../assets'

const Emptychat = () => {
  return (
    <div className='flex flex-col gap-4 w-full h-full justify-end'>
        <div className='flex flex-col bg-color-middleblack p-8 items-start border-[1px] border-color-cream rounded-3xl gap-4 hover:cursor-default'>
            <div className="relative">
                <div className="w-[60px] h-[60px] left-0 bottom-0 mb-2 absolute 
                bg-gradient-to-br from-white via-color-cream via-60% to-amber-400 
                rounded-full shadow-2xl shadow-color-cream" 
                >
                    <img src={addDocs} className='h-7 w-7 mt-4 ml-4'/>
                </div>
            </div>
            <h1>Upload your PDF files</h1>
            <div className='flex flex-col gap-2 w-full'>
                <h3>Once uploaded, you’ll be able to ask whatever you want about the information in the files.</h3>
                <div className='flex gap-2 items-center'>
                    <img src={check}/>
                    <h3>Up to 2000 pages per file</h3>
                </div>
                <div className='flex gap-2 items-center'>
                    <img src={check}/>
                    <h3>Up to 32MB per file</h3>
                </div>
            </div>
        </div>
        {
            //deberia ser un modulo a parte
        }
        <input type="file" class="block w-full 
            file:hover:cursor-pointer
            file:font-poppins file:font-medium file:text-xl
            file:py-5 file:px-8
            file:flex file:w-full file:justify-center
            file:rounded-3xl file:border-2 file:border-dotted
            file:text-color-cream file:bg-color-black
            file:border-color-cream
            hover:file:bg-color-middleblack
            text-color-black
        " placeholder='Drop your PDFs files here'/>
    </div>
  )
}

export default Emptychat
