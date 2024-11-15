'use client';

import Link from 'next/link';
import React from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { FaInstagram, FaTiktok, FaXTwitter, FaFacebookF, FaYoutube, FaSpotify } from "react-icons/fa6";
import { usePathname } from 'next/navigation';


import './Navigation.css';

export default function Navigation() {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');
  const navList = [
    { name: 'Tour', href: 'https://punchup.live/jourdainfisher' },
    { name: 'Media', href: '/media' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
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
    <Navbar collapseOnSelect expand="lg" className={isAdmin ? 'admin-nav' : ''}>
      <Container>
        <Navbar.Brand>
          <Link href="/">
            Jourdain Fisher
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              <Link href="/">
                Jourdain Fisher
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {navList.map((navItem, i) => (
                <Nav.Link
                  key={i}
                  as={Link}
                  href={navItem.href}
                  target={navItem.name === "Tour" ? '_blank' : '_self'}
                  className="text-uppercase"
                >
                  {navItem.name}
                </Nav.Link>
              ))}
            </Nav>
            <hr />
            <Nav className="d-flex flex-row gap-3 align-items-center">
              {socialMedia.map((social, i) => (
                <Nav.Link key={i} href={social.url} target="_blank" aria-label={social.name}>
                  {social.icon}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
};
