from langchain.prompts import PromptTemplate, ChatPromptTemplate

template = """
    Eres un asistente para tareas de preguntas y respuestas. \n
    Utiliza los siguientes fragmentos de contexto recuperados para responder la pregunta. \n
    Si no sabes la respuesta, simplemente di que no lo sabes. \n
    Utiliza un máximo de tres oraciones y mantén la respuesta concisa.\n
    context: {context}
    question: {input}
    chat_history: {chat_history}
    answer:
"""

decomposition_template = """"
    Aquí está la pregunta que debe responder:

    \n --- \n {question} \n --- \n

    Aquí es cualquier pregunta de fondo disponibles + pares de respuesta:

    \n --- \n {q_a_pairs} \n --- \n

    Aquí está el contexto adicional relevante para la pregunta: 

    \n --- \n {context} \n --- \n

    Utilice el contexto anterior y cualquier pregunta de fondo + pares de respuesta para responder a la pregunta: \{question}
"""

template_decomposition = """
    Eres un asistente útil que genera múltiples sub-preguntas relacionadas con una pregunta de entrada. \n
    Utiliza los siguientes fragmentos de contexto recuperados para responder la pregunta.  \n
    El objetivo es descomponer la entrada en un conjunto de sub-problemas / sub-preguntas que pueden ser respuestas de forma aislada. \n
    Generar múltiples consultas de búsqueda relacionadas con: {question} \n
    Output (3 queries):
"""


prompt = PromptTemplate.from_template(template)
decomposition_prompt = ChatPromptTemplate.from_template(decomposition_template)
prompt_decomposition = ChatPromptTemplate.from_template(template_decomposition)
