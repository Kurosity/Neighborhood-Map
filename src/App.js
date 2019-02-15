import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react'
import './App.css';
import Container from './Component/Container'
import Drawer from './Component/MDrawer'
import axios from 'axios'

class App extends Component {
  state = {
    lat: 36.8508,
    lng: -76.2859, 
    zoom: 18,
    openDrawer: false,
    infoWindow: new this.props.google.maps.InfoWindow(),
    menuMarket: [],
    mMarkers: [],
    locations: [],
    fLocations: []
  }


/*
* Get Foursquare Data: Courtesy of Elharony on YouTube (Udacity | Neighborhood Map [3])
*/

  getFourSquareVenue = () => {
    let endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    let params = {
      client_id: 'MPMIPEFLMPND14GTEZY0XHML5SWAQGLVLF20RXN24NBPDOQ1',
      client_secret: 'D4RF3A33ZDYJU2UJR03YLESOJVYH3JKG5LAC4QTHXFWYXP0I',
      ll: '36.8508, -76.2859',
      query: 'farmersmarket',      
      v: '20180323'
    }

    axios.get(endPoint + new URLSearchParams(params))
      .then(resp => {
        this.setState({
          fLocations: resp.data.response.groups[0].items,
          locations: resp.data.response.groups[0].items
        })
      })
      .catch(err => {
        alert('Unable to retrieve locations.')
        console.log(err)
      })
  }
  
  //Get the filtered markers
  fMarkers = (menuMarkers) => {
    this.setState({
      ...this.state,
      selectedIndex: null,
      mMarkers: menuMarkers
    })
  }
  
  //Get the location information from Foursquare once the component mounts
  componentDidMount = () => {
    this.getFourSquareVenue()
  }

  //Filter the market based on the search query
  filterMarket = (locations, query) => {
    return locations.filter(market => 
      market.venue.name.toLowerCase().includes(query.toLowerCase()))
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
  
  //Make the marker bounce when the menu item is clicked
  menuClick = (menuName) => {
    let thisMarker = this.state.mMarkers.filter(
        mName =>
          mName.title.toLowerCase().includes(menuName.toLowerCase())
      )

    thisMarker[0].setAnimation(window.google.maps.Animation.BOUNCE)
    setTimeout(function(){thisMarker[0].setAnimation(null)}, 2500)
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
  
    return (
      <div className="App">
        <div>
          <button onClick={this.toggle} style={this.styles.button}>
            <i className='menuButton'></i>
          </button>
          <p>
            My Neighborhod Markets Map
          </p>
        </div>
        <Container 
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.locations}
          fLocation={this.state.fLocations}
          google={this.props.google}
          mMarket={this.props.menuMarket}
          mMarkers={this.fMarkers}
        />
        <Drawer
          locations={this.state.fLocations}
          open={this.state.openDrawer}
          toggle={this.toggle}
          fLocations={this.updateMarketQuery}
          menuClick={this.menuClick}
        />
      </div>
    );
  }
}

 //  export default App
  export default GoogleApiWrapper({
    apiKey:'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
  })(App)
