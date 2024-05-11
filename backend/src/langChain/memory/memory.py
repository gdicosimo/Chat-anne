from langchain_community.chat_message_histories import ChatMessageHistory


class ChatHistory:
    name = "chat_history"
    store = {}

    @staticmethod
    def get_session_history(session_id: str):
        if session_id not in ChatHistory.store:
            ChatHistory.store[session_id] = ChatMessageHistory()
        return ChatHistory.store[session_id]

    @staticmethod
    def get_name():
        return ChatHistory.name
