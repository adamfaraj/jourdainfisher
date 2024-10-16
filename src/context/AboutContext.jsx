'use client';
// src/context/AboutContext.jsx

import React, { createContext, useState, useEffect } from 'react';

export const AboutContext = createContext();

export const AboutProvider = ({ children }) => {
  const [aboutText, setAboutText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch About content once when the provider mounts
    const fetchAboutContent = async () => {
      try {
        const response = await fetch('https://api.jourdainfisher.com/about');
        const data = await response.json();
        const parsedBody = JSON.parse(data.body);
        setAboutText(parsedBody.content);
      } catch (err) {
        setError('Failed to load About content.');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  return (
    <AboutContext.Provider value={{ aboutText, loading, error }}>
      {children}
    </AboutContext.Provider>
  );
};
