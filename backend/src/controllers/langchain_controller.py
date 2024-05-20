import uuid

from langchain_community.vectorstores import Chroma
from db.chromadb.chromadb import connect_db, create, rename, delete, exists, exists_pdf_in, pop_pdf_in, is_empty, list


from langchain.docstore.document import Document
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain.memory import ConversationBufferMemory

from rag.model.google_generativeai import GoogleGenerativeAI
from rag.data_processing.processing import processing
from rag.prompts.prompt import prompt

class Langchain:

    @staticmethod
    def __get_chroma_client(collection_name: str) -> Chroma:
        embedding_function = GoogleGenerativeAI.get_embedding_function()
        return Chroma(
            client=connect_db(),
            collection_name=collection_name,
            embedding_function=embedding_function
        )

    @staticmethod
    def create_chat(chat: str):
        try:
            create(chat)
        except Exception as e:
            raise e

    @staticmethod
    def delete_chat_if_exists(chat: str):
        try:
            delete(chat)
        except Exception as e:
            raise e

    @staticmethod
    def append_pdf_if_exists(chat: str, pdf: object, pdf_name: str):
        try:
            chat_client = Langchain.__get_chroma_client(chat)

            docs = processing(pdf)

            if exists_pdf_in(chat, pdf_name):
                raise ValueError(
                    f"Ya se agrego '{pdf_name}' al chat '{chat}'."
                )

            new_docs = []
            ids_docs = []
            for doc in docs:
                new_doc = Document(
                    page_content=doc.page_content,
                    metadata={
                        'page': doc.metadata.get('page'),
                        'pdf': pdf_name
                    }
                )
                new_docs.append(new_doc)
                ids_docs.append(str(uuid.uuid1()))

            chat_client.add_documents(
                documents=new_docs,
                ids=ids_docs
            )

        except Exception as e:
            raise e

    @ staticmethod
    def pop_pdf_if_exists(chat: str, pdf: str):
        try:
            pop_pdf_in(chat, pdf)
        except Exception as e:
            raise e

    @staticmethod
    def response(query: str, chat: str,history_chat) -> str:
        try:

            if is_empty(chat):
                raise ValueError(
                    f"El chat '{chat}' no contiene pdfs."
                )

            vectorstore = Langchain.__get_chroma_client(chat)

            retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
            
            memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

            if 'messages' in history_chat[0]:
                for entry in history_chat[0]['messages']:
                    memory.save_context({"input": entry['query']}, {"output": entry['answer']})

            llm = GoogleGenerativeAI.get_llm()

            combine_docs_chain = create_stuff_documents_chain(
                llm = llm, 
                prompt = prompt,
            )
            retrieval_chain = create_retrieval_chain(
                retriever, combine_docs_chain)

            query = {"input": query}
            query["chat_history"] = memory

            response = retrieval_chain.invoke(query)

            return response["answer"]
        except Exception as e:
            raise e

    # This function is only for testing
    @ staticmethod
    def list_chats():
        try:
            return list()
        except Exception as e:
            raise e
