import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import DragDropLogic from './DragDropLogic';
import { trash } from '../../assets';
import { ThreeDot } from 'react-loading-indicators';

const DragDrop = ({setFiles, chatId}) => {
    const [dragActive, setDragActive] = useState(false); //track when a file has entered or exited the dropzone
    const inputRef = useRef(null); //used to activate the choose file dialogue box
    const [filesInBox, setFilesInBox] = useState([]); //used to store our files.
    const [send, setSend] = useState(false)
    const [filesAdded, setFilesAdded] = useState(false)
    const [loading, setLoading] = useState(false)
    async function sendPdfs(){
        const formChatId = chatId['id_chat '];
        const formData = new FormData();
        formData.append('id_chat', formChatId);
        formData.append('pdf_file', filesInBox[0]);
        console.log(Object.fromEntries(formData))
        try {
            setLoading(true)
            const response = await fetch('http://localhost:5000/chats/append-pdf', {
                method: 'PUT',
                credentials: 'include',
                body: formData,
            });
            if (response.ok){
                const responseData = await response.json()
                console.log(responseData)
                setLoading(false)
            } else {
                console.log(await response.json())
            }
        } catch (error) {
            console.error(error); // Handle errors
        }
    }

    useEffect(()=>{
        console.log(chatId)
        if (chatId != "" && send){
            sendPdfs().then(()=>{
                setFiles(filesInBox);
                setSend(false)
            })
        }
    }, [chatId, send])
    return (
        <>
        <div className="flex items-start justify-center w-full ">
            <form
            className={`${ dragActive ? "bg-color-lightblack" : "bg-color-middleblack"}
            px-8 py-5 rounded-3xl text-center flex flex-col w-full items-center justify-center `}
            onDragEnter={(e)=>DragDropLogic.handleDragEnter(e,setDragActive)}
            onSubmit={(e) => e.preventDefault()}
            onDrop={(e)=>DragDropLogic.handleDrop(e, setDragActive, setFilesInBox, setFilesAdded)}
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
                onChange={(e)=>DragDropLogic.handleChange(e, setFilesInBox, setFilesAdded)}
                accept=".pdf"
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
                {
                    filesAdded ? (
                        <div className="flex flex-col items-start py-3 gap-1 max-h-28 overflow-auto scrollbar scrollbar-thumb-color-lightblack ">
                            {filesInBox.map((file, idx) => (
                                <div key={idx} className="flex flex-row gap-2 items-center">
                                    <img
                                        className="cursor-pointer w-4"
                                        src={trash}
                                        onClick={()=>DragDropLogic.removeFile(file.name, idx, filesInBox, setFilesInBox, setFilesAdded)}
                                    />
                                    <span className='font-poppins font-light text-color-cream text-sm'>{file.name}</span>
                                </div>
                            ))}
                        </div>
                    ) : null
                }
            </div>
            </form>
        </div>
        {
            true ? (
                <div className='flex justify-end'>
                    <button 
                    className='px-6 py-2 w-min my-2 font-poppins font-normal bg-color-cream 
                    rounded-lg hover:scale-95 hover:opacity-95 transition-all'
                    onClick={()=>{DragDropLogic.handleUploadButton(setSend, filesInBox, setFilesAdded, setFiles, setFilesInBox)}}
                    >
                        {
                            loading ? <ThreeDot variant="pulsate" color="#1E1E1E" size="small" text="" textColor="" /> : 'Upload'
                        }
                    </button>
                </div>
            ) : null
        }
        </>
  )
}

export default DragDrop
