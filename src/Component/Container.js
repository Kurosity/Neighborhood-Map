import React, { Component } from 'react'
import ReactDOM from 'react-dom'


class Container extends Component{
    state = {
        google: this.props.google,
        locations: this.props.locations,
        fMarkets: this.props.fLocation,
        markers: [],
        infoWindow: new this.props.google.maps.InfoWindow(),
        mMarket: this.props.mMarket
    }
   
    /*
    * Once something updates (search query), reload the map
    * Reset the marker
    */
    componentDidUpdate = = (prevProps) =>{
        if(this.props.fLocation !== prevProps.fLocation){

            this.setState((state) => ({
                markers: []
            }))

            this.loadMap()
        }
    }

    fMarkets = this.props.fLocation

    //Once the map loads all the markers using the configuration in mConfig
    loadMap(){

        if(this.props && this.props.google){
            let {google} = this.props
            let maps = google.maps
            let mapRef = ReactDOM.findDOMNode(this.refs.map)

            let mConfig = Object.assign({}, {
                center: {       
                    lat: this.props.lat,
                    lng: this.props.lng 
                },
                zoom: this.props.zoom,
                mTypeID: 'mMap'
            })

            this.map = new maps.Map(mapRef, mConfig)
            this.addMarkers()
        }
    }

    componentDidMount(){
        this.loadMap()
    }

    /*
    * Add marker to each farmer market location. Animate the marker on load
    * Add event listener to display InfoWindow once the marker has been clicked
    * The map will zoom in based on the position of the markers (mbounds.extends)
    */

    addMarkers =() => {
        let {google} = this.props
        let mbounds = new google.maps.LatLngBounds()
        let infoWindow = this.state.infoWindow
        let mLocations = this.props.fLocation
        let animation = this.props.google.maps.Animation.DROP
        let testMark = []

        mLocations.forEach( location => {
            let mMarker = new google.maps.Marker({
                position: {
                    lat: location.venue.location.lat, 
                    lng: location.venue.location.lng},
                map: this.map,
                title: location.venue.name,
                category: location.venue.categories[0].name,
                city: location.venue.location.city,
                animation
            })

            mMarker.addListener('click', ()=>{
                this.populateInfoWindow(mMarker, infoWindow)
                })
            
            this.setState((state) => ({                
                markers: state.markers.concat(mMarker)                
            }))

            testMark.push(mMarker)
            
            mbounds.extend(mMarker.position)
        })   
   
        this.map.fitBounds(mbounds)
        this.props.mMarkers(testMark)
    }

    /*
    * Capitalize first letter in name.
    * Courtesy of Stackoverflow: https://stackoverflow.com/questions/48387180/is-it-possible-to-capitalize-first-letter-of-text-string-in-react-native-how-to
    */
    
    capitalize(name){
        return name.charAt(0).toUpperCase() + name.slice(1)
    }
    
    /*
    * Function to populate InfoWindow 
    * Click the X to close the window
    */
    populateInfoWindow = (marker, infoWindow) => {
        
      if(infoWindow.marker !== marker){
        this.setState(infoWindow.marker = marker)
        infoWindow.setContent(`
        <div>   
            <h3 style='margin-bottom:0'>${this.capitalize(marker.title)}</h3>
        </div>
        <div>
            <ul style='list-style-type:none; display:inline'>
                <li>${marker.category}</li>
                <li>${marker.city}</li>
            </ul>
        </div>
        `)
        infoWindow.open(this.map, marker)
        infoWindow.addListener('close', () => {
            infoWindow.marker = null
        })
    }

    style = {
        width: '100vw',
        height: '100vh',
        position: 'relative',
    }

    render(){
  
        return(
        <div>
            <div 
                role='application' 
                style={this.style} 
                className='marMap' 
                ref='map'>
            </div>
        </div>
        )
    }
}


export default Container
