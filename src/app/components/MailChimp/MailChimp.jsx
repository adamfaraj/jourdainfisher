'use client';

import React, { useState } from 'react'
import jsonp from 'jsonp'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'

import './MailChimp.css'

export default function MailChimp() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log(form.checkValidity())
    console.log({ form })
    const email = form['email'].value
    const url = "https://Jourdainfisher.us11.list-manage.com/subscribe/post?u=101604789e5bf6689e8d0b470&amp;id=187b651bb8&amp;f_id=0024a5e0f0";
    if (form.checkValidity() === true) {
      jsonp(`${url}&EMAIL=${email}`, { param: 'c' }, (_, data) => {
        const { msg, result } = data
        // do something with response
        console.log({ msg, result });
      });
      form.reset();
      form.classList.remove('was-validated');
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label className="mailchimp-label">
          Join my mailing list to know when I'm coming to your city!
        </Form.Label>
        <Row className='d-flex justify-content-center'>
          <Col sm={12} md={6} className="mb-md-0 mb-xs-3">
            <Form.Control type="email" placeholder="Enter email" className='h-100 mc-input' required/>
          </Col>
          <Col sm={12} md={4}>
            <Button type="submit" className="w-100 mc-button">JOIN!</Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  )
}
