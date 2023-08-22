import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import CardList from "./CardList";

const App = () => {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    async function fetchParks() {
      const nat_URL = "http://localhost:8000/api/parks";
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
    fetchParks();
  }, []);

  console.log(parks);
  return (
    <BrowserRouter>
      <Nav />
      <CardList parks={parks} />
    </BrowserRouter>
  );
};

export default App;
