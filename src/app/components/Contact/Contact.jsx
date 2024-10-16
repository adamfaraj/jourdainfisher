// src/app/components/Contact/Contact.jsx

'use client';

import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Box, Link, Stack, Typography } from '@mui/material';
import EmailListButton from '../EmailListButton/EmailListButton';
import './Contact.css';
import { ManagementContext } from '@/context/ManagementContext';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

export default function Contact() {
    const [validated, setValidated] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const { managementContent, loading, error } = useContext(ManagementContext);
    console.log({ managementContent, loading, error });

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            // Prepare form data
            const formData = {
                email: form['contactForm.email'].value,
                firstName: form['contactForm.firstName'].value,
                lastName: form['contactForm.lastName'].value,
                message: form['contactForm.message'].value,
            };

            // Send form data to your API (AWS Lambda)
            fetch('https://api.jourdainfisher.com/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errData => {
                            throw new Error(errData.message || 'Failed to submit the form.');
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    form.reset();
                    form.classList.remove('was-validated');
                    setValidated(false);
                    setSubmitSuccess(true);
                    setSubmitError(false);
                    setSubmitMessage('Your message has been sent successfully!');
                    console.log('Success:', data);
                })
                .catch((error) => {
                    form.reset();
                    form.classList.remove('was-validated');
                    setValidated(false);
                    setSubmitSuccess(false);
                    setSubmitError(true);
                    setSubmitMessage(error.message || 'Error submitting the form.');
                    console.error('Error:', error);
                });
        }
        setValidated(true);
    };

    // Utility function to capitalize each word in a string
    const capitalize = (str) => {
        if (!str) return '';
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="contact__wrapper" id="contact">
            <div className='my-4'>
                <EmailListButton variant="h5" />
            </div>
            <Typography variant="h1">
                Contact
            </Typography>

            {/* Contact Form */}
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
                <Form.Group className="mb-3" controlId="contactForm.email">
                    <Form.Label className='text-white'>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="name@example.com" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactForm.firstName">
                    <Form.Label className='text-white'>First Name</Form.Label>
                    <Form.Control required type="text" placeholder="John" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a first name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactForm.lastName">
                    <Form.Label className='text-white'>Last Name</Form.Label>
                    <Form.Control required type="text" placeholder="Smith" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a last name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactForm.message">
                    <Form.Label className='text-white'>Message</Form.Label>
                    <Form.Control required as="textarea" rows={3} />
                    <Form.Control.Feedback type="invalid">
                        Please enter a message.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>

            {/* Submission Feedback */}
            {submitSuccess && (
                <Alert variant="success" className="mt-3">
                    {submitMessage}
                </Alert>
            )}
            {submitError && (
                <Alert variant="danger" className="mt-3">
                    {submitMessage}
                </Alert>
            )}

            {/* Management Information */}
            <div className="contact__info d-flex flex-column text-center mt-5">
                {loading ? (
                    <div className="d-flex align-items-center justify-content-center">
                        <Spinner animation="border" role="status" className="me-2">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        <Typography variant="body1">Loading Management Information...</Typography>
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="mt-3">
                        {error}
                    </Alert>
                ) : managementContent && Object.keys(managementContent).length > 0 ? (
                    Object.keys(managementContent).map((managementType) => (
                        <Box key={managementType} className="mb-5">
                            <Typography variant="h3" >{managementType}</Typography>
                            <Typography variant="h4" >
                                {managementContent[managementType].agent
                                    .map(agent => capitalize(agent))
                                    .join(' | ')}
                            </Typography>
                            <Typography variant="body1" >
                                {managementContent[managementType].agency}
                            </Typography>
                            <Stack direction="column" gap={1} className='d-flex align-items-center'>
                                {managementContent[managementType].agent_contact.map(contact => (
                                    <Link
                                        key={contact}
                                        href={`mailto:${contact}?cc=jourdainfisher@gmail.com`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        
                                    >
                                        {contact}
                                    </Link>
                                ))}
                            </Stack>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body1">
                        No management information available.
                    </Typography>
                )}
            </div>
        </div>
    );
}
