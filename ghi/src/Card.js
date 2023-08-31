import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import BasicRating from "./Rating";
import TripNote from "./Trip Notes/TripNote";

export default function ParkCard({ park }) {
  let randomNumber = Math.floor(Math.random() * (park.images.length - 1));

  return (
    <Card sx={{ maxWidth: 345 }} key={park.parkCode}>
      <CardHeader title={park.fullName} />
      <CardMedia
        component="img"
        height="194"
        image={park.images[randomNumber].url}
        alt={park.images[randomNumber].title}
      />
      <CardContent>
        <BasicRating rating={park.rating} parkCode={park.parkCode} />
        <Typography variant="body2" color="text.secondary">
          {park.description}
        </Typography>
      </CardContent>
      <TripNote park={park} />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
