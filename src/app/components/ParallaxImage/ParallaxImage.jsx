// ParallaxImage.jsx
import React, { useEffect, useRef } from 'react';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import './ParallaxImage.css'; // Import the CSS file for styling

const ParallaxImage = ({
  src,
  height = '500px',
  objectPosition = 'center',
  speed = 0.5,
  alt = 'Parallax Image',
}) => {
  const imageRef = useRef(null);
  const animationFrame = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Disable parallax effect
      return;
    }

    const handleScroll = throttle(() => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      animationFrame.current = requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset;
        if (imageRef.current) {
          imageRef.current.style.transform = `translateY(${scrollTop * speed}px)`;
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
  }, [speed]);

  return (
    <div
      className="parallax-container"
      style={{ height }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="parallax-image"
        style={{ objectPosition }}
        loading="lazy" // Improves performance by lazy loading the image
      />
    </div>
  );
};

ParallaxImage.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.string,
  objectPosition: PropTypes.string,
  speed: PropTypes.number,
  alt: PropTypes.string,
};

export default ParallaxImage;
