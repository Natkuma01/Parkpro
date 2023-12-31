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
import image3 from "./images/image3.jpg";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { Alert, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        ParkPro
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Signup({ getData, setUserData }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const [mismatch, setMismatch] = useState(false);
  const [validated, setValidated] = useState(true);
  const { login } = useToken();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setValidated(true);
    const items = [email, username, password, firstName, lastName];
    if (!items.every((item) => item.length > 0)) {
      setValidated(false);
      return;
    }
    if (password !== confirmPassword) {
      setMismatch(true);
      return;
    }

    const checkUrl = `http://localhost:8000/api/accounts/`;
    const checkConfig = { method: "get" };
    const checkResponse = await fetch(checkUrl, checkConfig);
    if (checkResponse.ok) {
      const data = await checkResponse.json();
      for (let item of data) {
        if (item === username) {
          setError(true);
          return;
        }
      }
    }

    const data = {};
    data.email = email;
    data.username = username;
    data.password = password;
    data.first_name = firstName;
    data.last_name = lastName;

    const signupUrl = `http://localhost:8000/api/accounts/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(signupUrl, fetchConfig);

    if (response.ok) {
      login(username, password);
      const user = await getData(username);
      localStorage.setItem("user", JSON.stringify(user));
      setUserData(user);
      event.target.reset();
      navigate("/parks");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {error && (
                <Alert variant="outlined" severity="error">
                  There is already an account associated with this username.
                  Please login if it is your account, or select another username
                  to sign up.
                </Alert>
              )}
              {!validated && (
                <Alert variant="outlined" severity="error">
                  Please ensure all fields are filled out.
                </Alert>
              )}
              {mismatch && (
                <Alert variant="outlined" severity="error">
                  Your passwords do not match. Please retype them to ensure they
                  are the same.
                </Alert>
              )}
              <TextField
                error={!validated && email.length === 0}
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                error={!validated && username.length === 0}
                margin="normal"
                required={true}
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                error={(!validated && password.length === 0) || mismatch}
                margin="normal"
                required={true}
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "password" : "text"}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={(!validated && password.length === 0) || mismatch}
                margin="normal"
                required={true}
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={!showPassword ? "password" : "text"}
                autoComplete="current-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={!validated && firstName.length === 0}
                margin="normal"
                required={true}
                fullWidth
                name="firstName"
                label="First Name"
                autoComplete="first-name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                error={!validated && lastName.length === 0}
                margin="normal"
                required={true}
                fullWidth
                name="lastName"
                label="Last Name"
                autoComplete="last-name"
                onChange={(e) => setLastName(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image3})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
