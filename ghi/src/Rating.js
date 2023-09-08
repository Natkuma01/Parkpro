import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

export default function BasicRating({ rating, parkCode }) {
  const [value, setValue] = useState(rating);
  const { token } = useAuthContext();

  const user = JSON.parse(localStorage.getItem("user"));

  const updateRating = async (value) => {
    const userRating = {};
    userRating.rating = parseInt(value);
    userRating.parkCode = parkCode;
    userRating.username = user.username;
    const url = `http://localhost:8000/api/ratings`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(userRating),
      headers: {
        Authorization: `Bearer ${token}`,
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
    updateRating(event.target.value, parkCode);
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
