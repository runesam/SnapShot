import React, { useEffect, useState } from 'react';

import Image from './Image';
import NoImages from './NoImages';
import { MapComponent } from './Map.component';

const Gallery = props => {
    const [showLocation, setShowLocation] = useState('');
    const results = props.data;

    useEffect(() => {
        window.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') setShowLocation('');
        });
        return () => {
            window.removeEventListener('keydown', () => {
                console.info('keydown event listener been removed');
            });
        };
    }, [results]);

    let images;
    let noImages;
    // map variables to each item in fetched image array and return image component
    if (results && results.length > 0) {
        images = results.map(image => {
            let farm = image.farm;
            let server = image.server;
            let id = image.id;
            let secret = image.secret;
            let title = image.title;
            let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
            return <Image url={url} id={id} key={id} alt={title} setShowLocation={setShowLocation} />;
        });
    } else {
        noImages = <NoImages />; // return 'not found' component if no images fetched
    }
    return (
        <div>
            {Boolean(showLocation) && <MapComponent photoId={showLocation} setShowLocation={setShowLocation} />}
            <ul>{images}</ul>
            {noImages}
        </div>
    );
};

export default Gallery;
