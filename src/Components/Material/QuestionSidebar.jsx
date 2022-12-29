import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import logoLight from "../../assets/classklap_logo.png";
import QuizIcon from "@mui/icons-material/Quiz";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const QuestionSidebar = React.forwardRef((props, ref) => {
  let highLight = props.highLight;

  const [state, setState] = React.useState({
    right: false,
  });
  const sidebarRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    openSidebar() {
      setState({ right: true });
    },
  }));

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [dialog, setDialog] = useState(false);

  const handledialog = () => {
    setDialog(true);
  };
  const closedialog = () => {
    setDialog(false);
  };

  const returnQues = () => {
    for (let index = 0; index < 24; index++) {
      return <div className="p-4 bg-slate-500">Q. {index + 1}</div>;
    }
  };

  const list = (anchor) => (
    <Box
      className="!flex !flex-wrap"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full m-4 justify-items-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
          return (
            <div className="p-4 rounded-md text-gray-100 bg-slate-500 cursor-pointer">
              Q. {item}
            </div>
          );
        })}
      </div>

      <Button variant="contained" className="!m-4" onClick={handledialog}>
        Submit
      </Button>
    </Box>
  );

  return (
    <div ref={sidebarRef}>
      {/* <DialogBox /> */}
      <Dialog
        open={dialog}
        keepMounted
        onClose={closedialog}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to Submit?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to submit your exam!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closedialog}>Yes</Button>
          <Button onClick={closedialog} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
});

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

function DialogBox() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QuestionSidebar;
