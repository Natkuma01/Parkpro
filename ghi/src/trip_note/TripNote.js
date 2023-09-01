import React, { useEffect, useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { Grid, Typography } from "@mui/material";


export default function TripNote({ parkCode }) {
  const { token } = useAuthContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
 

  // const updateTripNote = async (title, content) => {
  //   const userTripNote = {};
  //   userTripNote.title = title;
  //   userTripNote.content = content;
  //   userTripNote.parkCode = parkCode;
  //   userTripNote.username = token;

  //   const TripNoteUrl = `http://localhost:8000/api/note`;
  //   const fetchConfig = {
  //     method: "POST",
  //     body: JSON.stringify(userTripNote),
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   const response = await fetch(TripNoteUrl, fetchConfig);

  //   if (!response.ok) {
  //     console.error("error updating trip notes");
  //   } else {
  //     console.log("Trip notes updated");
  //   }
  // };



  /////////////////////// post note   
    const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleContentChange = (event) => {
    const value = event.target.value;
    setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      title: title,
      content: content,
      username: 'nat',
      parkCode: '2468',
      created: "2023-08-29T23:32:14.908Z"

    }
console.log(body)

    const TripNoteUrl = `http://localhost:8000/api/note`;
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(body),
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
      
    }
    const response = await fetch(TripNoteUrl, fetchConfig);
    console.log(response)
    if (response.ok) {
      setTitle('')
      setContent('')
    }
  }

  return (
        <Grid container sx={{ pl: "15px" }}>
        <Grid item xs={12}>
          <Typography className="form-font" sx={{ fontSize: 26, fontWeight: 'bold' }}>
           Trip Note
          </Typography>
        </Grid>
        <form method="POST" onSubmit={handleSubmit}>
          <Grid item xs={4} sx={{ pt: "10px" }}>
              Title
          </Grid>
          <Grid item xs={8}>
            <input
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ pt: "10px" }}>
            <label htmlFor="content">
              Notes
            </label>
          </Grid>
          <textarea
            name="content"
            value={content}
            onChange={handleContentChange}
            cols="30"
            rows="10"
          ></textarea>
          <Grid item xs={12} sx={{ p:'10px' }}>
          <button>Create</button>
          </Grid>
        </form>
      </Grid>
  );
}

