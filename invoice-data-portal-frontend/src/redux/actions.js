import axios from 'axios';

export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';
export const ASK_QUESTION_SUCCESS = 'ASK_QUESTION_SUCCESS';
export const ASK_QUESTION_FAILURE = 'ASK_QUESTION_FAILURE';

export const uploadFile = (file) => {
  return async (dispatch) => {
    dispatch({ type: 'UPLOAD_FILE_START' });
    try {
      const formData = new FormData();
      formData.append('invoice', file);
      const response = await axios.post('http://127.0.0.1:8000/upload_invoice/', formData);
      console.log('File uploaded:', response.data);
      dispatch({ type: 'UPLOAD_FILE_SUCCESS' });
    } catch (error) {
      console.error('Error uploading file:', error);
      dispatch({ type: 'UPLOAD_FILE_FAILURE', error: error.message });
    }
  };
};

export const askQuestion = (question, semanticSearch) => {
  return async (dispatch) => {
    dispatch({ type: 'ASK_QUESTION_START' }); 
    try {
      const formDataForQuestions = new FormData();
      formDataForQuestions.append('question',question);
      formDataForQuestions.append('semantic_search', semanticSearch);
      const response = await axios.post('http://127.0.0.1:8000/ask_question/', formDataForQuestions);
      console.log('Question asked:', response.data);
      dispatch({ type: 'ASK_QUESTION_SUCCESS', payload: response.data.answer });
    } catch (error) {
      console.error('Error asking question:', error);
      dispatch({ type: 'ASK_QUESTION_FAILURE', error: error.message });
    }
  };
};
