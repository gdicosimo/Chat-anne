import React, { useRef } from 'react'
import FileContainer from './FileContainer'
import { add } from '../../assets'
import DragDropLogic from '../DragDrop/DragDropLogic'
const FilesLoaded = ({files}) => {
    const inputRef = useRef(null)
    // onChange={(e)=>DragDropLogic.handleChange(e, setFiles)}
  return (
    <div className='flex flex-row gap-2 w-full overflow-x-auto scrollbar my-2 items-center'>
        
        <input
            placeholder="fileInput"
            className="hidden"
            ref={inputRef}
            type="file"
            multiple={true}
            accept=".pdf"
        />
        <img src={add} className='h-6 mr-3 btn-animated' onClick={()=>DragDropLogic.openFileExplorer(inputRef)}/>
        {files.map((file)=>(
            <div key={file.id}>
                <FileContainer file={file}/>
            </div>
        ))}
    </div>
  )
}

export default FilesLoaded
