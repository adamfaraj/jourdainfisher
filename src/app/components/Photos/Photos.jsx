'use client';

import React, {useState, useEffect} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


// import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// import jf1 from '../../assets/images/jf-5.jpg';
// import jf2 from '../../assets/images/jf-6.jpg';
// import jf3 from '../../assets/images/jf-7.jpeg';
// import jf4 from '../../assets/images/jf-4.jpg';
// import jf5 from '../../assets/images/promo-color.JPG';
// import jf6 from '../../assets/images/img_4083.JPG';
// import jf7 from '../../assets/images/img_4094.JPG';
// import jf8 from '../../assets/images/1j1a6369.JPG';
// import jf9 from '../../assets/images/img_4751.JPG';

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
            <h1 className="display-1 text-center text-white">Photos</h1>
            <ImageList className="p-8" sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {photos && photos.map((photo, i) => (
                    <ImageListItem key={i}>
                        <img
                        srcSet={`${photo.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${photo.url}?w=164&h=164&fit=crop&auto=format`}
                        alt={"Jourdain Fisher"}
                        loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
        )
    }
