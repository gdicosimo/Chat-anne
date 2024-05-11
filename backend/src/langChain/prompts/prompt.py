from langchain.prompts import PromptTemplate

template = """
    You are a helpful AI assistant.
    Answer based on the context provided.
    context: {context}
    input: {input}
    answer:
"""

prompt = PromptTemplate.from_template(template)
