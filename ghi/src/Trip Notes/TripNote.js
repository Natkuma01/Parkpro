import TripNoteForm from "./TripNoteForm";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState } from "react";

export default function TripNote({ userData, park }) {
  const parkCode = "yell";
  const data = JSON.parse(localStorage.getItem("user"));
  const { token } = useAuthContext();
  const [note, setNote] = useState();
  const [tokenLoad, setTokenLoad] = useState(null);

  const getNote = async (parkCode) => {
    const url = `http://localhost:8000/api/trip_note/${parkCode}`;
    const fetchConfig = {
      method: "get",
      headers: {
        Authorization: `Bearer ${tokenLoad}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
      if (!response.ok) {
        console.error("Error getting trip note");
      } else {
        const note = await response.json();
        setNote(note);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTokenLoad(token);
  }, []);

  useEffect(() => {
    !!tokenLoad && getNote(parkCode);
  }, [tokenLoad]);

  return (
    <TripNoteForm
      userData={data}
      currentNote={note}
      park={park}
      tokenLoad={tokenLoad}
    />
  );
}
