import CardList from "./CardList";
import Box from '@mui/material/Box';


function Parks({ parks, fetchParks }) {

  return (
    <div className="parks">
      <Box sx={{position: 'absolute', left: '25%', transform: 'translate(-12.5%)'}}>
        <Box sx={{ flexGrow: 1, width: '75%' }}>
          <CardList parks={parks} fetchParks={fetchParks}/>
        </Box>
      </Box>
    </div>
  );
}

export default Parks;
