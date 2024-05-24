import React, { useEffect, useRef, useState } from 'react'
import FileContainer from './FileContainer'
import { add } from '../../assets'
import DragDropLogic from '../DragDrop/DragDropLogic'
import AddFilesWindow from './AddFilesWindow'
import { useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'

const FilesLoaded = ({newFiles, setNewFiles, files, chatId}) => {
    const inputRef = useRef(null)
    const [filesToAdd, setFilesToAdd] = useState([])
    const [newFilesUploaded, setNewFilesUploaded] = useState(false)

    const cerrarVentana = () =>{
        setNewFilesUploaded(false)
        setNewFiles(!newFiles)
        setFilesToAdd([])
    }   

    const { id } = useParams()
    
    return (
        <>

        <div className='flex flex-row gap-2 w-full overflow-x-auto scrollbar hover:scrollbar-thumb-color-lightblack my-2 items-center transition-all'>
            <input
                placeholder="fileInput"
                className="hidden"
                ref={inputRef}
                type="file"
                onChange={(e)=>DragDropLogic.handleChange(e, setFilesToAdd, setNewFilesUploaded)}
                multiple={true}
                accept=".pdf"
            />
            { id === '0' ? null : <img src={add} className='h-6 mr-3 btn-animated' onClick={()=>DragDropLogic.openFileExplorer(inputRef)}/>}
            {
                files != null ? (
                    files.map((file, index)=>(
                        <div key={index}>
                            <FileContainer file={file}/>
                        </div>
                    ))
                    ) : id === '0' ? null : <h3 className='p-2 bg-color-lightblack rounded-lg'>Add files to start chating</h3>
            }
        </div>
            {
                newFilesUploaded ? (
                    
                        <AddFilesWindow cerrarVentana={()=>{cerrarVentana()}} chatId={chatId} files={filesToAdd}/>
                    
                ) : null
            }
        </>
  )
}

export default FilesLoaded
