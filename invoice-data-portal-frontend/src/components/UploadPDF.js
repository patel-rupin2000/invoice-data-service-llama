import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../redux/actions';
import './UploadPDF.css';

const UploadPDF = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading);
  const uploadError = useSelector(state => state.uploadError);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleProcessClick = () => {
    if (selectedFile) {
      dispatch(uploadFile(selectedFile));
    }
  };

  return (
    <div className="upload-pdf-container">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleProcessClick} disabled={isLoading || !selectedFile}>
        Process
      </button>
      {isLoading && <p>Uploading file...</p>}
      {uploadError && <p className="error-message">Error: {uploadError}</p>}
    </div>
  );
};

export default UploadPDF;
