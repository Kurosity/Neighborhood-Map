import React, { Component } from 'react';
import './App.css';
import Container from './Components/Container'
import markets from './data/markets'
import Drawer from './Components/MDrawer'

class App extends Component {
  state = {
    lat: 36.8529,
    lng: -75.9780, 
    zoom: 11.5,
    locations: markets,
    openDrawer: false,
    fLocations: null
  }

  componentDidMount = () => {
    this.setState({
      ...this.state,
      fLocations: this.filterMarket(this.state.locations, '')
    })
  }

  filterMarket = (locations, query) => {
    return locations.filter(market => 
      market.name.toLowerCase().includes(query.toLowerCase()))
  }

  updateMarketQuery = (query) => {
    this.setState({
      ...this.state,
      selectedIndex: null,
      fLocations: this.filterMarket(this.state.locations, query)
    })
  }

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
            <i className='TBD'></i>
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

 export default App
