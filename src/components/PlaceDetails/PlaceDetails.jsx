import React from 'react'
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone'
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'

// CODE MEAN:: Nothing just passing the props from List to placedetails
const PlaceDetails = ({place, selected, refProp}) => {
  // console.log(place);
  const classes= useStyles();
  if(selected) return refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  // if(selected) {
  //   refProp?.window.open(place.website, '_blank')
  // } 
  return (
    <Card elevation={4}>
      <CardMedia
      style={{height: 350}}
      image={place.photo? place.photo.images.large.url : 'https://static9.depositphotos.com/1044234/1114/i/600/depositphotos_11140710-stock-photo-empty-glasses-set-in-restaurant.jpg'}
      title={place.name}
      />
      <CardContent>
        {/* Below the image it tells that ,the name of the place, its rating and reviews */}
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between">
        <Rating value={Number(place.rating)} readOnly/>
          <Typography gutterBottom variant="subtitle1">Out of{place.num_reviews} Reviews</Typography>
        </Box>

        {/* It shows the price level */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">{place.price_level?place.price_level:"nothing to show"}</Typography>
        </Box>

        {/* It show the ranking */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">{place.ranking?place.ranking:"Sorry no Ranking provided"}</Typography>
        </Box>

        {/* It shows the award of the restuarant got */}
        {place?.awards?.map((award)=>(
          <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant='subtitle2' color="textPrimary">{award.name}</Typography>

          </Box>
        ))}

        {place?.cuisine?.map(({name})=>(
          <Chip key={name} size="small" label={name} className={classes.chip}/>
        ))}

        {place?.address && (
          <Typography gutterBottom variant="subtitle2" color="textPrimary" className={classes.subtitle}>
            <LocationOnIcon/>{place.address}
          </Typography>
        )}

        {place?.phone && (
          <Typography gutterBottom variant="subtitle2" color="textPrimary" className={classes.spacing}>
            <PhoneIcon/>{place.phone}
          </Typography>
        )}

        <CardActions>
          <Button size='small' color='primary' onClick={()=> window.open(place.web_url, '_blank')}>
            Trip Advisor
          </Button>
          <Button size='small' color='primary' onClick={()=> window.open(place.website, '_blank')}>
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default PlaceDetails
