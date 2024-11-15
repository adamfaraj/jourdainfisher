// Page.jsx
'use client';

import React, { useContext, useEffect, useState } from 'react';
import throttle from 'lodash.throttle';
import { Box, Link, Typography } from '@mui/material';
import { Stack } from 'react-bootstrap';
import ParallaxImage from '../components/ParallaxImage/ParallaxImage';
import { AboutContext } from '@/context/AboutContext';
import EmailListButton from '../components/EmailListButton/EmailListButton';

export default function Page() {
  const { aboutText } = useContext(AboutContext)
  // const [aboutText, setAboutText] = useState('');

  // useEffect(() => {
  //   const fetchAboutContent = async () => {
  //     try {
  //       const response = await fetch('https://api.jourdainfisher.com/about');

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const data = await response.json();

  //       // Parse the 'body' field which is a JSON string
  //       const parsedBody = JSON.parse(data.body);

  //       if (parsedBody.content) {
  //         setAboutText(parsedBody.content);
  //       } else if (parsedBody.message) {
  //         setError(parsedBody.message);
  //       } else {
  //         setError('Unexpected response structure.');
  //       }
  //     } catch (err) {
  //       console.error('Error fetching about content:', err);
  //       setError('Failed to load content.');
  //     } 
  //   };

  //   fetchAboutContent();
  // }, []);

  // console.log({ aboutText });

  return (
    <div className='about-container'>
      {/* Parallax Image Section */}
      <ParallaxImage
        src="https://d1o0ev2mj1bytm.cloudfront.net/images/about.jpg"
        height="500px"
        objectPosition="top"
        speed={0.5} // Adjust the speed as needed
        alt="Jourdain Fisher performing on stage"
      />
      {/* <div className="parallax-section">
        <img
          ref={parallaxRef}
          src="https://d1o0ev2mj1bytm.cloudfront.net/images/about.jpg"
          alt="Jourdain Fisher"
          className="parallax-image"
        />
      </div> */}

      {/* Text Content Section */}
      <div className="content-section">
        <Box className="about-content" sx={{ width: '100%', maxWidth: 800, margin: '0 auto', padding: '40px 20px', fontSize: '2rem' }}>
          <Typography variant="body1" gutterBottom sx={{ fontSize: '1.2rem'}}>
            {aboutText}
          </Typography>
        </Box>
        <div className='my-4'>
            <EmailListButton variant="h5" invert={true} />
        </div>
      </div>
    </div>
  )
}
