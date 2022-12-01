import React, { useEffect, useState } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData } from './api';
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { Place } from '@material-ui/icons';



function App() {
    // usestates of places, coordinates and bounds, places we get from data, coordinates and bounds we use as props and set in the map
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [childClicked, setchildClicked] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [filteredPlaces, setFilteredPlaces] = useState([])
    // This hook is being used because, in select element we need to chnage the element type according to selected value
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');



    // CODE MEAN:: get the users current location from geolocation in chrome and this useffect runs once, has no boundaries 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
        // setCoordinates({lat:22.5726, lng:88.3639});
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating)
        setFilteredPlaces(filteredPlaces);
    }, [rating])


    // CODE MEAN:: It says first get the data fom the api that passes the bounds parameter, and then set the places from the data according to the bounds. it takes dependencies, which means it change when updated 
    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true);
            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                    setFilteredPlaces([]);
                    setIsLoading(false);
                })
        }
    }, [type, coordinates, bounds])
    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={4}>
                    <List places={filteredPlaces.length ? filteredPlaces : places} childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        // passing the usestates above as props to the map component
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setchildClicked={setchildClicked}
                    />
                </Grid>
            </Grid>

        </>
    )
}

export default App
