import Grid from "@mui/material/Unstable_Grid2";
import ParkCard from "./Card";

const Wishlist = ({ parks }) => {
  let user = {};
  if (!!localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const hasList = user.bucket_list.length > 0;
  return (
    <>
      {hasList ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {parks
            .filter((park) => user.bucket_list.includes(park.parkCode))
            .map((park, index) => (
              <Grid xs={2} sm={4} md={4} key={index}>
                <ParkCard park={park} key={park.parkCode} />
              </Grid>
            ))}
        </Grid>
      ) : (
        <Grid>
          <div className="addParks">
            You havent added any parks to your bucket list. you better heuury up
            and add some!!!
          </div>
        </Grid>
      )}
    </>
  );
};

export default Wishlist;
