'use client';

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Contact.css';

export default function Contact() {
    const [validated, setValidated] = useState(false);

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
                .then(response => response.json())
                .then(data => {
                    form.reset();
                    form.classList.remove('was-validated');
                    setValidated(false);
                    console.log('Success:', data)
                })
                .catch((error) => {
                    form.reset();
                    form.classList.remove('was-validated');
                    setValidated(false);
                    console.error('Error:', error)
                });
            
        }
        setValidated(true);
    };
    return (
        <div className="contact__wrapper" id="contact">
            <h1>
                Contact
            </h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
                <Form.Group className="mb-3" controlId="contactForm.email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="name@example.com" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactForm.firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required type="text" placeholder="John"/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a first name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactForm.lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required type="text" placeholder="Smith"/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a last name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactForm.message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control required as="textarea" rows={3} />
                    <Form.Control.Feedback type="invalid">
                        Please enter a message.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
            <div className="contact__info">
                <div>
                    <h3>Management</h3>
                    <h4>Allen McRae | Adam Segal</h4>
                    <small>Authentic Talent and Literary Management</small>
                    <p><a href="mailto:allen.mcrae@authenticm.com?cc=jourdainfisher@gmail.com">allen.mcrae@authenticm.com</a></p>
                    <p><a href="mailto:adam.segal@authenticm.com?cc=jourdainfisher@gmail.com">adam.segal@authenticm.com</a></p>
                </div>

                <div>
                    <h3>Film/TV</h3>
                    <h4>Katie Edwards</h4>
                    <small>Independent Artist Group</small>
                    <p><a href="mailto:kedwards@independentartistgroup.com?cc=jourdainfisher@gmail.com" target="_blank" rel="noopener noreferrer">kedwards@independentartistgroup.com</a></p>
                </div>

                <div>
                    <h3>Touring</h3>
                    <h4>Adam Radler</h4>
                    <small>Independent Artist Group</small>
                    <p><a href="mailto:aradler@independentartistgroup.com?cc=jourdainfisher@gmail.com" target="_blank" rel="noopener noreferrer">aradler@independentartistgroup.com</a></p>
                </div>

                <div>
                    <h3>College Agent</h3>
                    <h4>Chris Schuler</h4>
                    <small>Bass-Schuler Entertainment</small>
                    <p><a href="mailto:chris@bass-schuler.com?cc=jourdainfisher@gmail.com" target="_blank" rel="noopener noreferrer">chris@bass-schuler.com</a></p>
                </div>
            </div>
        </div>
    )
}