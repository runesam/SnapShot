import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';

import { apiKey, mapsApiKey } from '../api/config';
import marker from '../assets/map-marker-2.png';
import Loader from './Loader';

import './Map.component.css';

const InfoComponent = ({ information }) => (
    <div className="photo-marker-information">
        <pre style={{ }}>
            {JSON.stringify(information, undefined, 4)}
        </pre>
        <img width="75" src={marker} alt={information.country._content} />
    </div>
);

export const MapComponent = (props) => {
    const { photoId, setShowLocation } = props;
    const [loading, setLoading] = useState(true);
    const [geoLocation, setGeoLocation] = useState(null);

    useEffect(() => {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;
        axios
            .get(url).then(res => {
            if (res.data.stat === 'ok') {
                setLoading(false);
                setGeoLocation(res.data.photo.location);
            } else {
                alert(res.data.message);
                setShowLocation('');
                setLoading(false);
            }
        });
    }, [photoId]);

    return (
        <div className="map-component-container">
            {loading && (<Loader />)}
            {Boolean(geoLocation) && (
                <div className="map-wrapper">
                    <GoogleMapReact
                        defaultZoom={11}
                        defaultCenter={{
                            lat: parseInt(geoLocation.latitude, 10),
                            lng: parseInt(geoLocation.longitude, 10),
                        }}
                        bootstrapURLKeys={{ key: mapsApiKey }}
                    >
                        <InfoComponent
                            lat={parseInt(geoLocation.latitude, 10)}
                            lng={parseInt(geoLocation.longitude, 10)}
                            information={geoLocation}
                        />
                    </GoogleMapReact>
                </div>
            )}
        </div>
    );
};
