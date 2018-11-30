import React, { Component } from 'react'
import {Map, GoogleApiWrapper, InfoWindow} from 'google-maps-react'

class Display extends Component{
    state = {
        map: null,

        markers:[],
        markerProps:[],
        activeMarker:null,
        activeMarkerProps:null,
        showInfo: false
    }

    mapReady = (props,map) => {
        this.setState({map}, () => 
        this.updateMarker(this.props.locations))
    }

    style = {
        width: '100vw',
        height: '100vh',
        position: 'relative',
    }

    center = {
        lat: this.props.lat,
        lng: this.props.lngt
    }

    componentDidMount = () => {}

    closeInfoWindow = () => {
        this.state.activeMarker && this.state.activeMarker.setAnimation(null)
        this.setState({
            showingInfoWindow: false,
            activeMarker: null,
            activeMarkerProps: null
        })
    }

    onMarkerClick = (props, marker) => {
        this.closeInfoWindow()

        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            activeMarkerProps: props
        })
    }

    updateMarker = (loc) =>{    
        if(!loc){
            return
        }
        
        this.state.markers.forEach(marker => marker.setMap(null));

        let markerProps = [];
        let markers = loc.map((location, index) => {
            let markerProp = {
                key: index,
                index,
                name: location.name,
                position: location.pos,
                url: location.url
            }
            markerProps.push(markerProp)

            let animation = this.props.google.maps.Animation.DROP;
            let marker = new this.props.google.maps.Marker({
                position: location.pos, 
                map: this.state.map, 
                animation
            })
            marker.addListener('click', () => {
                this.onMarkerClick(markerProp, marker, null);
            })

            return marker
        })

        this.setState({markers, markerProps});            
    }

    render(){
        // console.log(this.state.activeMarker)
        console.log(this.state.markers)
        // console.log(this.props.locations)
        let actProps = this.state.activeMarkerProps

        return(
            <Map
                zoom={this.props.zoom}
                style={this.style}
                initialCenter={this.center}
                google={this.props.google}
                aria-label='map'
                role='application'
                onReady={this.mapReady}
                className="marketMap"
                onClick={this.closeInfoWindow}
                >
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.closeInfoWindow}
                >
                    <div>
                        <h2>{actProps && actProps.name}</h2>
                        {(actProps && actProps.url)?(
                            <a href={actProps.url}>More Market Info</a>
                        ):""}
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey:'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(Display)
