import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
import Image from 'next/image';


import './About.css';
// import logo from '../../assets/images/about.jpg';

export default function About() {
        return (
            <div className='p-3 p-sm-0 text-white' id="about">
                <h1 className='text-center display-1'>About</h1>
                <Row className="align-items-center text-white">
                    <Col lg={6}>
                        {/* <Image className="m-auto d-block" src="/src/app/assets/images/about.jpg" width={500} height={500} alt="about Jourdain" /> */}
                    </Col>
                    <Col lg={6} className="about__text">
                        <p className='lh-lg'>
                            Jourdain Fisher has got it all. He is a hilarious comedian, writer, and actor. He has performed on
                            COMEDY CENTRAL and in 2018 he made his late night TV debut on THE TONIGHT SHOW
                            STARRING JIMMY FALLON where he received a standing ovation. In fact, his performance on
                            The Tonight Show went so well that Jimmy hired him as a staff writer! He has also written for
                            VICELAND, NETFLIX and BET. He was a highlight at the prestigious Just For Laughs festival in
                            Montreal as a New Face and was a finalist at Stand Up NBC, held in Los Angeles. Jourdain has
                            also performed at festivals Laugh Your Asheville Off, Laughing Skull, and Riot Comedy Fest.
                            Jourdain has gained attention on social media platforms with numerous viral clips racking up
                            millions of views on TikTok and Instagram. His debut Comedy Album “Good For You” can be
                            found on all streaming platforms. When he is not touring he resides in New York City where he
                            is a regular at The Comedy Cellar and Gotham Comedy Club.
                        </p>
                    </Col>
                </Row>
            </div>
        )
}