import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import {Map, InfoWindow} from 'google-maps-react'


class Container extends Component{
    state = {
        google: this.props.google,
        // locations: this.props.locations,
        fMarkets: this.props.fLocation,
        markers: [],
        infoWindow: new this.props.google.maps.InfoWindow()
    }
   
    //Once something updates (search query), reload the map
    componentDidUpdate = () =>{
        // console.log(this.props.fLocation)
        this.loadMap()
    }

    // fMarkets = this.props.fLocation /*Uncomment and comment out fMarkets in state to use*/

    //Once the map loads all the markers using the configuration in mConfig
    loadMap(){
        // console.log(this.props.fLocation)
        console.log(this.props.fLocation)
        // console.log(this.state.fMarkets)
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
        let {infoWindow} = this.state
        let mLocations = this.props.fLocation
        // let mFLocations = this.fMarkets
        let animation = this.props.google.maps.Animation.DROP
        // let mLocations = null
        // console.log(this.fMarkets)
console.log(mLocations)
        // if (this.fMarkets === null){
        //     mLocations = this.state.locations
        // }
        // else{
        //     mLocations = this.fMarkets
        // }

        mLocations.forEach( location => {
            let mMarker = new google.maps.Marker({
                position: {
                    lat: location.pos.lat, 
                    lng: location.pos.lng},
                map: this.map,
                title: location.name,
                address: location.street,
                city: location.city,
                link: location.url,
                animation
                
            })
console.log(location.title)
            mMarker.addListener('click', ()=>{
                this.populateInfoWindow(mMarker, infoWindow)
                })
            // this.setState((state) => ({
            //     markers:[state.markers, mMarker]
            // }))
            mbounds.extend(mMarker.position)
        })
    

        /*
        * Display markers based on mLocations 
        * (compare if mLocations not populated/null/undefined, use unfiltered locations (locations))
        * else use the filtered locations (mLocations)
        *
        * This is possible alternative for the above code
        */
        
        //if(mLocations === null || 
        //     mLocations === undefined || 
        //     mLocations === ''
        //     ){           
        //     this.props.locations.forEach( location => {
        //         let mMarker = new google.maps.Marker({
        //             position: {
        //                 lat: location.pos.lat, 
        //                 lng: location.pos.lng},
        //             map: this.map,
        //             title: location.name,
        //             address: location.street,
        //             city: location.city,
        //             link: location.url,
        //             animation
        //         })

        //         mMarker.addListener('click', ()=>{
        //             this.populateInfoWindow(mMarker, infoWindow)
        //             })
        //         // this.setState((state) => ({
        //         //     markers:[state.markers, mMarker]
        //         // }))
        //         mbounds.extend(mMarker.position)
        //     })
        // }
        // else{
        //     mLocations.forEach( location => {
        //         let mMarker = new google.maps.Marker({
        //             position: {
        //                 lat: location.pos.lat, 
        //                 lng: location.pos.lng},
        //             map: this.map,
        //             title: mLocations.name,
        //             address: mLocations.street,
        //             city: mLocations.city,
        //             link: mLocations.url,
        //             animation                
        //         })

        //         mMarker.addListener('click', ()=>{
        //             this.populateInfoWindow(mMarker, infoWindow)
        //             })
        //         // this.setState((state) => ({
        //         //     markers:[state.markers, mMarker]
        //         // }))
        //         mbounds.extend(mMarker.position)
        //     })
        // }
        
        this.map.fitBounds(mbounds)
    }

    /*
    * Function to populate InfoWindow 
    * Once the window is clicked. the window will close
    *
    * (same code in App.js -> attemp to use from App.js for menu)
    */
    populateInfoWindow = (marker, infoWindow) => {
        // console.log(marker.title)
        if(infoWindow.marker !== marker){
            this.setState(infoWindow.marker = marker)
            infoWindow.setContent(`
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

    style = {
        width: '100vw',
        height: '100vh',
        position: 'relative',
    }

    render(){
        // let {markers} = this.state
        //  console.log(this.props.mLocations)
        // console.log(this.state.markers)
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
