import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Map,
    GoogleApiWrapper,
    Marker,
    InfoWindow,
} from 'google-maps-react';
import { googleApiKey } from '../../../constants/keys';

export class MapComponent extends Component {
    constructor() {
        super();
        this.state = {
            // Hides or show info from location
            showingInfoWindow: false,
            // Shows the active marker on click
            activeMarker: {},
            // Shows the infoWindow to the selected place upon a marker
            selectedPlace: {},
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onMarkerClick(props, marker) {
        this.setState({
            selectedPlace: 'test',
            activeMarker: marker,
            showingInfoWindow: true,
        });
    }

    onClose() {
        const { showingInfoWindow } = this.state;
        if (showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            });
        }
    }

    render() {
        const { google } = this.props;
        const {
            activeMarker,
            showingInfoWindow,
            selectedPlace,
        } = this.state;

        return (
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
                <Marker position={{ lat: 37.7760, lng: -122.4200 }} onClick={this.onMarkerClick} />
                <InfoWindow
                    marker={activeMarker}
                    visible={showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>
                            {selectedPlace}
                        </h4>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

MapComponent.propTypes = {
    google: PropTypes.shape({}),
};

export default GoogleApiWrapper({
    apiKey: googleApiKey,
})(MapComponent);
