'use client';

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';


export default function Page() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}