import { useState, useEffect } from "react";
import { Stack } from "@mui/material";

import Box from "@mui/material/Box";

function FilterForm({ setState, states }) {
  const [selection, setSelection] = useState("");
  const handleStateChange = (event) => {
    const value = event.target.value;
    setSelection(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState(selection);
  };

  return (
    <Box
      sx={{
        margin: "10px",
        width: "600px",
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
      }}
    >
      <Stack>
        <h2>Filter by state.</h2>
        <form onSubmit={handleSubmit} id="filter-by-state">
          <select
            onChange={handleStateChange}
            name="state"
            id="state"
            className="form-select"
          >
            <option value="">All</option>
            {states.map((state) => {
              return (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              );
            })}
          </select>
          <button className="filter-button">Go</button>
        </form>
      </Stack>
    </Box>
  );
}
export default FilterForm;
