'use client';

import React, {useState, useEffect} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Photos.css';

export default function Photos() {
    const [photos, setPhotos] = useState(null)

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
                cols={3} 
                gap={12}
                // rowHeight={164}
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
