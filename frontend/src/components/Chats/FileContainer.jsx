import React, { useState } from 'react'
import { cross, doc } from '../../assets'
import AddFilesWindow from './AddFilesWindow'
import RemoveFile from './RemoveFile'

const FileContainer = ({file, refetch, chatId}) => {
  const [confirmRm, setConfirmRm] = useState(false)
  return (
    <>
      <div className='btn-animated items-center my-2 flex flex-row p-3 border-[1px] border-color-cream rounded-xl hover:bg-color-lightblack transition-all justify-between max-w-[180px]'>
          <img src={doc} className='h-4'/>
          <h1 className='mx-1 font-poppins font-normal text-xs whitespace-nowrap overflow-hidden overflow-ellipsis' >{file}</h1>
          <img src={cross} className='h-4' onClick={()=>{setConfirmRm(true)}}/>
      </div>
      {
        true ? (
          <RemoveFile chatId={chatId} fileToRemove={file} closeWindow={()=>{setConfirmRm(false); refetch()}}/>
        ): null
      }
    </>
  )
}

export default FileContainer
