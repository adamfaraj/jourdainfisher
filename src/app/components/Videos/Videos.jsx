import React from 'react';

import './Videos.css';

export default function Videos() {
    const videos = [
        {
            id: 1,
            title: 'Jourdain Fisher Standup on Jimmy Fallon',
            url: 'https://www.youtube.com/embed/Anm8cU7ZR8g'
        },
        {
            id: 2,
            title: 'Jourdain Fisher Standup on Comedy Central Stand Up',
            url: 'https://www.youtube.com/embed/pD57sQ0X6QY'
        },
        // {
        //     id: 3,
        //     title: 'Jourdain Fisher 2017 Finalist StandUp NBC',
        //     url: 'https://www.youtube.com/embed/cefXlJrz7c4'
        // }
    ]
        return (
            <div id="videos">
                <h1 className="display-1 text-center text-white">Videos</h1>
                {videos.map((video, i) => {
                    return (
                        <div key={i} className="videos__wrapper mt-3">
                            <div className="videos__video">
                                <iframe title={video.title} width="100%" height="100%" src={video.url} allowFullScreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                            </div>
                        </div>
                    );
                })}

                {/* <div className="videos__wrapper">
                    <div className="videos__video">
                        <iframe title="Jourdain Fisher Standup on Jimmy Fallon" width="100%" height="100%" src="https://www.youtube.com/embed/Anm8cU7ZR8g" allowFullScreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                    </div>
                </div>
                <div className="videos__wrapper">
                    <div className="videos__video">
                        <iframe title="Jourdain Fisher Standup on Comedy Central Stand Up" width="100%" height="100%" src="https://www.youtube.com/embed/pD57sQ0X6QY" allowFullScreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                    </div>
                </div>
                <div className="videos__wrapper">
                    <div className="videos__video">
                        <iframe title="Jourdain Fisher 2017 Finalist StandUp NBC" width="100%" height="100%" src="https://www.youtube.com/embed/cefXlJrz7c4" allowFullScreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                    </div>
                </div> */}
            </div>
        )
    }