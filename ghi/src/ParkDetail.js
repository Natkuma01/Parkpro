import { useState, useRef, useEffect } from "react";
import ParkCard from "./Card";
import "./parkdetail.css";
import { Grid, Link, Typography } from "@mui/material";
import CommentForm from "./comments/CommentForm";
import CommentList from "./comments/CommentList";
import TripNote from "./Trip Notes/TripNote";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function ParkDetail({ parkCode, parks }) {
  const selected_park = parks.find((park) => park.parkCode === parkCode);

  return (
    <Grid container spacing={2}>
      <Grid item className="park-name" xs={12}>
        <h1>{selected_park.fullName}</h1>
      </Grid>

      <div className="carousel-center">
        <Grid item xs={12}>
          <Carousel dynamicHeight width="75%" showArrows>
            {selected_park.images.map((image, index) => {
              return (
                <div>
                  <img src={image.url} alt={image.altText} />
                </div>
              );
            })}
          </Carousel>
        </Grid>
      </div>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={1} />
        <Grid item xs={2}>
          <h4>Description:</h4>
        </Grid>
        <Grid item xs={8}>
          <Typography>{selected_park.description}</Typography>
        </Grid>
        <Grid item xs={1} />

        <Grid item xs={1} />
        <Grid item xs={2}>
          <Typography>
            <h4>Activities:</h4>
          </Typography>
        </Grid>
        <Grid item xs={7}>
          {selected_park.activities.slice(0, 10).map((act) => (
            <Typography>{act.name}</Typography>
          ))}
        </Grid>
        <Grid item xs={2} />

        <Grid item xs={1} />
        <Grid item xs={2}>
          <h4>Addess:</h4>
        </Grid>
        <Grid item xs={8}>
          {selected_park.addresses[0].line1}
          {selected_park.addresses[0].city}
          {selected_park.addresses[0].stateCode}
        </Grid>
        <Grid item xs={1} />

        <Grid item xs={1} />
        <Grid item xs={2}>
          <h4>Url:</h4>
        </Grid>
        <Grid item xs={8}>
          <Link href="#" color="inherit">
            {selected_park.url}l
          </Link>
        </Grid>
      </Grid>
      <Grid item xs={7}>
        <CommentList />
      </Grid>
      <Grid item xs={5}>
        <h1 className="note-font">Trip Note</h1>
        <TripNote park={selected_park} />
      </Grid>
    </Grid>
  );
}

export default ParkDetail;
