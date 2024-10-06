import React from 'react';

// import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import jf1 from '../../assets/images/jf-5.jpg';
import jf2 from '../../assets/images/jf-6.jpg';
import jf3 from '../../assets/images/jf-7.jpeg';
import jf4 from '../../assets/images/jf-4.jpg';
import jf5 from '../../assets/images/promo-color.JPG';
import jf6 from '../../assets/images/img_4083.JPG';
import jf7 from '../../assets/images/img_4094.JPG';
import jf8 from '../../assets/images/1j1a6369.JPG';
import jf9 from '../../assets/images/img_4751.JPG';

import './Photos.css';

export default function Photos() {

    const photos = [
        {
            src: jf1,
            alt: 'Jourdain Fisher'
        },
        {
            src: jf2,
            alt: 'Jourdain Fisher'
        },
        {
            src: jf3,
            alt: 'Jourdain Fisher'
        },
        {
            src: jf4,
            alt: 'Jourdain Fisher'
        },
        {
            src: jf5,
            alt: 'Jourdain Fisher'
        },
        {
            src: jf6,
            alt: 'Jourdain Fisher'
        },
        {
            src: jf7,
            alt: 'Jourdain Fisher'
        },
        {
            src: jf8,
            alt: 'Jourdain Fisher'
        },
        {
            src: jf9,
            alt: 'Jourdain Fisher'
        }

    ]

    return (
            <div className="p-5" id="photos">
                <h1 className="text-center text-white display-1">
                    Photos
                </h1>
                <div>
                    {/* <Carousel showThumbs={false} dynamicHeight={true} infiniteLoop={true} autoPlay={true}>
                        {photos.map((photo, i) => {
                            return (
                                <div key={i}>
                                    <img src={photo.src} alt={photo.alt} />
                                </div>
                            );
                        })}
                    </Carousel> */}
                </div>
            </div>
        )
    }
