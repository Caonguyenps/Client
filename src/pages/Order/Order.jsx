import React, { useEffect, useState } from "react";
import { getOrderUser, deleteOrder } from "../../api/user.api";
import { Grid } from "@material-ui/core";
import "./order.css";
const Order = (props) => {
  const [arr, setArr] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(async () => {
    props.handleLoading(true);
    await getOrderUser().then((res) => {
      setArr(res.data);
    });
    props.handleLoading(false);
  }, []);
  const showList = arr.map((e, index) => {
    return (
      <Grid lg={6}>
        <div className="wrap-wrap-address">
          <div className="wrap-address1 mt-3">
            <Grid className="ml-3">
              <strong>Total: </strong> {e.totalPrice}
            </Grid>
            <Grid className="ml-3">
              <strong>Paypal: </strong>
              {e.paypalID}
            </Grid>
            <Grid className="ml-3">
              <strong>Full Name: </strong>
              {e.fullName}
            </Grid>
            <Grid className="ml-3">
              <strong>Address: </strong>
              {e.address}
            </Grid>
            <Grid className="ml-3">
              <strong>Phone: </strong>
              {e.phoneNumber}
            </Grid>
          </div>
        </div>
      </Grid>
    );
  });

  return (
    <Grid className="wrap-content-right">
      <Grid container spacing={0}>
        {showList}
      </Grid>
    </Grid>
  );
};

export default Order;
