import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Map from './Map';

class App extends Component {
    constructor() {
        super();
        this.state = {
            foundLocations: [],
            markers: [],
        };

        this.searchLocations = this.searchLocations.bind(this);
        this.setMarkers = this.setMarkers.bind(this);
        this.setFoundLocations = this.setFoundLocations.bind(this);
    }

    componentWillMount() {
        this.searchLocations();
    }

    setMarkers(markers) {
        this.setState(prevState => ({
            markers: [prevState.markers, ...markers],
        }));
    }

    setFoundLocations(locations) {
        this.setState(prevState => ({
            markers: [prevState.foundLocations, ...locations],
        }));
    }

    searchLocations(address = '') {
        axios.get(`http://localhost:3001/locations/${address}`)
            .then((response) => {
                const { locations } = response.data;
                if (address !== '') {
                    this.setMarkers(locations);
                } else {
                    this.setFoundLocations(locations);
                }
            })
            .catch((error) => { console.log(error); });
    }

    render() {
        const { foundLocations, markers } = this.state;
        return (
            <div>
                <Header
                    searchLocation={this.searchLocations}
                    foundLocations={foundLocations}
                    setMarkers={this.setMarkers}
                />
                <Map markers={markers} />
            </div>
        );
    }
}
export default App;
