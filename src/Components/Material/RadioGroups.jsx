import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function RadioButtonsGroup() {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        row
      >
        <FormControlLabel
          value="teacher"
          control={
            <Radio
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 28,
                },
              }}
            />
          }
          label="Teacher"
          labelPlacement="top"
        />
        <FormControlLabel
          value="student"
          control={
            <Radio
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 28,
                },
              }}
            />
          }
          label="Student"
          labelPlacement="top"
        />
      </RadioGroup>
    </FormControl>
  );
}
