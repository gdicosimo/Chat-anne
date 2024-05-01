const handleDragEnter = (e, setDragActive) =>{
    //This will track when a file has entered the drop zone
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
}
const handleDrop = (e, setDragActive, setFiles) =>{
    // This will track when a file has been dropped into the zone.
    e.preventDefault();
    e.stopPropagation();
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
const handleChange = (e, setFiles) =>{
    //This function will track when a file has been added through our
    //file explorer dialog. This will iterate through the file list and store each file in our files state.
    e.preventDefault();
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

const removeFile = (fileName, idx, files, setFiles) =>{
    //This function will remove a selected file from the list.
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
}

export default {handleDragEnter, handleDrop, handleDragLeave, handleDragOver, handleChange, handleSubmit, openFileExplorer, removeFile}