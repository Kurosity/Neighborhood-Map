import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'

class MapDrawer extends Component{
    state = {
        open: false,
        query: ''
    }

//Update the query based on the search bar

    updateQuery = (uQuery) => {
        this.setState({
            query: uQuery
        })
        this.props.fLocations(uQuery)
    }

    styles = {
        drawerList: {
            width: "250px",
            padding: "0px 15px 0px"
        },
        list: {
            listStyleType: "none",
            padding: 0
        },
        allMarket: {
            width: 'auto'
        },
        market: {
            marginBottom: "15px"
        },
        link: {
            background: "transparent",
            border: "none",
            color: "black"
        },
        searchInput: {
            border: "1px solid gray",
            padding: "3px",
            margin: "30px 0px 10px",
            width: "100%"
        }
    }

    render(){
        return(
            <div>
                <Drawer 
                    open={this.props.open} 
                    onClose={this.props.toggle}
                >
                    <div style={this.styles.drawerList}>
                        <input
                            name='search'
                            aria-label='Search Filter'
                            value={this.state.query}
                            style={this.styles.searchInput}
                            type='text'
                            placeholder='Search Markets'
                            onChange={change => this.updateQuery(
                                change.target.value
                            )}
                        />
                        <ul style={this.styles.list}>
                            {this.props.locations && this.props.locations.map((market, index) => {
                                return (
                                    <li 
                                        style={this.styles.market} 
                                        key={index}
                                        aria-label='Place Location'
                                    >
                                        <button 
                                            style={this.styles.link}
                                            key={index}
                                            onClick={this.props.menuSelect(market.name)}
                                        >
                                            {market.name}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default MapDrawer
