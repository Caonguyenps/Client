import { Grid } from "@material-ui/core";
import React from "react";
import PayPalButton from "../components/PayPalButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CheckoutScreens = () => {
  const handleSuccessPayment = (data) => {
    toast.success("Order payment successful", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Grid>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <PayPalButton handleSuccessPayment={handleSuccessPayment} />
    </Grid>
  );
};

export default CheckoutScreens;
