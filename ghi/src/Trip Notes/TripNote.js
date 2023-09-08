import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import "./tripnote.css";

export default function TripNote({ userData, park }) {
  // const parkCode = park.parkCode;
  let user = {};
  if (!!localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }
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
    !!tokenLoad && getNote(park.parkCode);
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
        <div className="container">
          <div className="container-inner">
            <div className="sticky-container">
              <div className="sticky-outer">
                <div className="sticky">
                  <svg width="0" height="0">
                    <defs>
                      <clipPath
                        id="stickyClip"
                        clipPathUnits="objectBoundingBox"
                      >
                        <path
                          d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                          stroke-linejoin="round"
                          stroke-linecap="square"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="sticky-content">
                    <ValidationTextField
                      disabled={disabled}
                      {...register("content")}
                      variant="standard"
                      margin="normal"
                      focused
                      label={content ? "" : "Add a Trip Note!"}
                      autoComplete="content"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="place-button">
          {disabled ? (
            <Button className="note-button" type="submit" variant="text">
              Update Trip Note
            </Button>
          ) : (
            <Button className="note-button" type="submit" variant="contained">
              {content ? "Save Changes" : "Add a Trip Note"}
            </Button>
          )}
        </div>
      </Box>
    )
  );
}
