'use client';

import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Grid from '@mui/material/Grid2';

import './Videos.css';

export default function Videos() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.jourdainfisher.com/videos');
            const data = await response.json();
            console.log({ data })
            setVideos(data);
        }

        fetchData();
    }
    , []);

        return (
        <div>
            <h1 className="display-1 text-center mt-5">Videos</h1>
            <Grid className="mt-4 p-3">
                <Row className="justify-content-center">
                    {videos.map((video, i) => (
                        <Col key={i} xs={12} md={6} lg={6} className="mb-4">
                            <div className="player-wrapper">
                                <ReactPlayer
                                    url={video.id} // Ensure 'video.id' contains the video URL
                                    className="react-player"
                                    width="100%"
                                    height="100%"
                                    controls
                                />
                            </div>
                        </Col>
                    ))}
                </Row>
            </Grid>
        </div>
    );
    }