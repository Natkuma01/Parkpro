import * as React from "react";
import Card from "@mui/material/Card";
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
import Grid from "@mui/material/Grid";
import { Tooltip } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import addRemoveList from "./helpers/addRemoveList";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

export default function ParkCard({ park, setParkCode }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const routeChange = () => {
    setParkCode(park.parkCode);
    navigate("/parkdetail");
  };

  let randomNumber = Math.floor(Math.random() * (park.images.length - 1));

  const user = JSON.parse(localStorage.getItem("user"));

  const [inBucket, setInBucket] = useState(
    user && user.visited.includes(park.parkCode)
  );
  const [inVisited, setInVisited] = useState(
    user && user.visited.includes(park.parkCode)
  );

  const handleAddRemove = (listName, action) => {
    addRemoveList(park, listName, action, token);
    listName === "visited" ? setInVisited(!inVisited) : setInBucket(!inBucket);
  };

  let visitedColor = !inVisited ? "action" : "success";
  let bucketColor = !inBucket ? "action" : "success";

  const shorten = (desc) => {
    if (desc.length <= 215) {
      return desc;
    } else {
      return desc.slice(0, 215) + "...";
    }
  };

  const description = shorten(park.description);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontial">
      <Card
        sx={{
          backgroundColor: "black",
          maxWidth: "345px",
          height: "400px",
          boxShadow: "10px",
          borderRadius: "6px",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          image={park.images[randomNumber].url}
          alt={park.images[randomNumber].title}
          sx={{ height: "87.5%", display: "block" }}
        />

        <CardContent>
          <Typography
            variant="body1"
            color="white"
            align="center"
            sx={{
              height: "50px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {park.fullName}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ position: "absolute", top: "0", right: "0" }}
        >
          <Tooltip title="Flip for Details" placement="top-end">
            <IconButton onClick={handleClick}>
              <LoopOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      <Card
        sx={{
          backgroundColor: "#dfe3ee",
          maxWidth: "345px",
          height: "400px",
          boxShadow: "10px",
          borderRadius: "6px",
          position: "relative",
        }}
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
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {park.fullName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{
                  height: "200px",
                  whiteSpace: "wrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                variant="body2"
                color="text.secondary"
                justify="stretch"
                align="center"
              >
                {park.description}
              </Typography>
            </Grid>
            <Grid item xs={8} sx={{ mt: "15px", pl: "10px" }}>
              <BasicRating rating={park.rating} parkCode={park.parkCode} />
            </Grid>
            {/* <Grid sx={{ display: "flex", justifyContent: "space-evenly" }}> */}
            <Grid item xs={2}>
              {token && (
                <CardActions disableSpacing>
                  <Tooltip
                    title={
                      !inBucket
                        ? "Add to 'Bucket list'"
                        : "Remove from 'Bucket list'"
                    }
                  >
                    <IconButton
                      onClick={() =>
                        handleAddRemove(
                          "bucket_list",
                          inBucket ? "remove" : "add"
                        )
                      }
                    >
                      <FavoriteIcon color={bucketColor} />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              )}
            </Grid>
            <Grid item xs={2}>
              {token && (
                <CardActions disableSpacing>
                  <Tooltip
                    title={
                      !inVisited
                        ? "Add to 'Visited' list"
                        : "Remove from 'Visited' list"
                    }
                  >
                    <IconButton
                      onClick={() =>
                        handleAddRemove("visited", inVisited ? "remove" : "add")
                      }
                    >
                      <AddPhotoAlternateOutlinedIcon color={visitedColor} />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              )}
            </Grid>
            {/* </Grid> */}

            <CardActions>
              <Grid item xs={12}>
                <Button
                  variant="body2"
                  onClick={routeChange}
                  sx={{ color: "#2dc937" }}
                >
                  Learn More
                </Button>
              </Grid>
            </CardActions>
          </Grid>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ position: "absolute", top: "0", right: "0" }}
        >
          <Tooltip title="Flip for Details" placement="top-end">
            <IconButton onClick={handleClick}>
              <LoopOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </ReactCardFlip>
  );
}
