import Grid from "@mui/material/Unstable_Grid2";
import ParkCard from "./Card";
import FilterForm from "./FilterForm"
import {useState, useEffect} from "react"

function CardList( { parks}) {

  const [parkList, setParkList] = useState(parks);

  useEffect(() => {
    setParkList(parks)
  }, []);
  console.log(parkList)

  function filter(state) {
    if (state == "All" ) {
      setParkList(parks)
    } else {
      let filtered = parks.filter(park => park.states==state)
      setParkList(filtered)
    }

  }

  return (
          <>
          <FilterForm parks={parks} filter={filter}/>
          <Grid container spacing={{ xs: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3}}>
            {parkList.map((park, index) => (
              <Grid xs={2} sm={4} md={4} key={index}>
                <ParkCard park={park} key={park.parkCode} />
              </Grid>
            ))}
          </Grid>
          </>
  );
} export default CardList;