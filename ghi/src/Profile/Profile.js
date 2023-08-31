import { token } from "@galvanize-inc/jwtdown-for-react";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import image4 from "../images/image4.jpg";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageDrop from "./ImageDrop";
import { alpha, styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import ProfileForm from "./ProfileForm";

export default function Profile({ userData, setUserData }) {
  const [avatar, setAvatar] = useState(userData.avatar);
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          pt: 4,
          pb: 105,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url(${image4})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {!avatar && (
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  mb: 4,
                  width: 100,
                  height: 100,
                }}
                alt={`${userData.first_name} ${userData.first_name}`.toUpperCase()}
                src="/static/images/avatar/2.jpg"
              />
            )}
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <ProfileForm userData={userData} setUserData={setUserData} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
