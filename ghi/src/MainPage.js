import {  Paper, Box, Button, Typography, Link } from '@mui/material'
import  Grid from '@mui/material/Unstable_Grid2';
import logo from "./images/logo.svg";
import background from "./images/8.jpg";
import { useNavigate } from "react-router-dom";

function MainPage() {

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
  const navigate = useNavigate()
  const handleSignIn = (event) => {
    navigate('/login')
  }
   const handleSignUp = (event) => {
    navigate('/signup')
  }
   const handleExplore = (event) => {
    navigate('/parks')
  }

  return (

    <Grid container spacing={1} sx={{ backgroundImage:`url(${background})`, width:"100%",height:"90vh", justifyContent:"space-around", alignItems:"center"  }}>
      <Grid item sm={10} md={5} className="Logo" sx={{display: "flex", justifyContent:"flex-end"}}>
        <Box elevation={6} >
          <img className="Logo" src={logo} alt="ParkPro" />
          <h2 style={{ color:"white" }}>Your National Parks Journey Starts Here!</h2>
        </Box>
      </Grid>
        <Grid item sm={10} md={5} >
          <Box
            component={Paper}
            elevation={6}
            sx={{
              width:"30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
          >
            <Button
              onClick={handleSignIn}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ ':hover':{ backgroundColor:'#24ff00'}, backgroundColor:"#24ff00", mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              onClick={handleSignUp}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ ':hover':{ backgroundColor:'#24ff00'}, backgroundColor:"#24ff00", mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              onClick={handleExplore}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ ':hover':{ backgroundColor:'#24ff00'}, backgroundColor:"#24ff00", mt: 3, mb: 2 }}
            >
              Explore
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
      </Grid>
    </Grid>

  );
}

export default MainPage;
