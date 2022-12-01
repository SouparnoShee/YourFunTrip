import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles'
import './Header.css'

const Header = ({setCoordinates}) => {
  // a hook coming from another component where styles are written
  const classes= useStyles();
  const [autocomplete, setAutocomplete]=useState(null)
  const onLoad = (autoc)=>{setAutocomplete(autoc)}
  const onPlaceChanged = () => {
    const lat= autocomplete.getPlace().geometry.location.lat();
    const lng= autocomplete.getPlace().geometry.location.lng();
    setCoordinates({lat,lng});
  }
  
  return (
    <div>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <Typography varient="h5" className={classes.title}>
            YourFunTrip
          </Typography>
          <Box display="flex ">
            {/* <Typography varient="h6" className={classes.title}>
              Explore New Places
            </Typography> */}
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase placeholder='Search...' classes={{root: classes.inputRoot, input: classes.inputInput}}/>
              </div>
            </Autocomplete>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header

