import os
from dotenv import load_dotenv
from typing import Optional

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings

import chromadb.utils.embedding_functions as embedding_functions


class GoogleGenerativeAI:
    __api_key = None
    __embedding_model = "models/embedding-001"
    __model = "gemini-pro"
    __chat_google = None
    __embedding_google = None
    __embedding_functions = None

    @staticmethod
    def __initialize():
        try:
            load_dotenv()
            GoogleGenerativeAI.__api_key = os.getenv('GOOGLE_API_KEY')
            os.environ['GOOGLE_API_KEY'] = GoogleGenerativeAI.__api_key
        except FileNotFoundError as e:
            raise Exception("No se proporcionó la API key")

    @staticmethod
    def __initialize_llm():
        if GoogleGenerativeAI.__api_key is None:
            GoogleGenerativeAI.__initialize()
        GoogleGenerativeAI.__chat_google = ChatGoogleGenerativeAI(
            model=GoogleGenerativeAI.__model, temperature=0.2)

    @staticmethod
    def __initialize_embedding():
        if GoogleGenerativeAI.__api_key is None:
            GoogleGenerativeAI.__initialize()
        GoogleGenerativeAI.__embedding_google = GoogleGenerativeAIEmbeddings(
            model=GoogleGenerativeAI.__embedding_model)

    @staticmethod
    def __initialize_chroma_embedding():
        if GoogleGenerativeAI.__api_key is None:
            GoogleGenerativeAI.__initialize()
        GoogleGenerativeAI.__embedding_functions = embedding_functions.GoogleGenerativeAiEmbeddingFunction(
            api_key=GoogleGenerativeAI.__api_key)

    @staticmethod
    def get_model() -> str:
        return GoogleGenerativeAI.__model

    @staticmethod
    def get_embedding_model() -> str:
        return GoogleGenerativeAI.__embedding_model

    @staticmethod
    def get_llm() -> ChatGoogleGenerativeAI:
        if GoogleGenerativeAI.__chat_google is None:
            GoogleGenerativeAI.__initialize_llm()
        return GoogleGenerativeAI.__chat_google

    @staticmethod
    def get_embedding_function() -> GoogleGenerativeAIEmbeddings:
        if GoogleGenerativeAI.__embedding_google is None:
            GoogleGenerativeAI.__initialize_embedding()
        return GoogleGenerativeAI.__embedding_google

    @staticmethod
    def get_chroma_embedding_function() -> embedding_functions:
        if GoogleGenerativeAI.__embedding_functions is None:
            GoogleGenerativeAI.__initialize_chroma_embedding()
        return GoogleGenerativeAI.__embedding_functions
