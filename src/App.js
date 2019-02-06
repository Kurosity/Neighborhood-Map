import React, { Component } from 'react'
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import markets from './data/markets'
import Container from './Components/Container'

// ...

export class App extends Component {

    state = {
        lat: 36.8529,
        lng: -75.9780, 
        zoom: 12,
        locations: markets,
        openDrawer: false,
        fLocations: markets,
        // infoWindow: new this.props.google.maps.InfoWindow(),
        // markers: []
        open: false
      }
    
    //Styles for map and the menu button
    styles = {
        button:{
            marginLeft: 10,
            marginRight: 20,
            position: "absolute",
            left: 10,
            top: 20,
            background: 'black',
            padding: 10
        },

        map:{
            width: '100vw',
            height: '100vh',
            position: 'relative',
        }
    }

    //Toggle menu open and close
    toggle = () => {
        this.setState({ openDrawer: !this.state.openDrawer})
      }
    
    //Toggle the InfoWindow
    toggleInfoWindow = () => {
        this.setstate({ open: !this.state.open })
    }
    
    clickMarker = () => {

    }

    render() {
        return (
        <div className="App" role='application'>
        <div>
            <button onClick={this.toggle} style={this.styles.button}>
            <i className='menuButton'></i>
            </button>
            <p>
            My Neighborhod Map
            </p>
        </div>

            <Container 
                lat={this.state.lat}
                lng={this.state.lng}
                zoom={this.state.zoom}
                locations={this.state.locations}
                fLocations={this.state.fLocations}
                google={this.props.google}
                style={this.styles.map}
                open={this.state.open}
                toggleWindow={this.toggleInfoWindow}
            />
          </div>
        );
      }
}

export default App
