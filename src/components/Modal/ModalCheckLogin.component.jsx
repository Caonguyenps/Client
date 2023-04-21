import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import error from "../../assets/image/error.png";
import "./modal.css";
import { useHistory } from "react-router-dom";
import path from "../../resources/path";

export default function ModalCheckLoginComponent(props) {
  const history = useHistory();
  const handleClickPath = (path) => {
    props.handleClick(path);
  };
  return (
    <div>
      <Dialog
        open={true}
        onClose={() => {
          handleClickPath(path.HOME);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="modal-img">
              <img src={error} alt="" width="100%" />
            </div>
            <div className="modal-title">
              <span>Please login to use this function</span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClickPath(path.LOGIN);
            }}
            color="primary"
          >
            Sign In
          </Button>
          <Button
            onClick={() => {
              handleClickPath(path.HOME);
            }}
            color="secondary"
            autoFocus
          >
            Home
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
