import Grid from "@mui/material/Unstable_Grid2";
import ParkCard from "./Card";
function Visited({ parks }) {
  const currentAccount = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {parks
          .filter((park) => currentAccount.visited.includes(park.parkCode))
          .map((park, index) => (
            <Grid xs={2} sm={4} md={4} key={index}>
              <ParkCard park={park} key={park.parkCode} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
export default Visited;
