import {useState, useEffect} from 'react'
import states from 'states-us'
import Box from '@mui/material/Box';

function FilterForm({ parks, filter }) {

    const [state, setState] = useState('');


    const handleStateChange = (event) => {
    const value = event.target.value;
        setState(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        filter(state);
    }

    return (
        <Box>
        <h2>Filter by state.</h2>
        <form id='filter-by-state' onSubmit={handleSubmit}>
        <select onChange={handleStateChange} name="state" required id="state" className="form-select">
          <option defaultValue="">All</option>
            {states.map(state => {
              return (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              );
          })}
          </select>
          <button>Go</button>
        </form>

      </Box>
    )


} export default FilterForm;