// new-react-frontend/src/components/DataImport.jsx
import React, { useState } from 'react';

function DataImport() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [importType, setImportType] = useState('skill'); // NEW

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/import/?type=${importType}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`✅ File uploaded successfully! Created: ${result.created}, Updated: ${result.updated}`);
      } else {
        setMessage('❌ Upload failed: ' + (result.error || result.detail || 'Unknown error'));
      }
    } catch (error) {
      setMessage('❌ Upload error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Data Import</h2>
      <form onSubmit={handleSubmit}>
        <select value={importType} onChange={(e) => setImportType(e.target.value)}>
          <option value="skill">Skill</option>
          <option value="profile">Profile</option>
        </select>

        <input type="file" accept=".json,.csv" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DataImport;
