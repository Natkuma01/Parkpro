import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating(rating) {
  const [value, setValue] = useState(rating);

  const updateRating = async (rating, parkCode) => {
    const userRating = {};
    userRating.rating = rating;
    userRating.parkCode = parkCode;

    const url = `http://localhost:8000/api/ratings/update`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(userRating),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);

    if (!response.ok) {
      console.error("error updating rating");
    } else {
      console.log("rating updated");
    }
  };

  const handleChange = (event, newValue) => {
    updateRating(event.target.value);
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating name="simple-controlled" value={value} onChange={handleChange} />
    </Box>
  );
}
