// Page.jsx
'use client';

import React, { useEffect, useRef } from 'react';
import throttle from 'lodash.throttle';
import { Box, Link, Typography } from '@mui/material';
import { Stack } from 'react-bootstrap';
import Contact from '../components/Contact/Contact';
import EmailListButton from '../components/EmailListButton/EmailListButton';
import ParallaxImage from '../components/ParallaxImage/ParallaxImage';

export default function Page() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollTop * 0.5}px)`;
      }
    }, 16); // Approximately 60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel(); // Cancel any pending throttled calls
    };
  }, []);

  return (
    <div className='contact-container'>
      {/* Parallax Image Section */}
      <ParallaxImage
        src="https://d1o0ev2mj1bytm.cloudfront.net/images/contact.png"
        height="425px"
        objectPosition="top"
        speed={0.5} // Adjust the speed as needed
        alt="Jourdain Fisher performing on stage"
      />
      {/* <div className="parallax-section">
        <img
          ref={parallaxRef}
          src="https://d1o0ev2mj1bytm.cloudfront.net/images/contact.png"
          alt="Jourdain Fisher"
          className="parallax-image"
        />
      </div> */}
      <Contact />
    </div>
  )}