'use client';

import { useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import TextField from '@mui/material/TextField';
import { AboutContext } from '@/context/AboutContext';
import { ManagementContext } from '@/context/ManagementContext';
import { Typography } from '@mui/material';

export default function Page() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [aboutContent, setAboutContent] = useState('');
  const fileInputRef = useRef(null);


  const { aboutText } = useContext(AboutContext);
  const {
    managementContent,
    setManagementContent,
    updateManagementContent,
    loading: managementLoading,
    error: managementError,
  } = useContext(ManagementContext);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      setIsAuthenticated(false);
      router.push('/admin');
    } else if (isAdmin === 'true') {
      setAboutContent(aboutText);
      setIsAuthenticated(true);
    }
  }, [router, aboutText]);

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

  const saveAboutText = async () => {
    console.log({ aboutContent });
    try {
      const res = await fetch('https://api.jourdainfisher.com/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: aboutContent }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      console.log('About content saved:', data);
    } catch (error) {
      console.error('Error saving about content:', error);
    }
  }

  const saveManagementText = async () => {
    console.log({ managementContent });
    try {
      const response = await updateManagementContent(managementContent);
      if (response.success) {
        setAlertText(response.message);
        setUploadSuccess(true);
        setUploadFailed(false);
      } else {
        setAlertText(response.message);
        setUploadFailed(true);
        setUploadSuccess(false);
      }
    } catch (error) {
      console.error('Error saving management content:', error);
      setAlertText('Error saving management content.');
      setUploadFailed(true);
    }
  };

  // Function to handle input changes for management
  const handleManagementChange = (managementType, field, value) => {
    setManagementContent((prev) => ({
      ...prev,
      [managementType]: {
        ...prev[managementType],
        [field]: value,
      },
    }));
  };

  return (
    isAuthenticated ? (
      <div className="container mt-5 d-flex flex-col gap-4 dashboard">
        <h1 className="display-1 text-center ">Admin Dashboard</h1>
        <Form onSubmit={uploadVideo} className='mt-5'>
          <Form.Group className="mb-3" controlId="youtubeLink">
            <Form.Label >Youtube Link</Form.Label>
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
          <Form.Label >Select Photos to Upload (10 MB Limit)</Form.Label>
          <Form.Control
            type="file"
            multiple  // Allow multiple file selection
            onChange={uploadPhotos}  // Handle file uploads when selected
            ref={fileInputRef}
          />
        </Form.Group>

        {isUploading && (
          <div className="mt-3 ">
            <Spinner animation="border" role="status">
              <span className="sr-only">Uploading...</span>
            </Spinner>
            <p>Uploading photos...</p>
          </div>
        )}

        {aboutContent && (
          <>
            <Typography variant="h3" className="">About</Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={10}
              value={aboutContent}
              onChange={(e) => setAboutContent(e.target.value)}
            />
            <Button
              variant="primary"
              className="mt-3 align-self-baseline"
              onClick={() => saveAboutText()}
            >Save About</Button>
          </>
        )}

        {managementLoading ? (
          <div className="mt-3  d-flex align-items-center">
            <Spinner animation="border" role="status" className="me-2">
              <span className="sr-only">Loading...</span>
            </Spinner>
            <p>Loading Management Content...</p>
          </div>
        ) : managementError ? (
          <Alert variant="danger" className="mt-3">
            {managementError}
          </Alert>
        ) : (
          Object.keys(managementContent).length > 0 && (
            <>
              <Typography variant="h3" className="">Management</Typography>
              {Object.keys(managementContent).map((managementType) => (
                <div key={managementType} className="mb-5">
                  <Typography variant="h4" className="">{managementType}</Typography>
                  <Form.Group className="mb-3" controlId={`agency-${managementType}`}>
                    <Form.Label >Agency</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Agency Name"
                      value={managementContent[managementType].agency}
                      onChange={(e) => handleManagementChange(managementType, 'agency', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId={`agent-${managementType}`}>
                    <Form.Label >Agent(s)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Agents, separated by commas"
                      value={managementContent[managementType].agent.join(', ')}
                      onChange={(e) => {
                        const agents = e.target.value.split(',').map(agent => agent.trim()).filter(agent => agent);
                        handleManagementChange(managementType, 'agent', agents);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId={`agent_contact-${managementType}`}>
                    <Form.Label >Agent Contact(s)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Agent Contacts, separated by commas"
                      value={managementContent[managementType].agent_contact.join(', ')}
                      onChange={(e) => {
                        const contacts = e.target.value.split(',').map(contact => contact.trim()).filter(contact => contact);
                        handleManagementChange(managementType, 'agent_contact', contacts);
                      }}
                    />
                  </Form.Group>
                </div>
              ))}
              <Button
                variant="primary"
                className="mb-3 align-self-baseline"
                onClick={() => saveManagementText()}
              >Save Management</Button>
            </>
          )
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
    ) :
      (
        <Typography variant="h3" className="">Checking authorization...</Typography>
      )
  );
}