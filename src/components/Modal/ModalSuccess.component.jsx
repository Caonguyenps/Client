import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import check from "../../assets/image/check.png";
import "./modal.css";
import { useHistory } from "react-router-dom";
import path from "../../resources/path";

export default function ModalSuccessComponent(props) {
  const history = useHistory();
  const handleClickHome = () => {
    history.push(path.LOGIN);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="modal-img">
              <img src={check} alt="" width="100%" />
            </div>
            <div className="modal-title">
              <span>{props.title}</span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickHome} color="primary">
            Sign In
          </Button>
          <Button onClick={props.handleClose} color="secondary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
