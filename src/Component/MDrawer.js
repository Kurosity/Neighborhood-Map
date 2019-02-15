import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import {withStyles} from '@material-ui/core/styles'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'

//Courtesy of Customized Expansion Panels section of https://material-ui.com/demos/expansion-panels/
let ExpansionPanel = withStyles({
    root: {
      border: '1px solid rgba(0,0,0,.125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
    },
    expanded: {
      margin: 'auto',
    },
  })(MuiExpansionPanel);
  
  let ExpansionPanelSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0,0,0,.03)',
      borderBottom: '1px solid rgba(0,0,0,.125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(props => <MuiExpansionPanelSummary {...props} />);
  
  ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';
  
  let ExpansionPanelDetails = withStyles(theme => ({
    root: {
      padding: theme.spacing.unit * 2,
      display:'flex', 
      flexDirection:'column',
    },
  }))(MuiExpansionPanelDetails);


class MapDrawer extends Component{
    state = {
        open: false,
        query: '',
        expanded: ''
    }

    //Displays the Expansion Details of the selected Expansion Panel Summary
    handleChange = (event, expanded, name) => {
        if(expanded === this.state.expanded){
            this.setState({
                ...this.state,
                expanded: ''
            })
        }
        else{
            this.setState({
                ...this.state,
                expanded: expanded
            })
            
            this.props.menuClick(name)
        }
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
            color: "black",
            padding: "15px"
        },
        searchInput: {
            border: "1px solid gray",
            padding: "3px",
            margin: "30px 0px 10px",
            width: "100%"
        }
    }

    //Capitalize the first letter in the title
    capitalize(name){
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    render(){
        
        let {expanded} = this.state;
        
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
                     
                        {this.props.locations && this.props.locations.map((market, index) => {
                            return (
                                <ExpansionPanel
                                    square
                                    key={index}
                                    expanded={expanded === ('panel'+index)}
                                    onChange={event => this.handleChange(event, ('panel'+index), market.venue.name)}
                                >
                                <ExpansionPanelSummary>
                                    <Typography>{this.capitalize(market.venue.name)}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography component='p' align='center' variant='body2'>{this.capitalize(market.venue.name)}</Typography>
                                    <Typography component='p' align='center'>
                                        {market.venue.location.city}, {market.venue.location.state}
                                    </Typography>
                                </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                        })}
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default MapDrawer
