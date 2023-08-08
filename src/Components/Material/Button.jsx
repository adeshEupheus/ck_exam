import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Visibility } from "@mui/icons-material";

export default function BasicButton({
  text,
  size,
  disable,
  handleButtonAction,
  name,
}) {
  const handleOnClick = () => {
    handleButtonAction(name);
  };

  return (
    <Stack spacing={1} direction="row">
      <Button
        color="primary"
        disabled={disable}
        onClick={handleOnClick}
        size={size ? size : "medium"}
        variant="contained"
        style={{
          color: "whitesmoke",

          fontWeight: "800",
        }}
      >
        {text}
      </Button>
    </Stack>
  );
}
