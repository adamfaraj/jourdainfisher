'use client';

import React, {useState, useEffect} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useMediaQuery } from '@mui/material';
import './Photos.css';

export default function Photos() {
    const [photos, setPhotos] = useState(null)
    const isMobile = useMediaQuery('(max-width:768px)'); // Check if screen width is <= 600px

    useEffect(() => {
        console.log('test')
        fetch('https://api.jourdainfisher.com/photos')
            .then(res => res.json())
            .then(data => {
                console.log({ data })
                setPhotos(data)
            })
    }, []);

    return (
        <div className='mt-7'>
            <h1 className="display-1 text-center">Photos</h1>
            <ImageList
                className="p-8"
                cols={isMobile ? 1 : 3}
                gap={12}
                sx={{ 
                    width: '100%',
                    maxWidth: 1200,
                    margin: '0 auto',
                }} 
            >
                {photos && photos.map((photo, i) => (
                    <ImageListItem key={i}>
                         <img
                            src={`${photo.url}?auto=format&dpr=2`}
                            alt={"Jourdain Fisher"}
                            loading="lazy"
                            style={{
                                width: '100%', 
                                height: 'auto',
                                objectFit: 'cover',
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
        )
    }
