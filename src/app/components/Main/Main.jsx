import React from 'react';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';


import './Main.css';
import EmailListButton from '../EmailListButton/EmailListButton';
// import Spotify from '../Spotify/Spotify';

export default function Main() {
        return (
            <>
                <div className="home__wrapper" id="home">
                    {/* <Spotify /> */}
                    <Stack gap={3} className='p-5 col-3'>
                        <Link href="https://punchup.live/jourdainfisher" target='_blank' className='p-8' rel="noopener">
                            Tour
                        </Link>
                        <Link href="/media" className='p-8'>
                            Media
                        </Link>
                        <Link href="/about" className='p-8'>
                            About
                        </Link>
                        {/* <Link href="https://docs.google.com/forms/d/e/1FAIpQLScUZ8wyzO7khixYcMd2KKmcKHjY5ChwO_k8tqanrUahe1JgRg/viewform?pli=1" target='_blank' className='p-8'>
                            Join My Email List!
                        </Link> */}
                    </Stack>
                    <EmailListButton variant="h6" />
                </div>
            </>
        )
    }
