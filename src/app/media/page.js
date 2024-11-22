// Page.jsx
'use client';

import React, { useEffect, useRef } from 'react';
import throttle from 'lodash.throttle';
import { Box, Link, Typography } from '@mui/material';
import { Stack } from 'react-bootstrap';
import Videos from '../components/Videos/Videos';
import Photos from '../components/Photos/Photos';
import ParallaxImage from '../components/ParallaxImage/ParallaxImage';

export default function Page() {
  const parallaxRef = useRef(null);
  const animationFrame = useRef(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      animationFrame.current = requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset;
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
      });
    }, 16); // Approximately 60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel(); // Cancel any pending throttled calls
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div className='videos-container'>
      {/* Parallax Image Section */}
      <ParallaxImage
        src="https://d1o0ev2mj1bytm.cloudfront.net/images/media.jpg"
        height="500px"
        objectPosition="10%"
        speed={0.5} // Adjust the speed as needed
        alt="Jourdain Fisher performing on stage"
      />
      <Videos />
      <Photos />
    </div>
  );
}
