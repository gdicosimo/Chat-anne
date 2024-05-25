/*
Un objeto de tipo Blob (Binary Large Object) es un tipo de objeto en JavaScript que representa
datos binarios, como archivos, imágenes o datos multimedia. Los Blobs son útiles cuando necesitas 
manipular datos binarios en JavaScript, como cargar o descargar archivos, enviar datos a través de 
XMLHttpRequest, o crear objetos URL para enlazar a datos binarios.
*/

var filesChanged = false;

const loadFilesToStorage = (filesToAdd) => {
    const existingFiles = getFilesFromStorage() || [];
    const newFilesArray = filesToAdd?.map((file, index) => {
        return { id: existingFiles.length + index + 1, name: file.name };
    });
    const updatedFiles = existingFiles.concat(newFilesArray);
    sessionStorage.setItem("files", JSON.stringify(updatedFiles));
    console.log("Files added successfully");
    filesChanged = !filesChanged;
    console.log(filesChanged);
}

const getFilesFromStorage = () => {
    const files = sessionStorage.getItem("files")
    if (files != null)
        return JSON.parse(files)
    return null
}

export default {loadFilesToStorage, getFilesFromStorage, filesChanged}