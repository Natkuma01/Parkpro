import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";

import { styled } from "@mui/material/styles";

export default function TripNote({ userData, park }) {
  const parkCode = park.parkCode;
  const user = JSON.parse(localStorage.getItem("user"));
  const { token } = useAuthContext();
  const [note, setNote] = useState();
  const [tokenLoad, setTokenLoad] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [content, setContent] = useState(null);

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
      username: user["username"],
      parkCode: park.parkCode,
      created: createdDate,
      updated: new Date(),
      ...data,
    };
    const url = `http://localhost:8000/api/note`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(noteInfo),
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

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    const noteContent = note ? note.content : null;
    noteContent && setDisabled(!disabled);
    setValue("content", noteContent);
    setContent(noteContent);
  }, [note]);

  return (
    !!note && (
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit((data) => {
          !disabled && addOrUpdateNote(data);
          setDisabled(!disabled);
        })}
        sx={{ mt: 1 }}
      >
        <ValidationTextField
          disabled={disabled}
          {...register("content")}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label={content ? "" : "Add a Trip Note!"}
          autoComplete="content"
        />
        {disabled ? (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Trip Note
          </Button>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {content ? "Save Changes" : "Add a Trip Note"}
          </Button>
        )}
      </Box>
    )
  );
}
