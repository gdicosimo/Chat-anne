from langchain.prompts import PromptTemplate

template = """
    You are an assistant for question-answering tasks. \
    Use the following pieces of retrieved context to answer the question. \
    If you don't know the answer, just say that you don't know. \
    Use three sentences maximum and keep the answer concise.\
    context: {context}
    input: {input}
    chat_history: {chat_history}
    answer:
"""

prompt = PromptTemplate.from_template(template)
