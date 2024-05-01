import React from 'react'
import { useRef, useState } from 'react';
import DragDropLogic from './DragDropLogic';
import { trash } from '../../assets';
const DragDrop = () => {
    const [dragActive, setDragActive] = useState(false); //track when a file has entered or exited the dropzone
    const inputRef = useRef(null); //used to activate the choose file dialogue box
    const [files, setFiles] = useState([]); //used to store our files.

    
    return (
        <>
        <div className="flex items-start justify-center w-full ">
            <form
            className={`${ dragActive ? "bg-color-lightblack" : "bg-color-middleblack"}
            px-8 py-5 rounded-3xl text-center flex flex-col w-full items-center justify-center `}
            onDragEnter={(e)=>DragDropLogic.handleDragEnter(e,setDragActive)}
            onSubmit={(e) => e.preventDefault()}
            onDrop={(e)=>DragDropLogic.handleDrop(e, setDragActive, setFiles)}
            onDragLeave={(e)=>DragDropLogic.handleDragLeave(e,setDragActive)}
            onDragOver={(e)=>DragDropLogic.handleDragOver(e,setDragActive)}
            >
            <div >
                <input
                placeholder="fileInput"
                className="hidden"
                ref={inputRef}
                type="file"
                multiple={true}
                onChange={(e)=>DragDropLogic.handleChange(e, setFiles)}
                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                />

                <p className='font-poppins font-normal text-color-cream text-lg'>
                Drag & Drop files or{" "}
                <span
                    className="font-poppins font-semibold text-color-cream text-lg cursor-pointer"
                    onClick={()=>DragDropLogic.openFileExplorer(inputRef)}
                >
                    <u>Select files</u>
                </span>{" "}
                to upload
                </p>
                <div className="flex flex-col items-start py-3 gap-1 max-h-28 overflow-auto scrollbar scrollbar-thumb-color-lightblack ">
                    {files.map((file, idx) => (
                        <div key={idx} className="flex flex-row gap-2 items-center">
                            <img
                                className="cursor-pointer w-4"
                                src={trash}
                                onClick={()=>DragDropLogic.removeFile(file.name, idx, files, setFiles)}
                            />
                            <span className='font-poppins font-light text-color-cream text-sm'>{file.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            </form>
        </div>
        <div className='flex justify-end'>
            <button className='px-6 py-2 w-min my-2 font-poppins font-normal bg-color-cream rounded-lg hover:scale-95 hover:opacity-95 transition-all'>
                Upload
            </button>
        </div>
        </>
  )
}

export default DragDrop
