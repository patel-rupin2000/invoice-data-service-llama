import yaml
import box
from langchain.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import DirectoryLoader, PyPDFLoader
from langchain.embeddings import HuggingFaceEmbeddings


class InvoiceProcessor:
    def __init__(self, config_path):
        with open(config_path, 'r', encoding='utf8') as ymlfile:
            self.cfg = box.Box(yaml.safe_load(ymlfile))

    def process_invoices(self):
        loader = DirectoryLoader(self.cfg.DATA_PATH,
                                 glob='*.pdf',
                                 loader_cls=PyPDFLoader)
        documents = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=self.cfg.CHUNK_SIZE,
                                                       chunk_overlap=self.cfg.CHUNK_OVERLAP)
        texts = text_splitter.split_documents(documents)
        embeddings = HuggingFaceEmbeddings(model_name=self.cfg.EMBEDDINGS,
                                           model_kwargs={'device': 'cuda:0'})

        vectorstore = FAISS.from_documents(texts, embeddings)
        vectorstore.save_local(self.cfg.DB_FAISS_PATH)
        print("done")
