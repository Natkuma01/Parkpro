import Grid from "@mui/material/Unstable_Grid2";
import Card from "./Card";

function CardList({ parks }) {
  return (
    <Grid container spacing={2}>
      {parks.map((park) => {
        return (
          <Grid xs={12} sm={6} md={4}>
            {park.fullName}
          </Grid>
        );
      })}
    </Grid>
  );
}

export default CardList;