'use client';

import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaSpotify } from "react-icons/fa6";

import './Spotify.css';

export default function Spotify() {
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    fetch('https://api.jourdainfisher.com/albums')
      .then(response => response.json())
      .then(data => setAlbums(data));
  }, []);

  const openSpotify = (url) => {
    window.open(url, '_blank');
  }

  return (
    <div className="albums-container">
      {albums !== null ? (
        albums.map(album => (
          <Card key={album.id} style={{ width: '12rem' }}>
            <Card.Img variant="top" src={album.images[0].url} />
            <Card.Body className='d-flex justify-content-center'>
              <Button variant="dark" className="text-center align-items-center btn btn-dark d-flex gap-2 text-center" onClick={() => openSpotify(album.external_urls.spotify)}>
                Listen Now
                <FaSpotify style={{ color: '#1cd760' }} />
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <></>
      )}
    </div>
  )
}
