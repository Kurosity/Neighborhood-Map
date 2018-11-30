import React, { Component } from 'react'
//import logo from './logo.svg';
import './App.css'
//import {Map, GoogleApiWrapper} from 'google-maps-react'
//import Maps from './Component/Map'
// import { DirectionsRenderer } from 'react-google-maps';
// import LoadApi from './Component/LoadApi';
import Display from './Component/Display'
import markets from './data/markets.json'

class App extends Component {

  /*
  <header className="App-header">
             <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
    </header>
   */

 /* initMap = () => {
    let map = new window.google.maps.Map(
      document.getElementById('map'), 
      {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      }

    )

  }*/

  // </div>
  // <div id="map"/>
  //      </div>
// state = {
//   style : {
//     width: '100vw',
//     height: '100vh',
//     position: 'relative',
//   }
// }

  state ={
    lat: 36.8529,
    lngt: -75.9780, 
    zoom: 11.5,
    locations: markets
  }

  render() {
    return (
      <div>
        <div className="App">
          <h1>
            My Neighborhood Map
          </h1>   
      </div>
      {/* <Map google={this.props.google} 
            zoom={15}
            className={'map'}
            style={this.state.style}
            initialCenter={{
              lat: 37.0299,
              lng: 76.3452
            }}
            /> */}
            
            <Display
              lat={this.state.lat}
              lngt={this.state.lngt}
              zoom={this.state.zoom}
              locations={this.state.locations}
            />
    </div>     
    );
  };
}

export default App;
