import React from 'react';
import PropTypes from 'prop-types';
import {
    Map,
    GoogleApiWrapper,
    Marker,
} from 'google-maps-react';
import { googleApiKey } from '../../../constants/keys';

const MapComponent = ({
    google,
    markers,
}) => (
    <Map
        google={google}
        zoom={12}
        className="map"
        // This are San Francisco's latitude and longitude
        center={{
            lat: 37.7577,
            lng: -122.4376,
        }}
    >
        { markers.map(marker => (
            <Marker
                key={`marker_${marker.lat}`}
                position={{
                    lat: marker.lat,
                    lng: marker.lng,
                }}
            />
        ))}
    </Map>
);

MapComponent.propTypes = {
    google: PropTypes.shape({}),
    markers: PropTypes.arrayOf(Object),
};

export default GoogleApiWrapper({
    apiKey: googleApiKey,
})(MapComponent);
