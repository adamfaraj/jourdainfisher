'use client';

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Form } from 'react-bootstrap';
import { Button, Typography } from '@mui/material';


export default function Page() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ e, password })

    const res = await fetch('/api/validate-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      // Store authentication state, e.g., in localStorage or cookies
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <Typography variant="h3">Admin Login</Typography>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password" className="form-label">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="btn btn-primary mt-3">
            Login
          </Button>
        </Form.Group>
      </Form>
        {error && <p className="text-danger">{error}</p>}
    </div>
  );
}