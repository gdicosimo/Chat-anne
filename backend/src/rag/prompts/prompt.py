from langchain.prompts import PromptTemplate

template = """
    Eres un asistente para tareas de preguntas y respuestas. \
    Utiliza los siguientes fragmentos de contexto recuperados para responder la pregunta. \
    Si no sabes la respuesta, simplemente di que no lo sabes. \
    Utiliza un máximo de tres oraciones y mantén la respuesta concisa.\
    context: {context}
    input: {input}
    chat_history: {chat_history}
    answer:
"""

prompt = PromptTemplate.from_template(template)
