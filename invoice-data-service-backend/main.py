from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from invoiceDataServiceBO.invoiceProcessingBO import InvoiceProcessor
from invoiceDataServiceUtils.queryExecutor import QueryExecutor
from typing import Optional
import timeit
import json
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)
query_executor = QueryExecutor()

@app.post("/upload_invoice/")
async def upload_invoice(invoice: UploadFile = File(...)):
    if not invoice:
        raise HTTPException(status_code=400, detail="No file uploaded")

    invoice_path = os.path.join('data', invoice.filename)
    with open(invoice_path, "wb") as buffer:
        buffer.write(invoice.file.read())
    print(invoice_path)
    InvoiceProcessor('config.yml').process_invoices()

    return {"File Uploaded": invoice_path}


@app.post("/ask_question/")
async def ask_question(question: Optional[str] = Form(None), semantic_search: Optional[bool] = Form(False)):
    if question:
        print("question", question)
        print("semantic_search", semantic_search)
        start = timeit.default_timer()
        if semantic_search:
            semantic_search_results = query_executor.query_embeddings(question)
            answer = {'semantic_search_results': semantic_search_results}
        else:
            qa_chain = query_executor.setup_qa_chain()
            response = qa_chain({'query': question})
            answer = {'answer': response['result']}
        end = timeit.default_timer()
        answer['time_taken'] = end - start
        response = {"asked_question": question,
                "answer": answer}
        print("response",response)
        return response
    else:
        return {"asked_question": None}
