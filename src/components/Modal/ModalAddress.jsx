import React, { useEffect, useState } from "react";
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
import { Grid, TextField } from "@material-ui/core";
import { getDeliveryAddress } from "../../api/user.api";

export default function ModalAddress(props) {
  const history = useHistory();
  const [data, setData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  const [arr, setArr] = useState([]);
  const [address, setAddress] = useState();
  useEffect(async () => {
    await getDeliveryAddress().then((res) => {
      setArr(res.data);
    });
  }, []);
  const handleClickPath = (path) => {
    props.handleClick(path);
  };
  const handleChangeData = (event) => {
    let { name, value } = event.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const chooseAddress = (aData) => {
    setAddress(aData._id);
    console.log(aData);
    setData((data) => ({
      ...data,
      address:
        aData.address +
        " " +
        aData.province +
        " " +
        aData.district +
        " " +
        aData.wards,
    }));
  };

  console.log(data);

  const showListsAddress = arr.map((e, index) => {
    return (
      <Grid
        className="mt-3"
        lg={6}
        onClick={() => {
          chooseAddress(e);
        }}
        key={index}
      >
        <div
          className={
            "choose-address " + (address == e._id ? "address-active" : "")
          }
        >
          <Grid>
            <strong>Address: </strong> {e.address}
          </Grid>
          <Grid>
            <strong>Province: </strong>
            {e.province}
          </Grid>
          <Grid>
            <strong>District: </strong>
            {e.district}
          </Grid>
          <Grid>
            <strong>Wards: </strong>
            {e.wards}
          </Grid>
        </div>
      </Grid>
    );
  });

  const handleClickSave = () => {
    if (data.fullName == "" || data.phoneNumber == "" || data.address == "") {
      alert("Please insert field");
    } else {
      localStorage.setItem("address", JSON.stringify(data));
      props.handleCloseModal(true);
    }
  };
  return (
    <div>
      <Dialog
        open={props?.open}
        onClose={() => {
          props.handleCloseModal(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Choose Address</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ width: "500px" }}
          >
            <Grid>
              <TextField
                id="outlined-basic"
                label="Full name"
                name="fullName"
                variant="outlined"
                style={{ width: "100%" }}
                onChange={(e) => {
                  handleChangeData(e);
                }}
              />
            </Grid>
            <Grid className="mt-3">
              <TextField
                id="outlined-basic"
                label="Phone Number"
                name="phoneNumber"
                variant="outlined"
                style={{ width: "100%" }}
                onChange={(e) => {
                  handleChangeData(e);
                }}
              />
            </Grid>
            <Grid className="mt-3">
              <div>
                <strong>Address: </strong>
              </div>
              <Grid container spacing={2}>
                {showListsAddress}
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClickSave();
            }}
            color="primary"
            autoFocus
          >
            Save
          </Button>
          <Button
            onClick={() => {
              props.handleCloseModal(false);
            }}
            color="secondary"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
