'use client';

import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// import jf from '../../assets/images/IMG_3391.JPG';

import './Shows.css';

export default function Shows() {
    const [shows, setShows] = useState(null)

    useEffect(() => {
        fetch('https://api.jourdainfisher.com/tour')
            .then(res => res.json())
            .then(data => setShows(data))
    }, []);

    const buyTickets = (url) => {
        window.open(url, "_blank");
    }

    return (
        <div id="shows">
            <h1 className="text-white text-center display-1">Tour</h1>
            <Image src={jf} fluid />
            <div className="gap-2 py-5 row justify-content-center">
                {shows !== null ? (
                    shows.map((show,i) => {
                        return (
                            <Card className="col-10 col-sm-5 col-md-12" key={i}>
                                <Card.Body className="d-flex row justify-content-between align-items-baseline">
                                    <Card.Title className="date col-md-3">{show[0]}</Card.Title>
                                    <Card.Title className="city col-md-3">{show[2]}</Card.Title>
                                    <Card.Title className="venue col-md-3">{show[1]}</Card.Title>
                                    <Button variant="dark" className="tickets col" onClick={() => buyTickets(show[3])}>
                                        <Card.Link href={show[3]} target='_blank'>Tickets</Card.Link>
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })
                ) : (
                    <h4 className='fst-italic text-center text-white'>No Upcoming Tours</h4>
                )}
            </div>
        </div>
    );
}
