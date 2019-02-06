import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react'

class Container extends Component {
    state = {
        locations: this.props.locations,
        mStyle: this.props.style,
        zoom: this.props.zoom,
        lat: this.props.lat,
        lng: this.props.lng,
        //toggle: this.props.toggleWindow    
    }

    fLocations = this.props.fLocations
    toggle = this.props.toggleWindow
    open= this.props.open

    style = {
        width: '100vw',
        height: '100vh',
        position: 'relative',
    }

    render(){
        console.log(this.state.open)
        let mMarkets
        if(this.fLocations === null){
            mMarkets = this.state.locations
        }
        else{
            mMarkets = this.fLocations
        }

        return(
            <Map 
                google={this.props.google} 
                zoom={this.state.zoom}
                initialCenter={{
                    lat: this.state.lat,
                    lng: this.state.lng
                    }}
                aria-label='map'
                style={this.state.mStyle}
            >
            {mMarkets.map((market) => {
                return(
                    <Marker
                        key={market.name}
                        name={market.name}
                        position={market.pos} 
                        animation={this.props.google.maps.Animation.DROP}
                        onClick={this.props.toggleWindow}
                     >
                     {this.open &&
                        (<InfoWindow
                            onCloseClick={this.props.toggleWindow}
                        >
                            <div>   
                                <h3>${market.name}</h3>
                            </div>
                            <div>
                                <ul>
                                    <li>${market.street}</li>
                                    <li>${market.city}</li>
                                    <li><a href="market.link">More Information</a></li> //fix href link
                                </ul>
                            </div>
                        </InfoWindow>)
                     }
                     </Marker>   
                )
            })}

            </Map> 
        )
    }
}

export default GoogleApiWrapper({
    apiKey:'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(Container)
