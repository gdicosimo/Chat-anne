import os
from dotenv import load_dotenv
from typing import Optional

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings


class GoogleGenerativeAI:
    __model = "gemini-1.5-pro-latest"
    __embedding_model = "models/embedding-001"
    __api_key = None
    __chat_google = None
    __embedding_google = None

    @staticmethod
    def __initialize():
        try:
            load_dotenv()
            GoogleGenerativeAI.__api_key = os.getenv('GOOGLE_API_KEY')
        except FileNotFoundError as e:
            raise ValueError("No se proporcionó la API key")

    @staticmethod
    def __initialize_llm(temperature):
        if GoogleGenerativeAI.__api_key is None:
            GoogleGenerativeAI.__initialize()
        GoogleGenerativeAI.__chat_google = ChatGoogleGenerativeAI(
            model=GoogleGenerativeAI.__model, temperature=temperature)

    @staticmethod
    def __initialize_embedding():
        if GoogleGenerativeAI.__api_key is None:
            GoogleGenerativeAI.__initialize()
        GoogleGenerativeAI.__embedding_google = GoogleGenerativeAIEmbeddings(
            model=GoogleGenerativeAI.__embedding_model)

    @staticmethod
    def get_model() -> str:
        return GoogleGenerativeAI.__model

    @staticmethod
    def get_embedding_model() -> str:
        return GoogleGenerativeAI.__embedding_model

    @staticmethod
    def get_llm(temperature=0) -> ChatGoogleGenerativeAI:
        if GoogleGenerativeAI.__chat_google is None:
            GoogleGenerativeAI.__initialize_llm(temperature)
        return GoogleGenerativeAI.__chat_google

    @staticmethod
    def get_embedding_function() -> GoogleGenerativeAIEmbeddings:
        if GoogleGenerativeAI.__embedding_google is None:
            GoogleGenerativeAI.__initialize_embedding()
        return GoogleGenerativeAI.__embedding_google
