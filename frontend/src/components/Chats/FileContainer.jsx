import React from 'react'
import { cross, doc } from '../../assets'

const FileContainer = ({file}) => {
  return (
    <div className='btn-animated items-center my-2 flex flex-row p-3 border-[1px] border-color-cream rounded-xl hover:bg-color-lightblack transition-all justify-between max-w-[180px]'>
        <img src={doc} className='h-4'/>
        <h1 className='mx-1 font-poppins font-normal text-xs whitespace-nowrap overflow-hidden overflow-ellipsis' >{file.name}</h1>
        <img src={cross} className='h-4'/>
    </div>
  )
}

export default FileContainer
