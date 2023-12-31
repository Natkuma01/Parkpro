import Grid from "@mui/material/Unstable_Grid2";
import ParkCard from "./Card";
import FilterForm from "./FilterForm";
import { useState, useEffect } from "react";
import states from "states-us";

function CardList({ parks, fetchParks, setParkCode }) {
  const listOfStates = states.filter((entry) => !entry.territory);
  const [state, setState] = useState("");

  useEffect(() => {
    fetchParks();
  }, []);

  return (
    <>
      <FilterForm states={listOfStates} setState={setState} />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {parks
          .filter((park) =>
            state ? park.states.split(",").includes(state) : park
          )
          .map((park, index) => (
            <Grid xs={2} sm={4} md={4} key={index} spacing={1}>
              <ParkCard
                park={park}
                key={park.parkCode}
                setParkCode={setParkCode}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
export default CardList;
