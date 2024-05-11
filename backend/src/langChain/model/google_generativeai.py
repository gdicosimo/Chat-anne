import os
from dotenv import load_dotenv
from typing import Optional

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings

import chromadb.utils.embedding_functions as embedding_functions


class GoogleGenerativeAI:
    def __init__(self, embedding_model: str = "models/embedding-001", model: str = "gemini-pro"):
        self.embedding_model = embedding_model
        self.model = model

        try:
            load_dotenv()
            os.environ['GOOGLE_API_KEY'] = os.getenv('GOOGLE_API_KEY')
            self.__api_key = os.getenv('GOOGLE_API_KEY')
        except FileNotFoundError as e:
            raise e

    def get_model(self) -> str:
        return self.model

    def get_embedding_model(self) -> str:
        return self.embedding_model

    def get_llm(self) -> ChatGoogleGenerativeAI:
        return ChatGoogleGenerativeAI(model=self.model, temperature=0.2)

    def get_embedding_function(self) -> GoogleGenerativeAIEmbeddings:
        return GoogleGenerativeAIEmbeddings(model=self.embedding_model)

    def get_chroma_embedding_function(self) -> GoogleGenerativeAIEmbeddings:
        return embedding_functions.GoogleGenerativeAiEmbeddingFunction(api_key=self.__api_key)
