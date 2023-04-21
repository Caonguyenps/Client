import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { deleteAddress, getDeliveryAddress } from "../../../api/user.api";
import { useHistory } from "react-router-dom";
import path from "../../../resources/path";
import "./style.css";

const DeliveryAdressScreens = (props) => {
  const history = useHistory();
  const [arrAddress, setArrAddress] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getDeliveryAddress().then((res) => {
      setArrAddress(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  const showListsAddress = arrAddress.map((e, index) => {
    return (
      <Grid className="mt-3" lg={4}>
        <div className="wrap-address">
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
          <i
            class="fas fa-times icon-delete"
            onClick={() => {
              handleClickDelete(e._id);
            }}
          ></i>
        </div>
      </Grid>
    );
  });

  const handleClickDelete = async (id) => {
    props.handleLoading(true);
    await deleteAddress(id).then((res) => {
      setReload(!reload);
    });
  };

  const handleClick = () => {
    history.push(path.ADD_DELIVERY);
  };
  return (
    <Grid>
      <Grid container spacing={4}>
        {showListsAddress}
      </Grid>
      <div className="mt-4">
        <button
          type="button"
          class="btn btn-primary"
          style={{ float: "right" }}
          onClick={handleClick}
        >
          Add new address
        </button>
      </div>
    </Grid>
  );
};

export default DeliveryAdressScreens;
