import React from 'react';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';


import './Main.css';
// import Spotify from '../Spotify/Spotify';

export default function Main() {
        return (
            <div className="home__wrapper" id="home">
                {/* <Spotify /> */}
                <Stack gap={3} className='p-5 col-3'>
                    <Link href="https://punchup.live/jourdainfisher" target='_blank' className='p-8'>
                        Tour
                    </Link>
                    <Link href="/media" className='p-8'>
                        Media
                    </Link>
                    <Link href="/about" className='p-8'>
                        About
                    </Link>
                </Stack>
            </div>
        )
    }
