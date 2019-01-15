import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Map,
    GoogleApiWrapper,
    Marker,
    InfoWindow,
} from 'google-maps-react';

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
            selectedPlace: props,
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
                zoom={14}
                className="map"
                // This are San Francisco's latitude and longitude
                defaultCenter={{
                    lat: 37.7577,
                    lng: -122.4376,
                }}
                defaultZoom={1}
            >
                <Marker position={{ lat: 37.7760, lng: -122.4200 }} onClick={this.onMarkerClick} />
                <Marker position={{ lat: 37.7760, lng: -122.4400 }} onClick={this.onMarkerClick} />
                <InfoWindow
                    marker={activeMarker}
                    visible={showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>
                            {selectedPlace.name}
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
    apiKey: 'AIzaSyCgaWjx0Q-xv5R3BljPvtVUgyxo7_IBFFw',
})(MapComponent);
