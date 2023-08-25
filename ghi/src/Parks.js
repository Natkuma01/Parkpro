import CardList from "./CardList";
import Box from '@mui/material/Box';


function Parks({ parks }) {

  return (
    <div className="parks">
      <Box sx={{position: 'absolute', left: '25%', transform: 'translate(-12.5%)'}}>
        <Box sx={{ flexGrow: 1, width: '75%' }}>
          <CardList parks={parks}/>
        </Box>
      </Box>
    </div>
  );
}

export default Parks;
