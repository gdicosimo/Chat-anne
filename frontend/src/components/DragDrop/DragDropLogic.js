import sessionFileStorage from "../../Utils/StorageManager/sessionFileStorage";

const handleDragEnter = (e, setDragActive) =>{
    //This will track when a file has entered the drop zone
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
}
const handleDrop = (e, setDragActive, setFiles, setFilesAdded) =>{
    // This will track when a file has been dropped into the zone.
    e.preventDefault();
    e.stopPropagation();
    setFilesAdded(true);
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
}
const handleDragLeave = (e, setDragActive) =>{
    //This will track when a file leaves our zone.
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
}
const handleDragOver = (e, setDragActive) =>{
    //This will track when a file is dragged over our zone
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
}
const handleChange = (e, setFiles, setFilesAdded) =>{
    //This function will track when a file has been added through our
    //file explorer dialog. This will iterate through the file list and store each file in our files state.
    e.preventDefault();
    setFilesAdded(true);
    console.log("File has been added");
    if (e.target.files && e.target.files[0]) {
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState) => [...prevState, e.target.files[i]]);
      }
    }
}
const handleSubmit = () =>{
    //Use this function to write your own submit logic. It first checks if our file list contains any files.
}
const openFileExplorer = (inputRef) =>{
    //This function will help activate the hidden input element to bring up the file explorer box.
    inputRef.current.value = "";
    inputRef.current.click();
}

const removeFile = (fileName, idx, files, setFiles, setFilesAdded) =>{
    //This function will remove a selected file from the list.
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    newArr.length === 0 ? setFilesAdded(false) : null ;
    setFiles(newArr);
}

const handleUploadButton = (files, setFilesAdded, setFiles, setFilesInBox) => {
    sessionFileStorage.loadFilesToStorage(files)
    setFilesAdded(false)
    setFiles(files)
    setFilesInBox([])
    //window.location.reload()
    //repensar esto. Es necesario renderizar el header nuevamente cuando se suben archivos.
}

export default {handleDragEnter, handleDrop, handleDragLeave, handleDragOver, handleChange, handleSubmit, openFileExplorer, removeFile, handleUploadButton}