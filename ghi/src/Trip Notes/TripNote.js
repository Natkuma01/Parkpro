import TripNoteForm from "./TripNoteForm";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";

export default function TripNote({ userData, park }) {
  const parkCode = park.parkCode;
  const data = JSON.parse(localStorage.getItem("user"));
  const { token } = useAuthContext();
  const [note, setNote] = useState();
  const [tokenLoad, setTokenLoad] = useState(null);
  const [content, setContent] = useState("");

  const getNote = async (parkCode) => {
    const url = `http://localhost:8000/api/trip_note/${parkCode}`;
    const fetchConfig = {
      method: "get",
      headers: {
        Authorization: `Bearer ${tokenLoad}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
      if (!response.ok) {
        console.error("Error getting trip note");
      } else {
        const note = await response.json();
        setNote(note);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addOrUpdateNote = async (data) => {
    const createdDate = note.created ? note.created : new Date();
    const noteInfo = {
      username: userData["username"],
      parkCode: park.parkCode,
      created: createdDate,
      updated: new Date(),
      ...data,
    };
    const url = `http://localhost:8000/api/note`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(note),
      headers: {
        Authorization: `Bearer ${tokenLoad}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
      if (!response.ok) {
        console.error("Error updating trip note");
      } else {
        console.log("trip note updated");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const ValidationTextField = styled(TextField)({
    "& .MuiFormLabel-asterisk": {
      color: "white",
    },
  });

  useEffect(() => {
    setTokenLoad(token);
  }, []);

  useEffect(() => {
    !!tokenLoad && getNote(parkCode);
  }, [tokenLoad]);

  useEffect(() => {
    const noteContent = note ? note.content : "";
    setContent(noteContent);
  }, [note]);
  return (
    !!note && (
      <Box
        component="form"
        noValidate
        onSubmit={() => console.log("submit")}
        sx={{ mt: 1 }}
      >
        <ValidationTextField
          value={content}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Content"
          autoComplete="content"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Note
        </Button>
      </Box>
    )
  );
}
