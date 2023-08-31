import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import TripNoteForm from "./TripNoteForm";
import { useState, useEffect } from "react";
import { Typography, Grid, Box } from "@mui/material";


function TripNoteList() {
  const { token } = useAuthContext();
  const [tripNotes, setTripNotes] = useState([]);


  const addTripNote = async (title, content) => {
    const tripnote = {};
    tripnote.username = null;
    tripnote.parkCode = null;
    tripnote.content = content;
    tripnote.title = title;
    tripnote.posted = new Date();

    const url = `http://localhost:8000/api/trip_notes`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(tripnote),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);

    if (!response.ok) {
      console.error("error posting trip");
    } else {
      const data = await response.json();
      setTripNotes([data, ...tripNotes]);
      console.log("tripnote posted");
    }
  };

  useEffect(() => {
  }, [tripNotes]);

  useEffect(() => {
    const url = `http://localhost:8000/api/trip_notes{parkCode}`;
    const fetchTripNotes = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error("Error loading trip note data");
        } else {
          const data = await response.json();
          setTripNotes(data["tripnote"]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTripNotes();
  }, []);

  useEffect(() => {
  }, []);

  return (
    <Box
      className="whole-page"
      component="div"
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography
        align="center"
        color="#00ff33"
        variant="h3"
        sx={{ p: "20px", fontWeight: "bold" }}
      >
        Trip Notes
      </Typography>
      <Grid container sx={{ pl: 15 }} spacing={20}>
        <Grid item xs={6}>
          <TripNoteForm submitLabel="Submit" handleSubmit={addTripNote} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TripNoteList;
