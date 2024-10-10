'use client';

import React, { useEffect, useRef } from 'react';
import Videos from '../components/Videos/Videos';
import Photos from '../components/Photos/Photos';

export default function Page() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollTop * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className='videos-container'>
      <div className="parallax-wrapper">
        <img
          ref={parallaxRef}
          src="https://d1o0ev2mj1bytm.cloudfront.net/images/media.jpg"
          alt="Jourdain Fisher"
          className="parallax-image"
        />
      </div>
      <Videos />
      <Photos />
    </div>
  )
}