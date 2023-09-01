import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BasicRating from "./Rating";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import ShareIcon from "@mui/icons-material/Share";

import BasicRating from "./Rating";
import TripNote from "./Trip Notes/TripNote";

export default function ParkCard({ park }) {

  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  let randomNumber = Math.floor(Math.random() * (park.images.length - 1));

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontial">
      <Card
        sx={{
          backgroundColor: "black",
          maxWidth: "345px",
          height: "400px",
          boxShadow: "10px",
          borderRadius: "6px",
        }}
        onClick={handleClick}
      >
        <CardMedia
          component="img"
          image={park.images[randomNumber].url}
          alt={park.images[randomNumber].title}
          sx={{
            height: "350px",
          }}
        />
        <CardContent>
          <Typography
            variant="body1"
            color="white"
            align="center"
          >
            {park.fullName}
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          backgroundColor: "#dfe3ee",
          maxWidth: "345px",
          height: "400px",
          boxShadow: "10px",
          borderRadius: "6px",
        }}
        onClick={handleClick}
      >
        <CardContent sx={{ height: "350px" }}>
          <Grid
            container
            alignItems="stretch"
            justify="center"
            sx={{ maxHeight: "350px" }}
          >
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align="center"
              >
                {park.fullName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" align="center">
                {park.description}
              </Typography>
            </Grid>
            <Grid item xs={10} sx={{ mt: "15px", pl: "10px" }}>
              <BasicRating rating={park.rating} />
            </Grid>
            <Grid item xs={2}>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Grid>
            <CardActions>
              <Grid item xs={12}>
                <Button variant="body2" sx={{ color: "#2dc937" }}>
                  Learn More
                </Button>
              </Grid>
            </CardActions>
          </Grid>
        </CardContent>
      </Card>
    </ReactCardFlip>
  );
}
