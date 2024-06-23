from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain.docstore.document import Document


def preprocessing(documents, doc_for_level3):

    i = 0
    for document in documents:
        document.page_content = document.page_content.replace('\n', ' ')
        i += len(document.page_content)
        doc_for_level3.page_content += document.page_content
        # del(document.metadata['page']) #es irrelevante esta informacion de la metadata, si se quiere se puede eliminar

    return i


def divideDocuments(chunk_size, docs):
    # Realizamos un split en nuestro pdf, generando diferentes chunks

    text_splitter = RecursiveCharacterTextSplitter(
        # si se utilizan estos separators termina dividiendo por pagina, que es otra alternativa
        # separators=["\n\n", "\n"],
        chunk_size=chunk_size,
        chunk_overlap=chunk_size//5,
        length_function=len,
        is_separator_regex=False)

    return text_splitter.split_documents(docs)


def processing(pdf):

    loader = PyPDFLoader(pdf)

    documents = loader.load()

    doc_for_level3 = Document("", metadata={'page': 0})

    total_characters = preprocessing(documents, doc_for_level3)

    chunk_size = total_characters//10
    if (chunk_size > 1500):  # ya que sino con PDF muy grandes se generarian chunks demasiado extensos
        chunk_size = 1500
    # print(chunk_size)

    return divideDocuments(chunk_size, documents), doc_for_level3, chunk_size
