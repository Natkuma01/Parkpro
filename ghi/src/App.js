import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import SignInSide from "./Login";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import MainPage from "./MainPage";
import Parks from "./Parks";
import Visited from "./Visited";
import WishList from "./Wishlist";
import Signup from "./Signup";
import CommentList from "./comments/CommentList";

const App = () => {
  const [parks, setParks] = useState([]);
  const [userData, setUserData] = useState({});

  const baseUrl = "http://localhost:8000";

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
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/parks"
              element={<Parks parks={parks} fetchParks={fetchParks} />}
            />
            <Route path="/wishlist" element={<WishList parks={parks} />} />
            <Route path="/visited" element={<Visited parks={parks} />} />
            <Route path="/login" element={<SignInSide />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/comments" element={<CommentList user={userData} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
