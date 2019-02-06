import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react'
import './App.css';
import Container from './Component/Container'
import markets from './data/markets'
import Drawer from './Component/MDrawer'

class App extends Component {
  state = {
    lat: 36.8529,
    lng: -75.9780, 
    zoom: 11.5,
    locations: markets,
    openDrawer: false,
    fLocations: null
  }

// 1st attempt to display InfoWindow from menu
    menuSelect = (mName) => {
    let {infoWindow} = this.state
    let mSData = this.locations.filter(market => 
     market.name.toLowerCase().includes(mName.toLowerCase()))
    
    this.populateInfoWindow=(mSData, infoWindow)
   } 

 //Function to display InfoWindow
    populateInfoWindow = (marker, infoWindow) => {
      // console.log(marker.title)
      if(this.state.marker !== marker){
        this.setState(infoWindow.marker = marker)
          this.state.setContent(`
          <div>   
              <h3>${marker.title}</h3>
          </div>
          <div>
              <ul style='list-style-type:none'>
                  <li>${marker.address}</li>
                  <li>${marker.city}</li>
                  <li><a href='${marker.link}'>More Information</a></li>
              </ul>
          </div>
          `)
          infoWindow.open(this.map, marker)
          infoWindow.addListener('closeclick', function(){
              infoWindow.marker = null
          })
      }
    }

  componentDidMount = () => {
    // Mount the locatations
    // this.setState({
    //   ...this.state,
    //   fLocations: this.state.locations
    // })
    console.log(this.state.fLocations)
  }

  //Filter the market based on the search query
  filterMarket = (locations, query) => {
    return locations.filter(market => 
      market.name.toLowerCase().includes(query.toLowerCase()))
  }

  // Update fLocations with the filtered query (using filterMarket)
  updateMarketQuery = (query) => {
    this.setState({
      ...this.state,
      selectedIndex: null,
      fLocations: this.filterMarket(this.state.locations, query)
    })
  }

  //Open and Close the menu
  toggle = () => {
    this.setState({ openDrawer: !this.state.openDrawer})
  }

  styles = {
    button:{
      marginLeft: 10,
      marginRight: 20,
      position: "absolute",
      left: 10,
      top: 20,
      background: 'black',
      padding: 10
    }
  }

  render() {
    console.log(this.state.fLocations)
    return (
      <div className="App">
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
          fLocation={this.state.fLocations}
          google={this.props.google}/>
        <Drawer
          locations={this.state.fLocations}
          open={this.state.openDrawer}
          toggle={this.toggle}
          fLocations={this.updateMarketQuery}
        />
      </div>
    );
  }
}

 //  export default App
  export default GoogleApiWrapper({
    apiKey:'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
  })(App)
