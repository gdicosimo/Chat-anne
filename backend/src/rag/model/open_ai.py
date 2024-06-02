import os
from dotenv import load_dotenv
from typing import Optional

from langchain_community.embeddings import OpenAIEmbeddings
from langchain_openai import OpenAI as OpenAI_llm


class OpenAI:
    __model = "gpt-4o"
    __embedding_model = "text-embedding-3-large"
    __api_key = None
    __llm = None
    __embedding_function = None

    @staticmethod
    def __initialize():
        try:
            load_dotenv()
            OpenAI.__api_key = os.getenv('OPENAI_API_KEY')
        except FileNotFoundError as e:
            raise ValueError("No se proporcionó la API key")

    @staticmethod
    def __initialize_llm():
        if OpenAI.__api_key is None:
            OpenAI.__initialize()
        OpenAI.__llm = OpenAI_llm()

    @staticmethod
    def __initialize_embedding():
        if OpenAI.__api_key is None:
            OpenAI.__initialize()
        OpenAI.__embedding_function = OpenAIEmbeddings(
            model=OpenAI.__embedding_model)

    @staticmethod
    def get_model() -> str:
        return OpenAI.__model

    @staticmethod
    def get_embedding_model() -> str:
        return OpenAI.__embedding_model

    @staticmethod
    def get_llm():
        if OpenAI.__llm is None:
            OpenAI.__initialize_llm()
        return OpenAI.__llm

    @staticmethod
    def get_embedding_function():
        if OpenAI.__embedding_function is None:
            OpenAI.__initialize_embedding()
        return OpenAI.__embedding_function
