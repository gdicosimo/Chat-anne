from langchain_text_splitters import CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader


def preprocessing(pdf):
    # Add preprocessing steps here
    return pdf


def processing(pdf):
    loader = PyPDFLoader(pdf)

    loader = preprocessing(loader)

    documents = loader.load()

    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )

    docs = text_splitter.split_documents(documents)

    return docs
