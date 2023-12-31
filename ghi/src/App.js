import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
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
import Comments from "./comments/Comments";
import Profile from "./Profile/Profile";
import TripNote from "./Trip Notes/TripNote";
import ParkDetail from "./ParkDetail";
import Detail from "./Detail/Detail";

const App = () => {
  const { logout } = useToken();
  const [parks, setParks] = useState([]);
  const [userData, setUserData] = useState(null);
  const [parkCode, setParkCode] = useState("");
  const token = useAuthContext();
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
  const user = JSON.parse(localStorage.getItem("user"));
  const ProtectedRoute = () => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  };

  const UnprotectedRoute = () => {
    if (user) {
      return <Navigate to="/parks" replace />;
    }
    return <Outlet />;
  };

  return (
    <AuthProvider baseUrl={baseUrl}>
      <BrowserRouter>
        <Nav userData={userData} />
        <div className="container">
          <Routes>
            <Route element={<UnprotectedRoute />}>
              <Route path="/" element={<MainPage />} />
            </Route>
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
            <Route element={<ProtectedRoute />}>
              <Route path="/bucketlist" element={<WishList parks={parks} />} />
              <Route path="/visited" element={<Visited parks={parks} />} />
            </Route>
            <Route element={<UnprotectedRoute />}>
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
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/comments"
                element={<CommentList userData={userData} />}
              />
              <Route
                path="/profile"
                element={<Profile userData={userData} />}
              />
            </Route>

            <Route
              path="/parkdetail"
              element={<Detail parkCode={parkCode} parks={parks} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
