# invoice-data-service-llama
A Simple chat bot portal where user can upload invoice PDF and ask relevant question about the data in that PDF to ChatBot

# Invoice Data Service (Llama)

Welcome to the Invoice Data Service (Llama) repository! This service provides functionalities for processing invoices and answering questions related to the processed data using advanced language models.

## Features

- **Invoice Processing:** Upload invoices in PDF format and process them to extract relevant information.
- **Question Answering:** Ask questions about the processed data and get relevant answers.
- **Semantic Search:** Perform semantic searches on the processed data to retrieve relevant documents.

## Technologies Used

- FastAPI: A modern, fast (high-performance) web framework for building APIs with Python 3.7+.
- Hugging Face Transformers: An open-source library that provides thousands of pre-trained models for Natural Language Understanding (NLU) and Natural Language Generation (NLG) tasks.
- FAISS: A library for efficient similarity search and clustering of dense vectors.
- PyPDF2: A pure-Python library built as a PDF toolkit.
- YAML: A human-readable data serialization format.

## Installation

To set up the Invoice Data Service locally, follow these steps:

1. Clone this repository:
   git clone https://github.com/patel-rupin2000/invoice-data-service-llama.git
   
2. Install the dependencies:
   pip install -r requirements.txt

3. Run the application:
   uvicorn main:app --reload

## Usage

### Upload Invoice

To upload an invoice, send a POST request to `/upload_invoice/`, providing the invoice file as form data.

Example:

```
curl -X 'POST'
'http://localhost:8000/upload_invoice/'
-H 'accept: application/json'
-H 'Content-Type: multipart/form-data'
-F 'invoice=@/path/to/invoice.pdf'
```

### Ask Question

To ask a question about the processed data, send a POST request to `/ask_question/`, providing the question as form data. Optionally, you can enable semantic search by setting the `semantic_search` parameter to `true`.

Example:
```
curl -X 'POST'
'http://localhost:8000/ask_question/'
-H 'accept: application/json'
-H 'Content-Type: application/json'
-d '{
"question": "What is the total amount?",
"semantic_search": true
}'
```

## Configuration

The configuration for the service is stored in `config.yml`. You can modify this file to adjust various parameters such as data paths, model settings, and more.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out to the maintainers for any questions or support related to the Invoice Data Service. Happy coding! 🚀






