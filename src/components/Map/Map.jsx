import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'
import mapStyles from './mapStyles'

const Map = ({ setCoordinates, setBounds, coordinates, places, setchildClicked }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');
  


  return (
    
    <div className={classes.mapContainer}>
      {/* CODE MEAN:: In google react map, it takes the url key of the google map created  */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        // This coordinates are default of the users location, getting with the help of geolocation
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI:true, zoomControl:true, styles:mapStyles, }}
        //CODE MEAN:: onChange set the coordinates and bound according to the current map location
        onChange={(e) => {
          console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child)=>setchildClicked(child)}

      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {
              !isDesktop ? (
                <LocationOnIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://static9.depositphotos.com/1044234/1114/i/600/depositphotos_11140710-stock-photo-empty-glasses-set-in-restaurant.jpg'} alt={place.name} gutterBottom />
                    <Rating size="small" value={Number(place.rating)} readOnly/>
                </Paper>
              )
            }

          </div>
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map
