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
    initialCoordinates,
    initialZoom,
    selectMarker,
}) => (
    <Map
        google={google}
        zoom={initialZoom}
        className="map"
        // This are San Francisco's latitude and longitude
        center={initialCoordinates}
    >
        { markers.map(marker => (
            <Marker
                key={`marker_${marker.id}`}
                onClick={() => selectMarker(marker)}
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
    initialCoordinates: PropTypes.shape({}),
    initialZoom: PropTypes.number,
    selectMarker: PropTypes.func,
};

export default GoogleApiWrapper({
    apiKey: googleApiKey,
})(MapComponent);
