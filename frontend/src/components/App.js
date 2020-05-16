import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Map from './Map';
import Modal from './Modal';
import { LOCAL } from '../../../constants/endpoints';

class App extends Component {
    constructor() {
        super();
        this.state = {
            foundLocations: [],
            markers: [],
            // This are San Francisco's latitude and longitude
            initialCoordinates: {
                lat: 37.7577,
                lng: -122.4376,
            },
            initialZoom: 12,
            selectedMarker: '',
        };

        this.searchLocations = this.searchLocations.bind(this);
        this.setMarkers = this.setMarkers.bind(this);
        this.setFoundLocations = this.setFoundLocations.bind(this);
        this.setNewMarker = this.setNewMarker.bind(this);
        this.selectMarker = this.selectMarker.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
    }

    componentWillMount() {
        this.searchLocations();
    }

    setMarkers(markers = []) {
        this.setState(prevState => ({
            markers: [...prevState.markers, ...markers],
        }));
    }

    setNewMarker(marker) {
        const newMarker = marker;
        const { markers } = this.state;
        newMarker.id = `marker_${markers.length}`;
        this.setState(prevState => ({
            markers: [...prevState.markers, newMarker],
            initialCoordinates: {
                lat: marker.lat,
                lng: marker.lng,
            },
            initialZoom: 18,
        }));
    }

    setFoundLocations(locations) {
        if (locations) {
            this.setState(prevState => ({
                foundLocations: [...prevState.foundLocations, ...locations],
            }));
        } else {
            this.setState({
                foundLocations: [],
            });
        }
    }

    removeMarker(markerId) {
        const { markers } = this.state;
        const filterMarkers = markers.filter(markerArr => markerArr.id !== markerId);
        this.setState({
            markers: filterMarkers,
            selectedMarker: '',
        });
    }

    selectMarker(selectedMarker = '') {
        this.setState({
            selectedMarker,
        });
    }

    searchLocations(address = '') {
        axios.get(`${LOCAL}/locations/${address}`)
            .then((response) => {
                const { locations } = response.data;
                if (address === '') {
                    this.setMarkers(locations);
                } else {
                    this.setFoundLocations(locations);
                }
            })
            .catch((error) => { console.log(error); });
    }

    render() {
        const {
            foundLocations,
            markers,
            initialCoordinates,
            initialZoom,
            selectedMarker,
        } = this.state;
        return (
            <div>
                <Header
                    searchLocation={this.searchLocations}
                    foundLocations={foundLocations}
                    setMarkers={this.setMarkers}
                    setNewMarker={this.setNewMarker}
                    setFoundLocations={this.setFoundLocations}
                />
                <Map
                    markers={markers}
                    initialCoordinates={initialCoordinates}
                    initialZoom={initialZoom}
                    selectMarker={this.selectMarker}
                />
                {
                    selectedMarker !== '' && (
                        <Modal
                            selectedMarker={selectedMarker}
                            selectMarker={this.selectMarker}
                            removeMarker={this.removeMarker}
                        />
                    )
                }
            </div>
        );
    }
}
export default App;
