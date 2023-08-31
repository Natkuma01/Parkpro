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
import Profile from "./Profile/Profile";
import TripNote from "./Trip Notes/TripNote";

const App = () => {
  const { logout } = useToken();
  const [parks, setParks] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));

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
      }
    } catch (error) {
      console.error(error);
    }
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
                  getData={getData}
                />
              }
            />
            <Route path="/wishlist" element={<WishList parks={parks} />} />
            <Route path="/visited" element={<Visited parks={parks} />} />
            <Route
              path="/login"
              element={<SignInSide getData={getData} userData={userData} />}
            />
            <Route
              path="/signup"
              element={<Signup getData={getData} userData={userData} />}
            />
            <Route
              path="/comments"
              element={<CommentList userData={userData} />}
            />
            <Route path="/note" element={<TripNote userData={userData} />} />
            <Route path="/profile" element={<Profile userData={userData} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
