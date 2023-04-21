import { Grid } from "@material-ui/core";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const PayPalButton = (props) => {
  console.log(props);
  return (
    <Grid>
      <PayPalScriptProvider
        options={{
          "client-id":
            "Ac0t1eGpMYLf5iotTKfFkWFZLHgygWmRgpCQwMXDrfEmUYdgFooI1JIJ-iXzTmRrNAD7zBqk8j-MrJxA",
        }}
      >
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "checkout",
            size: "expanded",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: props?.total,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              props.handleSuccessPayment(details);
            });
          }}
        />
      </PayPalScriptProvider>
    </Grid>
  );
};

export default PayPalButton;
