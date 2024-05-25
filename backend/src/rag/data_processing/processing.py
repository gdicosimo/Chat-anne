from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader


def preprocessing(documents):

    i = 0
    for document in documents:
        document.page_content = document.page_content.replace('\n', ' ')
        i += len(document.page_content)
        #del(document.metadata['page']) #es irrelevante esta informacion de la metadata, si se quiere se puede eliminar
    return i


def processing(pdf):

    loader = PyPDFLoader(pdf)

    documents = loader.load()
    
    total_characters = preprocessing(documents)

    chunk_size = total_characters//10
    if (chunk_size > 1500): #ya que sino con PDF muy grandes se generarian chunks demasiado extensos
        chunk_size = 1500
    #print(chunk_size)

    text_splitter = RecursiveCharacterTextSplitter(
        #separator="\n", #alternativa usar el character text splitter con el separador de salto de linea
        chunk_size=chunk_size,
        chunk_overlap=chunk_size//5,
        length_function=len,
        is_separator_regex = False
    )

    docs = text_splitter.split_documents(documents) #puede ser preferible un split_text a un split_documents

    return docs

""" chunks = processing('C:/Users/Martino/Desktop/ProyectoFinal-Documentacion/978-3-658-41657-7_37.pdf')
for chunk in chunks:
    print(chunk)
    print("el tamanio del chunk es: " + str(len(chunk.page_content)))
    print('\n') """
