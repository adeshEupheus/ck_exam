import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import logoLight from "../../assets/classklap_logo.png";
import QuizIcon from '@mui/icons-material/Quiz';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

  const[dialog,setDialog]=useState(false);

  const handledialog=()=>{
    setDialog(true);
  }
  const closedialog=()=>{
    setDialog(false);
  }


  const list = (anchor) => (
    <Box
      className="!flex !flex-col !gap-1"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="flex items-center gap-3 justify-center py-4">
        <img
          src={logoLight}
          className=" w-[10rem] md:w-[10rem] h-auto object-cover"
          alt=""
        />
      </div>

      <Link to="">
        <aside
          className={`px-6 mt-[1rem] py-2 hover:bg-gray-500 flex ${
            highLight === "overview" ? "bg-gray-500" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-2">
            <QuizIcon
              className={`${
                highLight === "overview" ? "!text-gray-100" : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "overview" ? "text-gray-200" : "text-gray-600"
              } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
            >
              Question-1
            </span>
          </div>
        </aside>
      </Link>
      <Link>
        <aside
          className={`pl-6 pr-3 py-2 mt-[1rem] flex justify-between gap-4 ${
            highLight === "manageOrder" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <div className="flex gap-4">
            <QuizIcon
              className={`${
                highLight === "manageOrder"
                  ? "!text-gray-100"
                  : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "manageOrder" ? "text-gray-200" : "text-gray-600"
              } group-hover:!text-gray-100 font-semibold transition-all duration-150 ease-linear`}
            >
            Question-2
            </span>
          </div>
         
        </aside>
        
      </Link>
      <Link to="">
        <aside
          className={`px-6 mt-[1rem] py-2 hover:bg-gray-500 flex ${
            highLight === "exam_setup" ? "bg-gray-500" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-4">
            <QuizIcon
              className={`${
                highLight === "exam_setup" ? "!text-gray-100" : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "exam_setup" ? "text-gray-200" : "text-gray-600"
              } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
            >
              Question-3
            </span>
          </div>
        </aside>
      </Link>
      <Link to="">
        <aside
          className={`px-6 mt-[1rem] py-2 hover:bg-gray-500 flex ${
            highLight === "exam_timetable" ? "bg-gray-500" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-4">
            <QuizIcon
              className={`${
                highLight === "exam_timetable"
                  ? "!text-gray-100"
                  : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "exam_timetable"
                  ? "text-gray-200"
                  : "text-gray-600"
              } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
            >
              Question-4
            </span>
          </div>
        </aside>
      </Link>

      <Link>
        <aside
          className={`pl-6 pr-3 py-2 mt-[1rem] flex justify-between gap-4 ${
            highLight === "manageOrder" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <div className="flex gap-4">
            <QuizIcon
              className={`${
                highLight === "manageOrder"
                  ? "!text-gray-100"
                  : "!text-gray-400"
              } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "manageOrder" ? "text-gray-200" : "text-gray-600"
              } group-hover:!text-gray-100 font-semibold transition-all duration-150 ease-linear`}
            >
            Question-5
            </span>
          </div>
         
        </aside>
    </Link>
    <Button variant="contained" className="!mt-4" onClick={handledialog}>Submit</Button>
    <Dialog
        open={dialog}
        onClose={closedialog}
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

      
    </Box>
  );

  return (
    <div ref={sidebarRef}>
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

export default QuestionSidebar;
