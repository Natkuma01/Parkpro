import TripNoteForm from "./TripNoteForm";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState } from "react";

export default function TripNote({ userData }) {
  const parkCode = "yell";
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
    console.log(fetchConfig, url);
    try {
      const response = await fetch(url, fetchConfig);
      console.log(response);
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
  });

  useEffect(() => {
    !!tokenLoad && getNote(parkCode);
  }, [tokenLoad]);

  return (
    <TripNoteForm userData={userData} currentNote={note} parkCode={parkCode} />
  );
}
