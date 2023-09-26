import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

const ControlledAutoComplete = ({
  val,
  data,
  handleDropDown,
  Name,
  disable,
}) => {
  const [value, setValue] = useState(val);
  console.log(data);
  return (
    <Autocomplete
      value={val !== "" ? value : "Select"}
      onChange={(event, newValue) => {
        setValue(newValue);
        handleDropDown(newValue, Name);
      }}
      disabled={disable}
      disableClearable
      id="controllable-states-demo"
      options={data}
      sx={{ width: "100%" }}
      renderInput={(params) => (
        <TextField
          variant="outlined"
          {...params}
          sx={{ width: "100%" }}
          size="small"
        />
      )}
    />
  );
};

export default ControlledAutoComplete;
