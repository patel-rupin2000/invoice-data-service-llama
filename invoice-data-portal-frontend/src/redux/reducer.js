const initialState = {
  isLoading: false,
  uploadError: null,
  fileUploaded: false,
  questionAsked: false,
  isLoadingQuestion: false,
  questionError: null,
  answer: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_FILE_START':
      return {
        ...state,
        isLoading: true,
        uploadError: null,
      };
    case 'UPLOAD_FILE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        uploadError: null,
        fileUploaded: true,
      };
    case 'UPLOAD_FILE_FAILURE':
      return {
        ...state,
        isLoading: false,
        uploadError: action.error,
      };
    case 'ASK_QUESTION_START':
      return {
        ...state,
        isLoadingQuestion: true,
        questionError: null,
      };
    case 'ASK_QUESTION_SUCCESS':
      console.log('Updating answer state:', action.payload);
      return {
        ...state,
        isLoadingQuestion: false,
        questionError: null,
        questionAsked: true,
        answer: action.payload,
      };
    case 'ASK_QUESTION_FAILURE':
      return {
        ...state,
        isLoadingQuestion: false,
        questionError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
