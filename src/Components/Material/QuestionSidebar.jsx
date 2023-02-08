import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import logoLight from "../../assets/classklap_logo.png";
import QuizIcon from "@mui/icons-material/Quiz";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { SubmitExam } from "../../apis/mutation/submitExam";
import Loader from "../Material/Loader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QuestionSidebar = React.forwardRef((props, ref) => {
  let highLight = props.highLight;

  const [state, setState] = React.useState({
    right: false,
  });
  const [loading, setLoading] = useState(false);

  const sidebarRef = React.useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useImperativeHandle(ref, () => ({
    openSidebar() {
      setState({ right: true });
    },
    closeSidebar() {
      setState({ right: false });
    },
    openSubmitDialog() {
      setDialog(true);
    },
  }));

  const handleSubmit = async () => {
    setLoading(true);
    const res = await SubmitExam(id);
    navigate("/revision_and_exam/online_exam");
    // console.log(id);
    setLoading(false);
  };

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

  // const returnQues = () => {
  //   for (let index = 0; index < 24; index++) {
  //     return <div className="p-4 bg-slate-500">Q. {index + 1}</div>;
  //   }
  // };

  const changeQuestion = (item) => {
    props.changeQId(item.questionAttemptId);
    // console.log(item);
  };

  const list = (anchor) => (
    <Box
      className="!flex !flex-wrap"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Loader loading={loading} />
      <div className="grid grid-cols-4 gap-2 w-full mx-2 mt-4 justify-items-center">
        {props.data.map((item, index) => {
          return (
            <div
              onClick={() => changeQuestion(item)}
              className={`p-1 w-full flex justify-center h-[3rem] items-center rounded-md text-gray-100 ${
                item.isAnswered ? "bg-green-600" : "bg-red-600"
              } cursor-pointer`}
            >
              Q. {index + 1}
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
          <Button onClick={handleSubmit}>Yes</Button>
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

// function DialogBox() {
//   const [open, setOpen] = React.useState(true);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Dialog
//         open={open}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={handleClose}
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogTitle>{"Use Google's location service?"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-slide-description">
//             Let Google help apps determine location. This means sending
//             anonymous location data to Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Disagree</Button>
//           <Button onClick={handleClose}>Agree</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

export default QuestionSidebar;
