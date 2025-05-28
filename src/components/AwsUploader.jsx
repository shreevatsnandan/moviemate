'use client';

import { useState } from 'react';

export default function AwsUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/aws_upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      setUploadResult(result);
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">AWS S3 File Upload</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Select File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0])}
            className="w-full p-2 border rounded"
            disabled={uploading}
          />
        </div>
        
        <button
          type="submit"
          disabled={uploading}
          className={`px-4 py-2 rounded text-white ${
            uploading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload to S3'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {uploadResult && (
        <div className="mt-4 p-4 bg-green-50 rounded">
          <h3 className="font-bold">Upload Successful!</h3>
          <p>File URL: <a href={uploadResult.fileUrl} target="_blank" rel="noopener" className="text-blue-500 underline">
            {uploadResult.fileName}
          </a></p>
          <p>Size: {(uploadResult.fileSize / 1024).toFixed(2)} KB</p>
          <p>Type: {uploadResult.fileType}</p>
        </div>
      )}
    </div>
  );
}