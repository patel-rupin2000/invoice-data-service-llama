import box
import yaml
from invoiceDataServiceConstants.qaPrompts import QA_TEMPLATE
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from invoiceDataServiceHandlers.setupLlmHandler import LLMSetup


class QueryExecutor:
    def __init__(self):
        self.llmSetup = LLMSetup
        with open('config.yml', 'r', encoding='utf8') as ymlfile:
            self.cfg = box.Box(yaml.safe_load(ymlfile))

    @staticmethod
    def set_qa_prompt():
        prompt = PromptTemplate(template=QA_TEMPLATE, input_variables=['context', 'question'])

        return prompt

    def build_retrieval_qa_chain(self, llm, prompt):
        embeddings = HuggingFaceEmbeddings(model_name=self.cfg.EMBEDDINGS,
                                           model_kwargs={'device': 'cuda:0'})  
        vectordb = FAISS.load_local(self.cfg.DB_FAISS_PATH, embeddings)
        retriever = vectordb.as_retriever(search_kwargs={'k': self.cfg.VECTOR_COUNT})
        qa_chain = RetrievalQA.from_chain_type(llm=llm,
                                               chain_type='stuff',
                                               retriever=retriever,
                                               return_source_documents=self.cfg.RETURN_SOURCE_DOCUMENTS,
                                               chain_type_kwargs={'prompt': prompt})
        
        return qa_chain

    def setup_qa_chain(self):
        llm = self.llmSetup().setup_llm()
        qa_prompt = self.set_qa_prompt()
        qa_chain = self.build_retrieval_qa_chain(llm, qa_prompt)

        return qa_chain

    def query_embeddings(self, query):
        embeddings = HuggingFaceEmbeddings(model_name=self.cfg.EMBEDDINGS,
                                           model_kwargs={'device': 'cuda:0'})
        vectordb = FAISS.load_local(self.cfg.DB_FAISS_PATH, embeddings)
        retriever = vectordb.as_retriever(search_kwargs={'k': self.cfg.VECTOR_COUNT})
        semantic_search = retriever.get_relevant_documents(query)

        return semantic_search
