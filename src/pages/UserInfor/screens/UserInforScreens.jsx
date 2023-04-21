import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { updateProfile } from "../../../api/user.api";

const UserInforScreens = (props) => {
  const [data, setData] = useState({
    ownerID: "",
    fullName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (props.profile) {
      let newData = {
        ownerID: props.profile._id,
        fullName: props.profile.fullName,
        phoneNumber: props.profile.phoneNumber,
      };
      setData(newData);
    }
  }, [props.profile]);

  const handleChange = (event) => {
    let { name, value } = event.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const handleUpdate = async () => {
    props.handleLoading(true);
    await updateProfile(data).then(() => {
      props.handleLoading(false);
    });
  };
  return (
    <Grid className="wrap-content-right">
      <Grid container spacing={1}>
        <Grid item lg={2}>
          <span>Full name:</span>
        </Grid>
        <Grid item lg={10}>
          <input
            type="text"
            class="form-control"
            aria-describedby="basic-addon1"
            defaultValue={props?.profile?.fullName}
            name="fullName"
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </Grid>
        <Grid item lg={2}>
          <span>Email:</span>
        </Grid>
        <Grid item lg={10}>
          <input
            disabled
            type="text"
            class="form-control"
            aria-describedby="basic-addon1"
            defaultValue={props?.profile?.email}
          />
        </Grid>
        <Grid item lg={2}>
          <span>Phone number:</span>
        </Grid>
        <Grid item lg={10}>
          <input
            type="text"
            class="form-control"
            aria-describedby="basic-addon1"
            defaultValue={props?.profile?.phoneNumber}
            name="phoneNumber"
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </Grid>
      </Grid>
      <div className="mt-4">
        <button
          type="button"
          class="btn btn-primary"
          style={{ float: "right" }}
          onClick={() => {
            handleUpdate();
          }}
        >
          Update
        </button>
      </div>
    </Grid>
  );
};

export default UserInforScreens;
