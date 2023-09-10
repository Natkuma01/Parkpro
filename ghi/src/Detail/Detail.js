import "../parkdetail.css";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import TripNote from "../Trip Notes/TripNote";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Comments from "../comments/Comments";
import BasicRating from "../Rating";

export default function Detail({ parkCode, parks }) {
  const selected_park = parks.find((park) => park.parkCode === parkCode);
  const user = localStorage.getItem("user");
  return (
    <Container>
      <Box className="park-name" sx={{ mt: "30px", mb: "30px" }}>
        <Typography variant="h3">{selected_park.fullName}</Typography>
      </Box>
      <Box className="carousel-center">
        <Carousel dynamicHeight width="75%" showArrows>
          {selected_park.images.map((image, index) => {
            return (
              <div>
                <img src={image.url} alt={image.altText} />
              </div>
            );
          })}
        </Carousel>
      </Box>
      <Box className="main" sx={{ display: "flex" }}>
        <Box className="left" sx={{ width: "57.5%", display: "inline" }}>
          {user && (
            <Box className="TripNotes">
              <Typography
                className="note-font"
                sx={{ textAlign: "center", display: "inline" }}
                fullwidth={true}
              >
                Trip Note
              </Typography>
              <TripNote park={selected_park} />
            </Box>
          )}
          {/*  */}
          <Box className="ParkInfo" sx={{ width: "100%" }}>
            <Grid item xs={8}>
              <Typography variant="h6">Description:</Typography>
              <Typography>{selected_park.description}</Typography>
            </Grid>

            <Grid item xs={7}>
              <Typography variant="h6">Activities:</Typography>
              <Typography>
                {selected_park.activities
                  .reduce((a, b) => a + `, ${b.name}`, "")
                  .slice(1)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="h6">Address:</Typography>
              <Typography>{selected_park.addresses[0].line1}</Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="h6">Website</Typography>
              <Link href={selected_park.url} color="inherit">
                {selected_park.url}
              </Link>
            </Grid>
          </Box>
        </Box>
        <Box
          className="comments"
          sx={{ width: "42.5%", display: "flex", justifyContent: "end" }}
        >
          <Comments sx={{ width: "100%" }} />
        </Box>
      </Box>

      <Box
        className="Info"
        sx={{ display: "flex", justifyContent: "space-between", mb: "30px" }}
      ></Box>
    </Container>
  );
}
