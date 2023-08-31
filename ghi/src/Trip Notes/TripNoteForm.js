import { useForm } from "react-hook-form";
import { token } from "@galvanize-inc/jwtdown-for-react";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export default function TripNoteForm({
  userData,
  currentNote,
  park,
  tokenLoad,
}) {
  let contentInput = currentNote ? currentNote.content : null;
  const addOrUpdateNote = async (data) => {
    const createdDate = currentNote.created ? currentNote.created : new Date();
    const note = {
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
  const { register, handleSubmit } = useForm({
    defaultValues: {
      content: contentInput,
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
      <div>{token}</div>
      <ValidationTextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        {...register("content")}
        label="Content"
        autoComplete="content"
      />
      {token ? (
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
