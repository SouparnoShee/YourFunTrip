// this file is for getting the api data through axios
import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
// const URL= "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";


// CODE MEAN:: sw and ne got from the bounds of the map
export const getPlacesData = async (type,sw, ne) =>{
    try {
        // CODE MEAN:: By this we say that, from the url get the data with resturants  according to the following lattitude and longitude, and return the data
        const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
              },
              headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
        });
        return data;

    } catch (error) {
        console.log(error);
    }
}