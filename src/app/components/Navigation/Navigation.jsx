'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa6";


import './Navigation.css';

export default function Navigation() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // If it's at the top of the page, always show the navbar
        if (currentScrollY <= 0) {
          setShow(true);
        } else if (currentScrollY > lastScrollY) {
          // If scrolling down, hide the navbar
          setShow(false);
        } else {
          // If scrolling up, show the navbar
          setShow(true);
        }

        // Update the last scroll position
        setLastScrollY(currentScrollY);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function to remove the event listener
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const toSection = (section) => {
    const sectionId = document.getElementById(section);
    sectionId.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page smoothly
  };

  const navList = [
    { name: 'Tour', id: 'shows' },
    { name: 'Media', id: 'media' },
    // { name: 'Photos', id: 'photos' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ]

  const socialMedia = [
    { name: 'Instagram', url: 'https://www.instagram.com/jourdainfisher/', icon: <FaInstagram />},
    { name: 'TikTok', url: 'https://www.tiktok.com/@jfishercomedy', icon: <FaTiktok />},
    { name: 'Twitter', url: 'https://twitter.com/jfishercomedy?lang=en', icon: <FaXTwitter /> },
    { name: 'Facebook', url: 'https://www.facebook.com/Jfishercomedy/', icon: <FaFacebookF />},
    { name: 'YouTube', url: 'https://www.youtube.com/@JourdainFisherComedy', icon: <FaYoutube /> },
    { name: 'Spotify', url: 'https://open.spotify.com/artist/6YjEfAXX2eUrwF3TGrsHiX', icon: <FaSpotify /> },
  ]

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" style={{ transition: 'top 0.3s', top: show ? '0' : '-65px' }}>
      <Container>
        <Navbar.Brand
          // onClick={scrollToTop}
        >
          <Link href="/">
            Jourdain Fisher
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
              {navList.map((navItem, i) => {
                return (
                  <Nav.Link key={i} className="small text-nowrap" eventKey={i} href="" onClick={toSection.bind(this, navItem.id)}>
                    {navItem.name}
                  </Nav.Link>
                );
              })}
          </Nav>
          <Nav className='d-flex flex-row gap-3 navbar-nav'>
            {socialMedia.map((social, i) => {
              return (
                  <Nav.Link key={i} className="" href={social.url} target="_blank">
                    {social.icon}
                  </Nav.Link>
              )
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};
