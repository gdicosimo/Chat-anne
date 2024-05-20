import React, { useEffect, useRef, useState } from 'react'
import FileContainer from './FileContainer'
import { add } from '../../assets'
import DragDropLogic from '../DragDrop/DragDropLogic'

const FilesLoaded = ({files, setFiles}) => {
    const inputRef = useRef(null)

    // useEffect(()=>{

    // }, [files.length])
  return (
    <div className='flex flex-row gap-2 w-full overflow-x-auto scrollbar hover:scrollbar-thumb-color-lightblack my-2 items-center transition-all'>
        <input
            placeholder="fileInput"
            className="hidden"
            ref={inputRef}
            type="file"
            onChange={(e)=>DragDropLogic.handleChange(e, setFiles, ()=>{})}
            multiple={true}
            accept=".pdf"
        />
        {
            files != null ? (<img src={add} className='h-6 mr-3 btn-animated' onClick={()=>DragDropLogic.openFileExplorer(inputRef)}/>) : null
        }
        {
            files != null ? (
                files.map((file, index)=>(
                    <div key={index}>
                        <FileContainer file={file}/>
                    </div>
                ))
                ) : null
        }
    </div>
  )
}

export default FilesLoaded
