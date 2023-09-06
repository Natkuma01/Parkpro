import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import SignInSide from "./Login";
import useToken, {
  AuthProvider,
  getToken,
  useAuthContext,
} from "@galvanize-inc/jwtdown-for-react";
import MainPage from "./MainPage";
import Parks from "./Parks";
import Visited from "./Visited";
import WishList from "./Wishlist";
import Signup from "./Signup";
import CommentList from "./comments/CommentList";
<<<<<<< HEAD
import Profile from "./Profile/Profile";
import TripNote from "./Trip Notes/TripNote";
import ParkDetail from "./ParkDetail";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
=======

>>>>>>> comment
const App = () => {
  const { logout } = useToken();
  const [parks, setParks] = useState([]);
<<<<<<< HEAD
  const [userData, setUserData] = useState(null);
  const [parkCode, setParkCode] = useState("");

  const baseUrl = "http://localhost:8000";

  const getData = async (username) => {
    const URL = `${baseUrl}/api/account/${username}`;
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        console.error("Error getting user data");
      } else {
        const data = await response.json();
        return data;
=======
  const [userData, setUserData] = useState({});

  const baseUrl = "http://localhost:8000";

  useEffect(() => {
    async function fetchParks() {
      const nat_URL = `${baseUrl}/api/parks`;
      try {
        const response = await fetch(nat_URL);
        if (!response.ok) {
          console.error("Error getting park data");
        } else {
          const data = await response.json();
          setParks(data.parks);
        }
      } catch (error) {
        console.error(error);
>>>>>>> comment
      }
    } catch (error) {
      console.error(error);
    }
<<<<<<< HEAD
  };

  async function fetchParks() {
    const nat_URL = `${baseUrl}/api/parks`;
    try {
      const response = await fetch(nat_URL);
      if (!response.ok) {
        console.error("Error getting park data");
      } else {
        const data = await response.json();
        setParks(data.parks);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchParks();
  }, []);

  const getUser = async () => {
    const user_url = `${baseUrl}/token`;
    try {
      const response = await fetch(user_url);
      if (!response.ok) {
        console.error("Error getting user data");
      } else {
        const data = await response.json();
        setParks(data.parks);
      }
    } catch (error) {
      console.error(error);
    }
  };
=======

    fetchParks();
  }, []);

  // const getUser = async () => {
  //   const user_url = `${baseUrl}/token`;
  //   try {
  //     const response = await fetch(user_url);
  //     if (!response.ok) {
  //       console.error("Error getting user data");
  //     } else {
  //       const data = await response.json();
  //       setParks(data.parks);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
>>>>>>> comment

  return (
    <AuthProvider baseUrl={baseUrl}>
      <BrowserRouter>
        <Nav userData={userData} />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/parks"
              element={
                <Parks
                  parks={parks}
                  fetchParks={fetchParks}
                  setParkCode={setParkCode}
                />
              }
            />
            <Route path="/bucketlist" element={<WishList parks={parks} />} />
            <Route path="/visited" element={<Visited parks={parks} />} />
<<<<<<< HEAD
            <Route
              path="/login"
              element={
                <SignInSide getData={getData} setUserData={setUserData} />
              }
            />
            <Route
              path="/signup"
              element={<Signup getData={getData} setUserData={setUserData} />}
            />
            <Route
              path="/comments"
              element={<CommentList userData={userData} />}
            />
            <Route path="/note" element={<TripNote userData={userData} />} />
            <Route path="/profile" element={<Profile userData={userData} />} />
            <Route
              path="/parkdetail"
              element={<ParkDetail parkCode={parkCode} parks={parks} />}
            />
=======
            <Route path="/login" element={<SignInSide />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/comments" element={<CommentList user={userData} />} />
>>>>>>> comment
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
