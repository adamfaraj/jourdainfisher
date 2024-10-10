'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

export default function Page() {
  const router = useRouter();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [alertText, setAlertText] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/admin');
    }
  }, [router]);

  const uploadVideo = async (e) => {
    e.preventDefault();
    setUploadSuccess(false);
    setUploadFailed(false);
    setAlertText('');

    const youtubeLink = e.target.youtubeLink.value;  // Get the value of the input field
    console.log({ youtubeLink });

    try {
      const res = await fetch('https://api.jourdainfisher.com/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl: youtubeLink }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      console.log('Video uploaded:', data);
      setAlertText('Video uploaded successfully!');
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading video:', error);
      setAlertText('Error uploading video. Please try again.');
      setUploadFailed(true);
    }
  };

  const uploadPhotos = async (e) => {
    e.preventDefault();
    setUploadSuccess(false);
    setUploadFailed(false);
    setAlertText('');
    const files = e.target.files; // Get the selected files
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('photos', files[i], files[i].name);  // Append each file to FormData
    }

    setIsUploading(true); 

    try {
      const res = await fetch('https://api.jourdainfisher.com/photos', {
        method: 'POST',
        body: formData,  // Send the FormData object with the photos
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      console.log('Photos uploaded:', data);
      setAlertText('Photos uploaded successfully!');
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading photos:', error);
      setAlertText('Error uploading photos. Please try again.');
      setUploadFailed(true);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;  // Reset file input
      }
    }
  };

  return (
    <div className="container mt-28 dashboard">
      <h1 className="display-1 text-center text-white">Admin Dashboard</h1>
      <Form onSubmit={uploadVideo} className='mt-5'>
        <Form.Group className="mb-3" controlId="youtubeLink">
          <Form.Label className='text-white'>Youtube Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: https://youtu.be/Anm8cU7ZR8g or https://www.youtube.com/watch?v=Anm8cU7ZR8g" />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
        >
          Add
        </Button>
      </Form>

      <Form.Group className="mt-5">
        <Form.Label className='text-white'>Select Photos to Upload (10 MB Limit)</Form.Label>
        <Form.Control
          type="file"
          multiple  // Allow multiple file selection
          onChange={uploadPhotos}  // Handle file uploads when selected
          ref={fileInputRef}
        />
      </Form.Group>

       {isUploading && (
        <div className="mt-3 text-white">
          <Spinner animation="border" role="status">
            <span className="sr-only">Uploading...</span>
          </Spinner>
          <p>Uploading photos...</p>
        </div>
      )}


      {uploadSuccess && (
        <Alert variant="success" className="mt-3">
          {alertText}
        </Alert>
      )}


      {uploadFailed && (
        <Alert variant="danger" className="mt-3">
          {alertText}
        </Alert>
      )}
    </div>
  );
}