import { useForm } from "react-hook-form";
import { token } from "@galvanize-inc/jwtdown-for-react";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export default function TripNoteForm({ userData, currentNote, parkCode }) {
  const addOrUpdateNote = async (data) => {
    const note = {
      username: userData.username,
      created: currentNote.created,
      parkCode: parkCode,
      updated: new Date(),
      ...data,
    };
    console.log("newNote:", note);
    const url = `http://localhost:8000/api/note`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(note),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    console.log("config", fetchConfig);
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
    "& input:valid + fieldset": {
      borderColor: "#E0E3E7",
      borderWidth: 1,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 1,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 4,
      padding: "4px !important",
    },
  });
  const { register, handleSubmit } = useForm({
    defaultValues: {
      content: "content",
    },
  });
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((data) => {
        addOrUpdateNote(data);
      })}
      sx={{ mt: 1 }}
    >
      <ValidationTextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        {...register("content")}
        label="Content"
        autoComplete="content"
      />
      {true ? (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Note
        </Button>
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Note
        </Button>
      )}
    </Box>
  );
}
